title: Existential Types FTW
author: Daniel Spiewak
date: 2012-10-17 00:00
template: post.jade

<p>One of the things that I&#8217;ve noticed, working at Precog with the likes of Miles, Erik, Kris, Tom, etc, is that we have a tendency to push Scala really, really hard.  Our code base is architecturally quite beautiful, but there are some places where we are doing things with the language that I didn&#8217;t even realize were possible, much less applicable to real-world design.  This has had a number of consequences beyond the obvious code interaction benefits.  First, we have a tendency to run into bugs and corner cases in scalac that are as bizarre as they are frustrating.  Second, we have learned a very great deal about how non-trivial Scala code bases can be modularized and broken down into discrete, manageable chunks.  As a team, we tend to talk more about the first consequence (language bugs), but I thought it was time to shed a little light on the second one.</p>
<p><strong>Overview</strong></p>
<p>Just to give you a bit of context, Precog is a big data analytics database offered as a platform-as-a-service solution.  We have a custom query language, called Quirrel (the misspelling is my fault, sorry) paired with an entirely custom stack from top to bottom.  Blueeyes and Akka sit on the frontend, handling asynchronous requests to our REST API.  In the compiler, parsing is handled by my GLL combinators project, with the various semantic analysis and emitter phases written without the aid of a framework.  We emit to a custom bytecode which is parsed, analyzed and resolved by our evaluator.</p>
<p><strong>Bake Me a Cake (as fast as you can)</strong></p>
<p>There are actually a lot of really cool tricks that we use which I could talk about.  I&#8217;m particularly proud of the compiler, which is exceptionally modular, purely functional with a self-contained AST, but also rigidly type-safe with expressed dependencies between phases.  If you&#8217;re curious about this aspect of the system, I&#8217;ll be giving a talk at Devoxx (and later at Scala Exchange) next month.</p>
<p>Honestly though, I think the most interesting trick we&#8217;ve been using is the Cake Pattern.  Our use of this pattern is basically the glue which holds the entire system together.  For those who may not be familiar with the Cake Pattern, here&#8217;s a quick overview...</p>
<p><strong>Basically, you start out with something like this:</strong></p>
<pre>
trait StorageCompopnent {
  def storeUser(user: User)
  def retrieveUser(id: Int): Option[User]
}

trait MySQLStorageComponent extends StorageComponent {
  override def storeUser(user: User) { ... }
  override def retrieveUser(id: Int): Option[User] = ...
}
</pre>
<p>In Spring terms, you can think of StorageComponent like a service that you will inject, where MySQLStorageComponent is a specific implementation thereof.  Once you have this, you can declare that some other component uses this service via inheritance:</p>
<pre>
trait AuthComponent extends StorageComponent {
  def authenticate(id: Int, hash: Vector[Byte]): Boolean =
    retrieveUser(id) map { _.hash == hash } getOrElse false
}
</pre>
<p>And so on, and so on…  This sort of thing ensures that you can never even get an instance of a component without ensuring that all of its dependencies are met.</p>
<p>There are a number of problems with this pattern though, problems which become apparent when you try to apply it on a large scale.  The very first thing we discovered is that we needed to abstract not only over implementation, but also type.  This leads us to a pattern much more like the following:</p>
<pre>
  trait StorageCompopnent {
  type User <: UserLike

  def storeUser(user: User)
  def retrieveUser(id: Int): Option[User]


  trait UserLike {
    def id: Int
    def hash: Vector[Byte]
  }
}

trait MySQLStorageComponent extends StorageComponent {
  override def storeUser(user: User) { ... }
  override def retrieveUser(id: Int): Option[User] = ...


  case class User(id: Int, hash: Vector[Byte]) extends UserLike
}
</pre>
<p>This is an excellent example of a concept called an existential type.  Basically, AuthComponent is using the type User without ever knowing its instantiation!  This is directly analogous to calling an abstract method without statically knowing (at the call site) what its implementation looks like.  This sort of thing is possible (and not restrictive) due to the fact that we have both an introduction and an elimination function for User.  The introduction function is retrieveUser, which gives us an instance of type User, whatever that type may be.  The storeUser function provides elimination, which is what makes type User actually useful beyond loading and examining.</p>
<p>Type User is further restricted by UserLike, which allows us to access properties of the value without knowing the specific type.  We also ocaisionally use a related pattern where we do not restrict User to be a subtype of a specific trait, but rather define a trait (much like UserLike) which defines all of the functions we want and an abstract implicit function from the existential type (User) to the pimp.  We don't use this very much anymore, but this pattern can be useful when you want to ensure that certain functions are only accessible within certain implicit contexts (a restriction that can be expressed by an implicit parameter taken by the abstract implicit conversion).</p>
<p>Configuration</p>
<p>Once you have the concept of existential types contributed by a single member of the cake, it's only a very small step toward existential types that are contributed by multiple members.  This is probably the coolest abuse of path dependent types that I have ever seen short of HList.  It goes something like this:</p>
<pre>
trait ConfigComponent {
  type Config
  def config: Config
}

trait MySQLStorageComponent extends StorageComponent with ConfigComponent {
  type Config <: MySQLConfig

  override def storeUser(user: User) { ... }
  override def retrieveUser(id: Int): Option[User] = ...


  case class User(id: Int, hash: Vector[Byte]) extends UserLike

  trait MySQLConfig {
    def mysqlHost: String
    def mysqlPort: Int
  }
}

trait GravatarComponent extends StorageComponent {
  type Config : GravatarConfi

  def avatarURL(user: User): String = { ... }

  trait GravatarConfig {
    def token: String
  }
}

class RESTService extends MySQLStorageComponent with GravatarComponent with ... {
  type Config = config.type

  override object config extends MySQLConfig with GravatarConfig {
    val mysqlHost = "localhost"
    val mysqlPort = 3336
    
    val token = "1234cafebabe"
  }

  ...
}
</pre>
<p>Obviously, that's a lot of code to digest.  The interesting bit is the "Config" type in MySQLComponent and GravatarComponent.  Notice how each component constraints Config to be a subtype of a different type?  This is the key to the whole technique.  Config is still existential in these contexts; we don't know exactly what it is.  However, within the scope of GravatarComponent, we do know that Config has a token function of type String, which we can use.  Within the scope of MySQLComponent, we know that it contains the host/port information.  Neither component knows about the other, and neither component is tangled with the other's configuration information.  It is all rigidly separated and modularized until the very end of the world, which happens in RESTService.  Here, we provide an instance of Config which satisfies both specific types.</p>
<p>In essence, what we're doing here is defining an existential type that is piecewise refined by different modules in the cake.  Implementation information is controlled and partitioned, tangling is avoided, and we have sidestepped the perennial problem of namespace pollution that plagues Cake-users.</p>
<p><strong>Benefits in Abstract</strong></p>
<p>We do a lot of other things with the Cake Pattern beyond just this, but I think the above gives you a reasonable taste.  While we have had some really annoying complexities that have come out of our use of the Cake Pattern, things have been (on the whole) extremely pleasant.  In abstract, this particular use of Scala has enabled the following benefits:</p>
<p>Limited-to-no "classical" OO  We use Scala's OO features to achieve polymorphic modules (the cake pattern) and flexible ADTs with reified constructor types (more on this in another post).  I can't remember the last time I saw an abstract class.  All of our logic-carrying code is written in a highly functional style, where the functions themselves live in polymorphic modules.  It's very reminiscent of SML.</p>
<p>Most-Specific type at the "end of the world"  Anyone who has used Spring (or any IOC framework) is likely aware of the annoyance associated with only having interfaces (rather than implementations) everywhere.  This can be extremely constraining, especially for testing.  The Cake pattern inverts this situation, giving you the most-specific type for everything once the cake has been put together, rather than the least-specific.  The reason for this is actually somewhat interesting from a theoretical standpoint, but it basically boils down to the fact that we're using existential rather than universal types at each point.  This is an undeniable benefit that has saved us literally hundreds of hours over the life of this project.</p>
<p>Complete separation of concerns  Our evaluator knows nothing about the specifics of the storage layer.  We could very easily swap in an entirely different storage backend (e.g. MongoDB) without ever touching our evaluator implementation.  However, the implementation of row-level operations like addition, subtraction or string-to-date conversion is aware of these details (since they have to be).  Due to the magic of abstract types, the evaluator is able to parse the bytecode, obtaining instances of these row-level operations, manipulate and optimize these operations, and finally invoke them against datasets, all without ever tying itself to the underlying implementation specifics.  Perfect inversion of control.</p>
<p>Testing without mocks  This is a benefit that is hard to over-state.  We use exactly 0 mocks in our entire test codebase.  Literally none.  On occasion, we provide stub or harness implementations of component abstract functions (e.g. storeUser), but this is the exception rather than the rule.  Each test specification (we use Specs2 with ScalaCheck) is focused on a single module in the cake, and therefore is able to zero in on exactly and only the functionality at hand.</p>
<p>Deeply-overriding behavior in tests  This is related to the first point.  Since we're using existential types which have a deferred specification, we are often free to override very deeply-entangled functionality at the point where components are caked together.  For example, our storage layer produces a dataset abstraction which lives inside a monad, M.  There is an abstract implicit def in scope which provides an instance of scalaz.Monad[M], but beyond this we have no knowledge of this type.  In the tests, we instantiate M with the Identity monad and provide a Copointed[M] instance, to allow easy checking of raw results.  In production, we instantiate M to be Akka's Future, for which we cannot define a (safe) Copointed instance.  This sort of overriding is seamless and natural, thanks to our use of existential types within the cake.</p>
<p>Multiple end-point configurations  I keep talking about the "end of the world", where all of the components and specific implementations are caked together and instantiated.  The truth is that we don't have a single "end of the world".  Rather, we have many different points and many different configurations of the cake, depending on use.  One of these points is our blueeyes REST API service.  Another is a command-line REPL for the Quirrel language.  Yet another serves as one of our integration test suites.  And that's not even everything!  In a sense, every single test specification is an "end of the world" point for some part of the cake.  Adding a new specification to the test suite is as easy as extending the trait that you want to test and implementing abstract methods and types until the compiler stops complaining.  No XML.  No reflection.</p>
<p><strong>Conclusion</strong></p>
<p>Overall, I have been deliriously happy with Scala's implementation of polymorphic modules in the form of trait mixins.  It is hard to overstate the benefits of these features in a large and complex system.  Working on this project has pretty firmly convinced me that the benefits of object-oriented programming are best realized in this form, with the bulk of your system's logic expressed in a functional style.  While there have certainly been many pain points along the way, I think that Scala does a better job than any other language in giving us the tools we need to keep our architecture sane and our code base manageable.</p>
<p>A lot of people look at the Precog team and ask, "Why are you using Scala?  Why not just use Haskell?"  While it's certainly true that we have the talent to pull off something like this, I don't think the results would be anywhere near as elegant.  Even above and beyond the ecosystem benefits of sitting on the JVM, Scala as a language provides so many tools and constructs that are indispensable to our architecture.  I don't regret our decision to use Scala, and I continue to eagerly anticipate further refinements in how we use the language and how well it is able to optimize for our needs.</p>