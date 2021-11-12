---
name: post
layout: post
title: Creating videos
category: notes
tags: notes
---

Here's how I create the video/gifs.

```
# webm
ffmpeg -i in.mp4 -acodec libvorbis -ac 2 -ab 96k -ar 44100 -b 345k -s 798x500 out.webm

# mp4
ffmpeg -i in.mp4 -acodec libfaac -ab 96k -vcodec libx264 -level 21 -refs 2 -b 345k -bt 345k -threads 0 -s 798x500 out.mp4
```

_Height dimensions do not matter, it'll maintain aspect ratio_
