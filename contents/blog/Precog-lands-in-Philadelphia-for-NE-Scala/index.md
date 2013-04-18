title: Precog lands in Philadelphia for NE Scala
author: Tasha Kelly
date: 2013-02-7 18:07
template: post.jade

<p>Exactly half of the <a href="http://www.precog.com/about/team">Precog team</a> will be arriving today in Philadelphia for the <a href="http://nescala.org/">North East Scala Symposium</a>. The engineering team is very excited about not only attending the conference but also speaking in some of the sessions. If you're in the area and planning to attend, check out the talks below. If you have to live vicariously through them, follow the hashtag <a href="https://twitter.com/search?q=%23nescala&amp;src=typd">#nescala</a> for Twitter updates.<b><b><br />
</b></b></p>
<p><a href="/blog/images/nescala_team.jpg"><img class="alignnone size-medium wp-image-388" alt="nescala_team" src="/blog/images/nescala_team-300x148.jpg" width="300" height="148" /></a></p>
<p><strong><a style="line-height: 1.714285714; font-size: 1rem;" href="http://nescala.org/#keynote">The Bakery from the Black Lagoon</a></strong> (Keynote)<br />
Daniel Spiewak<br />
<a style="line-height: 1.714285714; font-size: 1rem;" href="http://twitter.com/djspiewak">@djspiewak<br />
</a>The Cake Pattern is often explained as a way of doing dependency injection in Scala in a statically typed framework. This is analogous to describing functional programming as a tool for manipulating List-like data structures. The pattern is capable of so much more. This talk will explore the Cake Pattern, from the very basics to its deepest recesses. We will look at the theoretical foundations of this pattern in type theory, the numerous and flaming pitfalls it imposes, as well as some best practices and day-to-day useful tips.</p>
<p><strong><a href="http://nescala.org/#t-32686092">Life After Monoids</a></strong><br />
Tom Switzer<br />
<a href="http://twitter.com/tixxit">@tixxit</a><br />
As functional programmers, many of us have made use of monoids and semigroups. However, abstract algebra is a rich field that provides many more useful abstractions. This talk will introduce some of these algebraic structures, starting with monoids, but also discussing groups, rings, fields, vector spaces and commutativity. This talk will show why these abstractions are important, how we can model these in Scala, and how they can be of benefit in everyday programming.<b><b><br />
</b></b><br />
<strong><a href="http://nescala.org/#t-3025132">Building a Data Science Platform in Scala</a></strong><br />
John A. De Goes<br />
<a href="http://twitter.com/jdegoes">@jdegoes</a><br />
In this talk, John A. De Goes, CTO of Precog, presents the high-level architecture of PrecogDB, a data science platform written in 100% Scala that provides a robust implementation of the data analysis language Quirrel on top of a proprietary data store. John discusses the challenges the team has had building systems-level code in the presence of megamorphic functions, monadic recursion, boxing, and monad transformers, while also highlighting some of the strengths of Scala and the bright hope of inlining, TCO, specialization, and macros.<br />
<b><b><br />
</b></b><a href="http://nescala.org/#t-14447186"><strong>Premature Optimization</strong><br />
</a>Erik Osheim<br />
<a href="http://twitter.com/d6">@d6</a><br />
As Scala developers we all know that the major performance wins come from choosing appropriate algorithms, taking advantage of parallelism, and using laziness to avoid doing more work than necessary. But sometimes it takes a bit more than that. This talk deals with the dark side of optimizing Scala code. Arrays. Specialization successes (and failures). Boxing and GC pressure. Hotspot voodoo. Inlining limitations. Reading Java Bytecode. Profiling and benchmarking.</p>
<p><strong><a href="http://nescala.org/#t-4414303">shapeless meets implicit macros</a></strong><br />
Miles Sabin<br />
<a href="http://twitter.com/milessabin">@milessabin</a><br />
shapeless makes extensive use of Scala&#8217;s implicit resolution mechanisms to compute types at compile time which guide runtime behaviour and statically witness properties of values and types. This works out very well for the most part, but it sometimes results in explosions in compile times: it&#8217;s a marvel that implicit resolution can be repurposed as a form of theorem proving, and hardly surprising if it doesn&#8217;t do it particularly efficiently. In this talk I will show how implicit macros can short-circuit type-level computation and make the techniques used by shapeless even more attractive.</p>