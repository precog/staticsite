title: My Account
author: Matthew De Goes
date: 2013-03-26 12:20
template: page.jade

<div class="two-columns">
    <div id="precog-account-details">
        <h2>General Account Information</h2>
        <h3>Account Name</h3>
        <div id="account-name" class="dark-background">
            <h3></h3>
        </div>
        <h3>Account Email</h3>
        <div id="account-email" class="dark-background">
            <h3></h3>
        </div>
        <h3>Account Company</h3>
        <div id="account-company" class="dark-background">
            <h3></h3>
        </div>
        <h2>Precog Account Details</h2>
        <h3>api key</h3>
        <pre id="account-apikey"></pre>
        <p>Your API key allows you to use the Precog API and client libraries. Keep your API key secure, because it grants access to all your data.</p>
        <p>Learn more about the Precog security model in the <a href="/developers">Developer Center.</a></p>
        <h3>root path</h3>
        <pre id="account-basepath"></pre>
        <p>Your root path is where inside Precog your data is stored. You can create other directories inside your root path to organize data.</p>
        <p>Learn more about the Precog file system in the <a href="/developers">Developer Center.</a></p>
        <h3>analytics service</h3>
        <pre id="account-analyticsservice"></pre>
        <p>Your analytics service determines which cluster your account is deployed on. We separate freemium accounts from paid accounts.</p>
        <p>You will need the analytics service URL in order to use the Precog API or any of the client libraries.</p>
    </div>
</div>
<div class="two-columns-end">
    <h2>Get started</h2>
    <div id="products-links">
        <a class="product-link-labcoat-account"  href="http://labcoat.precog.com" target="_blank"><span>launch</span></a>
    </div>
</div>
<div class="clear-left"></div>