---
name: post
layout: post
title: "Project: Tutora."
tags: freelance work project
meta: <a href="https://tutora.co.uk">https://tutora.co.uk/</a>
---

This is a rare opportunity for me to showcase some of my work that isn't shrouded by an NDA.

![Tutora Brand](/img/blog/project-tutora/brand.jpg)

Starting life as an idea roughed out in an email, I was tasked with planning, branding,
designing and developing what would become [Tutora](https://tutora.co.uk/). Roughly a year later, they've been
live just over a month.

### What is it?
I'd like to learn how to play the piano. You might need an English teacher for your
under/over acheiving child. Trawling through the classifieds (or even Google) 
looking for a nearby rockin' tutor sucks. Tutora makes it _soooooo_ easy.

#### Search
Students can search tutor profiles that have been vetted by Tutora and are now 'live'. You can
search by subject (Maths) and location (Leopold Square, Sheffield).

We quickly find tutors that teach your chosen subject and are nearby. The 'Best Match' algorithm
takes into consideriation, amongst other things and in no particular order, the quality of the tutor
and their profile, how active they are and their reviews.

{% include components/browser.html videos="video/webm:/videos/project-tutora/search.webm,video/mp4:/videos/project-tutora/search.mp4" src="/img/blog/project-tutora/search.jpg" alt="Tutora - Search" url="https://tutora.co.uk/search/maths-gcse/tutors-near/sheffield-south-yorkshire/" %}

For seo reasons, we use the users query to perform the search and display a
natural language(ish) version for the headings and url.

There are two main criteria that form the basis for all searches: distance and subjects.

Tutors are searched by distance from the query quickly and accurately. Taking into account
the cuvature of the Earth, it's accurate to a few centimeters.

Subjects are searched recursively from parent nodes, down. For example, searching "English" would
return "English" and every one of it's children: "English (GCSE)", "English (A-Level)", "English Literature", etc.

Not bad for a bit of math and MySQL.

#### Profiles
Tutors create profiles on which they: write a biography/about me, set an hourly rate, upload
a profile picture, list the subjects they teach, list the qualifications they have and
privately tell us exactly where they're based.

{% include components/browser.html videos="video/webm:/videos/project-tutora/profile.webm,video/mp4:/videos/project-tutora/profile.mp4" src="/img/blog/project-tutora/profile.jpg" alt="Tutora - Profile" url="https://tutora.co.uk/tutors/pn3apr6w/" %}

On page editing is the bomb.

#### Messaging
A student gets the ball rolling by messaging a tutor. They talk on the sites messaging
system to agree on a date, time, duration, etc.

{% include components/browser.html src="/img/blog/project-tutora/messaging.jpg" alt="Tutora - Messaging" url="https://tutora.co.uk/" %}

#### Booking
When the time comes, the tutor can book a lesson in for the student. Students and tutors can
see their past and upcoming lessons on their respective dashboards, prices are automatically
calculated based on the tutors <abbr title="at the time of booking">rate</abbr> and bookings
can be set to repeat every week on the same day/time.

{% include components/browser.html src="/img/blog/project-tutora/booking.jpg" alt="Tutora - Booking" url="https://tutora.co.uk/" %}

Both tutors and students can see their upcoming lessons on their dashboard, and, reminders are
emailed out just before each lesson.

#### Payments
All payments are handled by the site. We automatically take payments from the students shortly after
the lesson takes place and pay the tutor their earnings on a weekly basis.

Tutora takes a small cut.

### Final words
Tutora was, and still is, huge fun to work on. I'm proud of it.
