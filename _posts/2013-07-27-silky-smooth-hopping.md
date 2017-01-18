---
name: post
layout: post
title: "Silky Smooth Hopping."
tags: ssh
---

If, like me, you tend to ssh onto your servers fairly often, you'll be familiar with this greeting.

![SSH password prompt](/img/blog/2013-07-27-silky-smooth-hopping/ssh.jpg)

## Guide

### Setup
On your local machine, copy your public key with this little one liner.

	$ cat ~/.ssh/id_rsa.pub | pbcopy

Log into the server for the last time using a password and paste your key in here:

	$ vi ~/.ssh/authorized_keys

That's it! You'll no longer be burdened by that email prompt.

### Usage

#### Good

	$ ssh you@example.com -p 1234

#### Better

	$ alias box="you@example.com -p 1234"
	$ ssh box

#### Best

	$ vi ~/.ssh/config
	Host box
		User you
		Hostname example.com
		Port 1234
	$ ssh box


"**S**ilky **S**mooth **H**opping" is a term coined by [Paul Irish](http://www.paulirish.com/) at [HTML5DevConf](http://marakana.com/s/post/1313/paul_irish_web_application_development_workflow_yeoman_html5_video).