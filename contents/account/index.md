title: My Account
author: Matthew De Goes
date: 2013-03-26 12:20
template: page.jade

<div class="two-columns">
    <div id="precog-account-details">
        <h2>Precog Apps</h2>
        <div id="products-links">
            <a class="product-link-labcoat"  href="https://labcoat.precog.com" target="_blank"><span>launch</span></a>
            <a class="product-link-reportgrid"  href="http://builder.reportgrid.com" target="_blank"><span>launch</span></a>
            <div class="clear-left">
            </div>
        </div>
        <h2>General Account Information</h2>
        <h3>Name</h3>
        <div id="account-name" class="dark-background">
            <h3></h3>
        </div>
        <h3>Email</h3>
        <div id="account-email" class="dark-background">
            <h3></h3>
        </div>
        <h3>Company</h3>
        <div id="account-company" class="dark-background">
            <h3></h3>
        </div>
        <h2>api key</h2>
        <pre id="account-apikey"></pre>
        <p>Your API key allows you to use the Precog API and client libraries. Keep your API key secure, because it grants access to all your data.</p>
        <p>Learn more about the Precog security model in the <a href="/developers">Developer Center.</a></p>
        <h2>root path</h2>
        <pre id="account-basepath"></pre>
        <p>Your root path is where inside Precog your data is stored. You can create other directories inside your root path to organize data.</p>
        <p>Learn more about the Precog file system in the <a href="/developers">Developer Center.</a></p>
        <h2>analytics service</h2>
        <pre id="account-analyticsservice"></pre>
        <p>Your analytics service determines which cluster your account is deployed on. We separate freemium accounts from paid accounts.</p>
        <p>You will need the analytics service URL in order to use the Precog API or any of the client libraries.</p>
    </div>
</div>
<div class="two-columns-end">
    <div class="dark-background">
        <h2>Get Started</h2>
        <a href="/developers/">Developer Center</a>
        <p>Click here for our developer center, jam-packed with documentation and code snippets.</p>
        <a href="/developers/">Embed Reporting In Your App For Your Customers</a>
        <p>An easy guide for developers that shows them how to use Precog to embed self-service reporting into any app.</p>
        <a href="/developers/">Client Libraries</a>
        <p>Javascript, PHP and many more!</p>
        <a href="/developers/">REST API</a>
        <p>The easy to use Precog Rest API!</p>
        <a href="/products/precog/">Precog</a>
        <p>Precog is a next-generation analytics platform capable of advanced analytics on semi-structured data. </p>
        <a href="/products/reportgrid/">ReportGrid</a>
        <p>Visualize your data!</p>
        <a href="/products/labcoat/">Labcoat</a>
        <p>Analyze your data!</p>
    </div>
</div>
<div class="clear-left"></div>