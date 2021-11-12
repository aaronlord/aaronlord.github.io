---
name: post
layout: post
title: "Deploying to multiple environments via Git."
date: 2013-07-28 02:08:06
categories: git deployment
---

[FTP really is so 90's](https://coderwall.com/p/xczkaq), and there are [dozens](http://net.tutsplus.com/tutorials/other/the-perfect-workflow-with-git-github-and-ssh/) [of](http://danbarber.me/using-git-for-deployment/) [great](http://ryanflorence.com/simple-git-deployment/) [articles](http://ryanflorence.com/deploying-websites-with-a-tiny-git-hook/) out there already telling us (quite rightly) that we should drop FTP and push our changes up to the server with git.

However, being limited to a one to one, branch to directory relationship is kinda lame, many to many is way hotter.

[Here's a link to the tl;dr](#tldr)

## Case
Say, for example, have a project called `example`, with these branches representing my three environments:

	$ cd ~/Sites/example
	$ git branch
	* master
	  production
	  staging

I want to be able to `git push` each branch up to the server and have them deployed into their respective directories.

Branch       | Server Directory                 | Url
-------------|----------------------------------|-------------
`master`     | `/www/example.com/master`        | dev.example.com
`staging`    | `/www/example.com/staging`       | staging.example.com
`production` | `/www/example.com/production`    | example.com


_note: As you can see, my preference is to use the `master` branch for development._

## Guide
### Create a repo
[Hop onto your server](/silky-smooth-hopping) and create an empty git repository.


	$ cd /var/www
	$ mkdir example.com
	$ cd example.com
	$ mkdir example.git
	$ git init --bare

Configure git to play nice with `git push`.

	$ git config core.bare false
	$ git config receive.denycurrentbranch ignore

### Create a hook
Set up a [post-receive](https://www.kernel.org/pub/software/scm/git/docs/githooks.html#post-receive) hook to checkout on the pushed branch and apply the changes to our chosen directory.

Create the hook file and make it executable.

	$ cd hooks
	$ touch post-receive
	$ chmod +x post-receive
	$ vim post-receive

Now, there are a couple of ways to write this hook. Pick the one that gets you feeling fuzzy inside.

##### Option 1
**I want to** only deploy specific branches.

This hook will only deploy specific branches to specific directories. In this hook only the `production` and `staging` branches will be deployed to `/var/www/example.com/production` and `/var/www/example.com/staging`, respectively.

	#!bin/bash
	while read oldrev newrev ref
	do
		branch=`echo $ref | cut -d/ -f3`

		# example using a full path
		if [ "production" == "$branch" ]; 	then
			git --work-tree=/var/www/example.com/production checkout -f $branch
			echo "Changes pushed live."
		fi

		# example using a relative path
		if [ "staging" == "$branch" ]; then
			git --work-tree=../staging checkout -f $branch
			echo "Changes pushed to staging."
		fi

		# and so on…
	done

##### Option 2
**I want to** deploy all pushed branches to it's own directory.

This hook will deploy any branch pushed to a directory named after the branch. For example, `git push origin production` will be pushed to `/var/www/example.com/production`, `git push origin foo` to `/var/www/example.com/foo`, and so on.

	#!bin/bash
	while read oldrev newrev ref
	do
		branch=`echo $ref | cut -d/ -f3`

		mkdir -p ../$branch
		git --work-tree=../$branch checkout -f $branch
		echo "Changes pushed to $branch."
	done

### Deploy something
Back on our local machine, lets deploy our project!

	$ cd ~/Sites/example.com
	$ git remote add origin ssh://aaron@example.com/var/www/example.com/example.git
	$ git push origin master

**Fin.**

## Guide tl;dr {#tldr}
Stick this in your [dotfiles](http://dotfiles.github.io/).

	function gitorigin() {
		mkdir -p "$1"
		cd "$1"
		git init --bare
		git config core.bare false
		git config receive.denycurrentbranch ignore
		cat <<EOF >hooks/post-receive
	#!/bin/bash

	while read oldrev newrev ref
	do
		branch=\`echo \$ref | cut -d/ -f3\`
		mkdir -p ../\$branch
		git --work-tree=../\$branch checkout -f \$branch
		echo Changes pushed to \$branch
	done
	EOF
		chmod +x hooks/post-receive
		cd ..
	}

### Usage

Server

	$ cd /var/www/foo.com
	$ gitorigin foo.git

Local

	$ cd ~/Sites/foo.com
	$ git remote add origin ssh://aaron@foo.com/var/www/foo.com/foo.git
	$ git push origin master
