title: Precog-Copointed Monad Transformers
author: Tom Switzer
date: 2013-01-29 18:07
template: post.jade

<h2>Monad Transformers: Wrapping an Astronaut in a Burrito</h2>
<p>In this post, we&#8217;ll be looking at monad transformers &#8212; a topic that sounds far more complicated than it is. First, we&#8217;ll briefly discuss what a monad transformer is, then talk about 2 concrete instances of monad transformers that we use at Precog (<code>EitherT</code> and <code>StreamT</code>), and then we&#8217;ll discuss the composability of monads in general.</p>
<p>A monad transformer is just a way to mix in the behaviour of some monad into another. Perhaps we want a <code>Future</code> with the ability to report errors like we can with <code>Either</code>. Or a <code>Stream</code>, whose elements are produced in a future. With the <code>EitherT</code> and <code>StreamT</code> monad transformers we can create monads that<br />
do precisely this. Other monad transformers can mix in the behaviour of <code>Option</code>, <code>State</code>, and more. To illustrate our motivation for using these monad transformers, we&#8217;ll use 2 examples; one where we implement a simple service that delegates to a web service and another where we stream data off disk to be processed efficiently and in a single pass.</p>
<h2>Evolving a Simple Service to Use Monad Transformers</h2>
<p>To start us off, we&#8217;ll build on our previous article, <a href="http://precog.com/blog-precog-2/entry/the-abstract-future">&#8220;The Abstract Future,&#8221;</a> as monad transformers and abstracting over your monad compliment each other so nicely. Let&#8217;s say we have a simple service for managing users.</p>
<pre><code>
// Don't worry -- we wouldn't actually store a plain text password <img src='http://blog.precog.com/wp-includes/images/smilies/icon_wink.gif' alt=';)' class='wp-smiley' /> 
case class User(userId: String, email: String, password: String)

trait UserService[M[+_]] {
  implicit def M: Monad[M]

  def createUser(email: String, pass: String): M[User]
  def retrieveUser(email: String): M[Option[User]]
  def updateUser(id: String, user: User): M[User]
  def deleteUser(userId: String): M[Option[User]]
  def authenticate(email: String, pass: String): M[Validation[String,User]]
}
</code></pre>
<p>You can see we&#8217;ve taken our own advice and have decided to abstract over our monad <code>M[+_]</code>, which wraps the return values of all methods in the service. Now, this service may have multiple implementations. For example, when testing other code that depends on <code>UserService</code> we&#8217;ll develop a version that stores users in memory. We&#8217;ll also need a version that interacts with a user database directly, perhaps LDAP or MongoDB. Lastly, since we are our own users of our products, we will implement a version that wraps the <em>users</em> RESTful web service.</p>
<p>So, first, for testing, we&#8217;d likely create a simple version that uses a <code>Map</code> to store users in, keyed by user ID.</p>
<pre><code>class TestUserService[M[+_]](implicit val M: Monad[M]) extends UserService[M] {
  val idGen = new java.util.concurrent.AtomicInteger()
  val users: mutable.Map[String, User] = SyncMap.empty

  def createUser(email: String, pass: String): Id[User] = M.point {
    val userId = idGen.getAndIncrement().toString
    val user = User(userId, email, pass)
    users(userId) = user
    user
  }

  ...
}
</code></pre>
<p>In the case above, it is very easy to implement the API. We are working in memory, so we don&#8217;t have to worry about failure of the underlying data store &#8212; if our memory is <em>down</em>, then we have bigger problems! Because of this, the actual monad we use doesn&#8217;t really matter &#8212; it could be <code>Id</code> for all we care.</p>
<p>Well time passes and now we&#8217;ve turned this service into a web service. And now we want to implement a version of <code>UserService</code> that delegates all its work to this web service. At first glance, we&#8217;d want our <code>M</code> to be <code>Future</code>, as the HTTP calls will be asynchronous. Seems simple enough,</p>
<pre><code>final class WebUserService(config: Config) extends UserService[Future] {
  def M = FutureMonad

  def createUser(email: String, pass: String): M[User] = {
    http.post("/users/", Map("email" -&gt; email, "pass" -&gt; pass)) map { r =&gt;
      parseUser(r)  
    }
  }

  ...
}
</code></pre>
<p>This looks fine and dandy &#8212; but wait! What if our HTTP request fails? What happens? More than likely an exception will be thrown by the <code>post</code> method. This is may be OK, but if you are the type of person who prefers <code>Either</code> (or <code>Validation</code>) to throwing/catching exceptions, then you probably want to make the &#8220;spotty&#8221; nature of web services explicit, so you know errors will be dealt with. What would be nice, is if we could return a <code>Future</code> with an extra side-channel whose sole purpose is to report HTTP errors. What we really want is a monad that works like both <code>Future</code>, because HTTP calls are asynchronous, and <code>Either</code>, because those HTTP calls may fail. What we want is <code>EitherT</code>!</p>
<h3><a class="anchor" href="#eithert" name="eithert"></a>EitherT</h3>
<p>The main bit of <code>EitherT</code> we&#8217;re concerned with is reporduced here:</p>
<pre><code>sealed trait EitherT[M[+_], +A, +B] {
  val run: M[A \/ B]
  ...
}
</code></pre>
<p>Note that <code>\/[A, B]</code> is just Scalaz 7&#8242;s version of Scala&#8217;s <code>Either[A, B]</code> and <code>A \/ B</code> is some syntatic sugar Scala provides that is equivalent to <code>\/[A, B]</code>.</p>
<p>We can see that <code>EitherT</code> is just a wrapper around <code>M[A \/ B]</code>. Nonetheless, if we fix <code>M</code> and <code>A</code> in <code>EitherT[M[_], A, _]</code>, then we have a monad! So, let&#8217;s rewrite our <code>WebUserService</code> class above, fixing <code>M</code> to <code>Future</code> and <code>A</code> to some error class, <code>HttpError</code>.</p>
<pre><code>case class HttpError(msg: String)

// Our Monad! There is an implicit instance available from Scalaz.
type HttpResponse[+A] = EitherT[Future, HttpError, A]

class WebUserService(config: Config) extends UserService[HttpResponse] {
  def createUser(email: String, pass: String): HttpResponse[User] = {
    // EitherT.eitherT needs a Future[HttpError \/ User] here.
    EitherT.eitherT({
      http.post("/users/", Map("email" -&gt; email, "pass" -&gt; pass)) map { r =&gt;

        \/.right(parseUser(r))

      } recover { case (e: HttpException) =&gt;

        // recover is a method on `Future` that let's us recover from
        // thrown exceptions.
        \/.left(HttpError(e.getMessage())

      }
    })
  }

  ...
}
</code></pre>
<p>Now our <code>WebUserService</code> has a nice way of reporting HTTP errors. This is completely distinct from the &#8220;normal&#8221; Future failure channel (which will catch exceptions) and reflects the nature of HTTP much better. Notice that we get this for free &#8212; we didn&#8217;t need to change the API of <code>UserService</code> at all! One API seamlessly handles a <code>UserService</code> that is synchronous, asynchronous, and asyncronous with possible failure.</p>
<h2>Transforming Data with Monad Transformers</h2>
<p>With our <code>UserService</code> in place, now we can start providing services to our users. One of the core functions of our data analytics platform at Precog is transforming streams of data. Streams are nice because they are <em>lazy</em> and <em>restartable</em>. The laziness means that we can compose multiple transformations together, but only apply them when we finally need to stream the data off disk; perhaps to reduce the data to a single value or output it to a user. Restartability means that we can hold onto the head of a stream at any point and always traverse the stream again. If, for example, we&#8217;re joining 2 streams of data and both sides have long runs of data that share a single key, we will need to restart one of those streams multiple times. With a stream, we can just hold onto the stream at start of our run and then simply re-traverse the stream from that point whenever we need to.</p>
<p>Unfortunately, Scala&#8217;s <code>Stream</code> is on-demand. If you ask for the next element, it&#8217;ll block while it retrieves it. In our system, our data can come from any number of sources, including <a href="http://precog.com/precog-on-mongodb">MongoDB</a>, <a href="http://blog.precog.com/?p=356">Postgres</a>, or <a href="http://precog.com/products/precog">our own fast propietary data store</a>. In all of these cases, we want to access the data asynchronously and that means it&#8217;s coming in a <code>Future</code>. So, what we want to do is mix together <code>Stream</code> with <code>Future</code> and for this we use Scalaz&#8217;s <code>StreamT</code>.</p>
<h3>StreamT</h3>
<p>The easiest way to construct a <code>StreamT</code> is using <code>StreamT.unfoldM</code> which uses <code>Option</code> to determine the end of a stream. Here is a simple example of how we might load some data from a datastore. The <code>loadDataFrom</code> method will load up some chunk of data starting at <code>key</code>.</p>
<pre><code>def loadDataFrom(key: Key): Future[(Key, Block)]

def load(from: Key, to: Key): StreamT[Future, Block] = {
  StreamT.unfoldM(from) { key =&gt;
    if (key &lt; to) {
      loadDataFrom(key) map { case (lastKey, block) =&gt;
        Some((block, lastKey))
      }
    } else {
      Future(None)
    }
  }
}
</code></pre>
<p>You&#8217;ll notice that we actually return a <code>Future</code> when we load a block of data. The <code>StreamT</code> let&#8217;s us mix in this behaviour with the stream. Now we can just treat the stream as we would any other stream.</p>
<pre><code>val data = load(from, to)
  .map(transform1(_))
  .map(transform2(_))
  .map(transform3(_))
  .foldLeft(reduction.zero)(_ |+| _)
</code></pre>
<p>What we get out of this is a <code>Future</code> with the value of our reduction that requires just a single pass over our data, which is pulled out of a DB in a <code>Future</code>.</p>
<h2>Composing Monads</h2>
<p>What&#8217;s important to realise is that a monad transformer is just a way to compose 2 monads. And now that you&#8217;ve seen <code>EitherT</code> and <code>StreamT</code> in action, you may realize you have your own monad you use that you&#8217;d like to compose with another. A natural question we can ask is if given any 2 monad <code>M[_]</code> and <code>N[_]</code>, can we always compose them and get a monad? Put another way, is <code>({ type &#923;[&#945;] = M[N[&#945;]] })#&#923;</code> a monad?</p>
<p>It may come as a surprise to some readers that the answer is <em>no</em>. Monads are not, in general, composable. It is easiest to see this as a code example. Take the lowly <code>Functor</code> (a la [Scalaz][]).</p>
<pre><code>trait Functor[M[_]] {
  def map[A, B](m: M[A])(f: A =&gt; B): M[B]
}
</code></pre>
<p>As a warm up, let&#8217;s think about how would we compose a <code>Functor</code>?</p>
<pre><code>trait ComposedFunctor[M[_], N[_]]
    extends Functor[({ type &#923;[&#945;] = M[N[&#945;]] })#&#923;] {
  def M: Functor[M]
  def N: Functor[N]

  def map[A, B](mna: M[N[A]])(f: A =&gt; B): M[N[B]] = ???
}
</code></pre>
<p>Turns out, <code>map</code> is fairly easy to implement.</p>
<pre><code>...
def map[A, B](mna: M[N[A]])(f: A =&gt; B): M[N[B]] =
  M.map(mna)(na =&gt; N.map(na)(f))
...
</code></pre>
<p>Let&#8217;s get a little more specialized; what about <code>Applicative</code>?</p>
<pre><code>trait ComposedApplicative[M[_], N[_]] extends ComposedFunctor[M, N]
    with Applicative[({ type &#923;[&#945;] = M[N[&#945;]] })#&#923;] {
  def M: Applicative[M]
  def N: Applicative[N]

  def point[A](a: =&gt; A): F[A] = M.point(N.point(a))
  def ap[A, B](mna: =&gt; M[N[A]])(mnf: =&gt; M[N[A =&gt; B]]): M[N[B]] = {
    M.ap(mna, f map { (nf: N[A =&gt; B]) =&gt;
      { (na: N[A]) =&gt; N.ap(na)(nf) }
    })
  }
}
</code></pre>
<p>OK, so we can compose functors and applicatives, now what about monads? The main method we need to implement here is <code>bind</code>:</p>
<pre><code>trait ComposedMonad[M[_], N[_]] extends ComposedApplicative[M, N]
    with Monad[({ type &#923;[&#945;] = M[N[&#945;]] })#&#923;] {
  def M: Monad[M]
  def N: Monad[N]

  def bind[A, B](fa: M[N[A]])(f: A =&gt; M[N[B]]): M[N[B]] = ???
}
</code></pre>
<p>This is not left as an exercise for the reader, though you are welcome to try. It turns out that <code>bind</code> cannot be implemented purely in terms of 2 monads. It is somewhat ironic that one of the heros of functional programming isn&#8217;t composable.</p>
<p>Well, clearly we aren&#8217;t doomed to never compose our monads, as we&#8217;ve already seen that a few examples of composable monads (<code>Either</code>, <code>Stream</code>, etc.). Even more, there is a large class of monads that are composable. A <a href="http://web.cecs.pdx.edu/%7Empj/pubs/composing.html">great paper by Mark Jones</a> discusses 3 general constructions for creating monad transformers. One I will highlight is the <em>swap</em> construction. Generally, it means that if you can implement the following for some monad <code>N</code>, then you can implement <code>bind</code>:</p>
<pre><code>trait Swappable[N[+_]] {
  def swap[M[+_], A](ma: N[M[A]]): M[N[A]] = ???
}
</code></pre>
<p>Kris Nuttycombe pointed me to Scalaz&#8217;s <code>Traversable</code>, which happens to have a very similar definition for <code>traverseImpl</code>. In fact <code>swap</code> and <code>traverseImpl</code> can both be implemented in terms of each other). So, without loss of generality, we can just work with the existing <code>Traverse</code> interface.</p>
<pre><code>trait Traverse[N[_]] extends Functor[N] with Foldable[N] { self =&gt;
  def traverseImpl[M[_]: Applicative, A, B](fa: N[A])(f: A =&gt; M[B]): M[N[B]]
  ...
}
</code></pre>
<p>So, can we implement <code>bind</code> with a <code>Traversable</code>? Yes.</p>
<pre><code>trait ComposedMonad[M[_], N[_]] extends ComposedApplicative[M, N]
    with Monad[({ type &#923;[&#945;] = M[N[&#945;]] })#&#923;] {
  def M: Monad[M]
  def N: Monad[N] with Traversable[N]

  def bind[A, B](fa: M[N[A]])(f: A =&gt; M[N[B]]): M[N[B]] = {
    M.join(fa map { na =&gt; N.traverseImpl(na)(f) map N.join })
  }
}
</code></pre>
<p>Immediately you can see that we can use this to implement many of our favourite monad transformers, including <code>OptionT</code>, <code>ListT</code>, <code>EitherT</code>, etc. However, while this construction is simple, it also doesn&#8217;t necessarily produce <em>useful</em> monad transformers. For instance, Scala&#8217;s <code>Stream</code> is traversable, but <code>M[Stream]</code> does not have the properties we want for our data stream discussed above; it would require we complete all futures &#8212; load all the data into memory &#8212; before we could even access the stream. Not good. <code>StreamT</code> goes further and provides an implementation that mixes both behaviours in a way that is very powerful. The point being that simple composition isn&#8217;t necessarily exactly what we want.</p>
<h2>Conclusion</h2>
<p>At Precog, we also make great use of <code>StateT</code>. If you would like to learn more about <code>StateT</code>, I&#8217;d suggest watching <a href="http://www.youtube.com/watch?v=Jg3Uv_YWJqI">Michael Pilquist&#8217;s fantastic &#8220;State Monad&#8221; talk.</a> There are of course others, such as <code>ReaderT</code>, <code>WriterT</code>, <code>ReaderWriterStateT</code>, and lots more.</p>
<p>Monad transformers let us mix behaviours of different monads together, without having to write custom monads. We saw how we can use <code>EitherT</code> to add a more explicit failure mode to <code>Future</code>. We also showed how we can use <code>StreamT</code> to elegantly solve the problem of lazily streaming data from some remote data source.</p>