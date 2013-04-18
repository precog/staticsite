title: The Precog Engineering Challenge
author: John De Goes
date: 2012-11-12 00:00
template: post.jade

<p>The Precog engineering team has a legendary reputation in some circles. <a href="http://www.precog.com/about/team">Members of the engineering team</a> were well-known before joining Precog. Most were open source contributors, book authors, language developers, speakers, and blog writers &#8212; highly-respected software engineers and computer scientists.</p>
<p>Here at Precog, we've worked hard to build an engineering culture that provides both huge challenges and great rewards to our team. Engineering here is a highly collaborative endeavor, and getting to work on some of the hardest problems in 21st century software development with such a bright and diverse group of people is a genuine pleasure.</p>
<h1>It&#8217;s Not Easy Being a Precog</h1>
<p>Every member of the Precog engineering team, no matter how accomplished or intelligent, has been challenged by the nature and the scope of the work here at Precog. We're building a full-stack, hosted, big-data analytics platform where everything from the lowest-level database machinery up through the evaluation stack for our Quirrel query language, to our groundbreaking data manipulation and visualization environment is built in-house.</p>
<p>Given this information, you shouldn&#8217;t be surprised that we take our time to hire new engineers.</p>
<p>Working at Precog means coping with a large, highly-abstracted codebase written in Scala in a purely functional style, making allowances for mutable data structures only where benchmarking can show unequivocally that it's necessary to do so for performance reasons. And while not everyone here is an expert in every field, one has to have a strong grasp of database design theory, high-performance and distributed computing, type theory, statistics, programming language theory, machine learning, and a half dozen or so other topics to be a well-rounded member of the team.</p>
<h1>The Hiring Process</h1>
<p>Every potential hire goes through a rigorous interview process designed to select for engineers who have both the skills necessary to be successful in our demanding, fast-paced environment and who fit well with the team by being willing to both share their knowledge and be continuously learning more.</p>
<p>The typical process goes something like this:</p>
<ol>
<li><strong>First Contact.</strong> We have an initial chat to explain what we&#8217;re about and what we&#8217;re looking for, and to see if there&#8217;s mutual interest in proceeding to the next step. This is not a technical interview, although we might probe your background a bit. For most of our current hires, I reached out to specific individuals with the intention of stealing them from their current jobs. A few hires have been inbound.</li>
<li><strong>Challenge Problem.</strong> We assign a challenge problem based on your background. This is the main criteria we use to decide whether or not to hire you. I&#8217;ll discuss the challenge problem below.</li>
<li><strong>Technical Followup.</strong> If your solution to the challenge problem blows us away, we don&#8217;t typically do a technical interview. But if your solution to the challenge problem was borderline, we might do a technical interview or ask you to revise your solution. Otherwise, we politely tell you there&#8217;s not a fit.</li>
<li><strong>Meet the Team.</strong> If we like your technical chops, then we have you meet the team to assess cultural and personality fit. As a Precog employee, you are going to war with your team, and we&#8217;re in it to win. If you can&#8217;t form strong relationships with your team mates, then it&#8217;s probably not going to work out.</li>
<li><strong>The Offer.</strong> If the team loves you and wants you to join (and the feeling is mutual!), then I make an offer. We&#8217;re still a small company, so we can&#8217;t pay the big bucks like Oracle, but we do try to compensate people fairly with generous stock options, above average healthcare, and meaningful perks like ski passes, gym memberships, a tab at our favorite coffee hangout, incredibly interesting and challenging problems, and an amazing team that will push you to be everything you can be.</li>
</ol>
<h1>The Challenge Problem</h1>
<p>The challenge problem is the single most important part of the interview process for an engineer, though we also consider the candidate's history of open-source contributions carefully.</p>
<p>The challenge problem is, like many in the industry, just a programming assignment. We don't impose a limit on the amount of time you take to come up with a solution, and have had candidates take upwards of 40 hours developing a solution, though candidates with a strong background in functional programming can expect to take less as functional thinking is always a major component of our challenges, and those new to the paradigm may struggle with this aspect.</p>
<p>Our challenge problems all have the following characteristics:</p>
<ol>
<li><strong>They are realistic.</strong> They reflect real problems that we have to solve every day. Your solution will only be a toy solution, of course, but it will be a toy solution to a very real problem you might have to work on if you came to Precog.</li>
<li><strong>They are seemingly impossible.</strong> Challenge problems often ask you to optimize along conflicting dimensions, forcing you to make compromises and think about the tradeoffs carefully.</li>
<li><strong>They are imprecise.</strong> Our challenge problems aren&#8217;t formally specified with 20 pages of rigorous documentation. Real world problems aren&#8217;t specified that way, and Precog engineers need the ability to work usefully even when aspects of the problem are vaguely specified and to be able to find out one way or another what the fundamental requirements are.</li>
<li><strong>They are fun.</strong> Yes, every software engineer has to do grunt work from time to time. But challenge problems should be genuinely addicting for any engineer made of the stuff we&#8217;re looking for.</li>
<li><strong>They are ethical.</strong> We only give out problems we&#8217;ve already solved better than you can solve in the time you have, we never use any of your work, and we encourage you to open source it since it can help augment your Github portfolio.</li>
</ol>
<p>I&#8217;ve been promising for some time now to release one of these challenge problems to the general public, for those who want to try their hand at it just for the sheer joy of it.</p>
<p>Obviously, releasing a challenge problem means we can no longer use it for hiring. That&#8217;s OK, though, since we have literally hundreds of different problems we&#8217;ve worked on that we can translate into very interesting and self-contained challenge problems.</p>
<p>Without further ado, I present to you one of our best challenge problems, which involves developing a fault-tolerant, highly-performant, compact key-value data store.</p>
<p>This challenge problem was successfully solved by Tom Switzer and Gabriel Claramunt, and not solved by many more. Like Tom and Gabriel, I hope you have a lot of fun working on it. Good luck!</p>
<h1>Challenge Problem: Key-Value Store</h1>
<p>Your mission, should you choose to accept it, is to provide a disk-backed implementation of the following Scala traits:</p>
<pre>sealed trait Reader[A]
case class More[A](value: Option[(Array[Byte], Array[Byte])] =&gt; Reader[A]) extends Reader[A]
case class Done[A](value: A) extends Reader[A]

trait DiskStore {
  def put(key: Array[Byte], value: Array[Byte]): Unit

  def get(key: Array[Byte]): Option[Array[Byte]]

  def flush(): Unit

  def traverse[A](start: Array[Byte], end: Array[Byte])(reader: Reader[A]): A
}

trait DiskStoreSource {
  def apply(name: String): DiskStore
}</pre>
<p>The <strong>DiskStore</strong> trait provides an abstraction for a disk-backed key/value store in which the keys are totally ordered by the bytes that comprise them. The trait provides a means to store and retrieve individual key/value pairs, to flush data to disk, and to traverse a range of key/values in order of the keys.</p>
<p>The <strong>DiskStoreSource</strong> trait provides a means to retrieve disk stores given their string-based names.</p>
<p>The <strong>Reader</strong> trait is used by <strong>DiskStore.traverse()</strong> to determine how many key/value pairs to read. When the implementation of <strong>traverse()</strong> is done, it sends<strong>None</strong> to the reader to indicate no more data is available. This should cause a well-behaved <strong>Reader</strong> to return <strong>Done</strong>, producing a value that is returned by the<strong>traverse()</strong> method.</p>
<p><strong>Reader</strong> is an example of an iteratee (Google the term to learn more).</p>
<p>The implementation of <strong>DiskStore</strong> must satisfy the following constraints:</p>
<ul>
<li>The write performance must approach the linear write performance of the hard disk as measured by raw Java IO.</li>
<li>Duplicate values cannot be stored more than once. That is, if you add 10000 keys all with the value &#8220;John Doe&#8221;, then the text &#8220;John Doe&#8221; must be stored only a single time.</li>
<li><strong>flush()</strong> must obey the obvious contract.</li>
<li>If the program is forcibly terminated at any point during writing to a disk store, then retrieving the disk store may not fail and must preserve all information prior to the most recent call to <strong>flush()</strong>.</li>
<li>You must assume the number of unique values is too great to fit into memory.</li>
</ul>
<p>Please develop your solution in Scala, using Specs2 for unit testing, and either publish it to a Github repository of your choice, or send us a tarball containing the solution.</p>
<p>You may spend as much or as little time as you like on the challenge problem. However, we do ask you to roughly keep track of how many hours you spend working on the solution.</p>
<p>Good luck, and let me know if you need any hints!</p>
<p>Hints: There are no performance requirements on reads, and there is no need to write data to disk immediately (only <strong>flush()</strong> will guarantee data is persisted).</p>