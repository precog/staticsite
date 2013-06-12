title: Scribe Analytics &mdash; Open Source Web Analytics Reimagined
author: John De Goes
date: 2013-06-12 00:00
template: post.jade

There are dozens of commercial web analytics solutions available today, from Google Analytics to Clicky to Mixpanel. 

However, there are a number of drawbacks to most of these analytics offerings:

* They force you to use a certain backend, such as Google Analytics. This means it's very hard to combine the web analytics data with other kinds of data at your company.
* They are from another era, when it was much more expensive to capture and store data. As a result, they generally only capture simple behaviors like clicks and page views. Real user behavior is far richer and more nuanced.
* They require programmers to write code in JavaScript to capture custom behaviors, such as "downloading an app" or "playing a video". This requires costly integration and you have to know what you're looking for to measure it (which is seldom the case).
* Many offerings are focused on pages, not people (although a few newer products like KissMetrics get this right). Many companies use both marketing automation software and web analytics software to try to get a holistic sense of user behavior, which results in even more data silos.

What's the solution to these problems? 

Of course, people have different opinions. In my opinion, the reason that web analytics products exist is because BI software (or, more generally and more precisely, analytics infrastructure) failed to meet the needs of companies trying to learn more about their online audiences.

The volume of data is too great, much of it is too sloppy, and existing relational technology (RDBMS) is poorly suited to analyze large quantities of event-oriented data.

Wherever there's a need, the market finds a way. And so today, we have literally dozens of web analytics companies, many of which are doing quite well, filling an important gap in the marketplace.

But technology doesn't stand still. "Big data" technology is growing more sophisticated. Data stores are more forgiving of heterogeneous and denormalized data. It's cheaper than ever to store terabytes or even petabytes of data. And analytics tools for big data continue to improve (albeit, they are still many years away from being truly accessible).

It's in this context that I would like to introduce you to [Scribe Analytics](https://github.com/scribe-analytics/scribe-analytics), an [open source library](https://github.com/scribe-analytics/scribe-analytics) that specifically addresses many of the pain points above, and takes advantage of some of the technological progress being made in the big data ecosystem.

Scribe Analytics is a pure front-end analytics solution. It's a couple of static files that you can host anywhere (including on a CDN). There's no server-side code.

Not only does this approach offload a lot of work to clients (where CPU and memory are plentiful and free!), but client-side analytics solutions are capable of capturing an enormous amount of detail that is not visible to server-side approaches.

Indeed, Scribe Analytics attempts to capture numerous aspects of user behavior, relying on cheap network and storage to create extremely detailed profiles of user behavior.

In particular, all of the following behaviors are captured at the level of every single visitor:

* Page views Ñ Every page view event is captured, together with information on the browser, referrer, platform, and much more.
* Clicks Ñ Every click event will be captured, including information on the element that is clicked (id, title, data attributes, unique css selector). If a link is clicked, then then information on the link target will be captured, as well.
* Engagements Ñ Every engagement with any HTML element in a document is captured, including information on the element (id, title, data attributes, unique css selector). Engagement is defined as a mouseover inside a certain time window (e.g. 1 and 20 seconds). Mouseovers outside the time window are not counted as engagements.
* Jumps Ñ Every jump (defined as navigation inside a page which results in a change to the URL hash) is captured, including information on the element that was jumped to (id, title, data attributes, unique css selector).
* Forms Ñ All form interaction, including form abandonment and form submission, is captured, including details on all form fields that are not marked as passwords and which have not turned off auto-complete (via the autocomplete property). Forms interaction inside iframes will not be captured.
* Redirects Ñ Scribe will attempt to capture JavaScript redirects, but if the user is redirected to another site, and never returns, the redirect may not be captured.
* Reloads Ñ All page reloads are captured. A reload occurs whenever the page is refreshed, either by the user or programmatically.

This is just a start. As Scribe Analytics matures, it will capture even more detailed information (such as how much time your page spends in the background and in the foreground, how many tabs are open to your site at a time, and so forth), and even as I write this, cross-domain visitor tracking is in development (enabling you to see a complete picture of your users as they cross different online properties).

Scribe Analytics is capable of tracking all this data either anonymously, using persistent visitor ids, or tied to a specific identified user, if you supply information on the identity of the user by invoking a JavaScript function.

Scribe Analytics requires no coding or configuration. By default, it will aggressively track everything that users do down to the smallest detail, even saving form details so you can later tie user behaviors to specific (identified) users.

Of course, Scribe Analytics is just a front-end, which means you need a backend to store this data, to perform analysis, and to create charts and reports. So Scribe Analytics is really only half the solution to the web analytics problem.

But as pure open source software, you can plug Scribe Analytics into any backend that has the capability to handle large volumes of potentially heterogeneous, denormalized, event-oriented data.

Over time, I expect communities to contribute many different back-ends for Scribe Analytics (if you want to contribute one, just let me know!).

Of course, Scribe Analytics ships with a Precog-integration out of the box, so if you're a Precog user, you can drop Scribe into your web pages, and analyze and visualize data (or build dashboards) using Labcoat. It's as easy as that.

The flexibility to use your own back-end means that it's easier than ever to tie web analytics data to sales data, customer support data, CRM data, and other kinds of data inside your company. 

Since Scribe Analytics was designed for modern infrastructure, it captures all user behavior, and lets you decide later what might be important, without needing to write any custom JavaScript code (zero integration and configuration!).

Finally, Scribe Analytics makes it easy to identify users, but you may not even have to do that since Scribe tracks enough data that if users fill out any forms on your website, you can tie the anonymous data back to specific users.

Scribe Analytics is hosted on [Github](https://github.com/scribe-analytics/scribe-analytics), and is released under the New BSD License, which makes it free to use and modify even for commercial projects.

Please [check it out](https://github.com/scribe-analytics/scribe-analytics) and let me know what you think!
