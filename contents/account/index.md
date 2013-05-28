title: My Account
author: Matthew De Goes
date: 2013-03-26 12:20
template: page.jade

<div class="two-columns">
    <div id="precog-account-details">
        <div id="products-links">
            <a class="product-link-labcoat"  href="https://labcoat.precog.com" target="_blank"><span>launch</span></a>
            <a class="product-link-reportgrid"  href="http://builder.reportgrid.com" target="_blank"><span>launch</span></a>
            <div class="clear-left">
            </div>
        </div>
        <h2>General Account Information</h2>
        <h3>Email</h3>
        <div id="account-email" class="dark-background">
            <h3></h3>
        </div>
        <h2>master api key</h2>
        <pre id="account-apikey"></pre>
        <p>Your API key allows you to use the Precog API and client libraries. Keep your API key secure, because it grants access to all your data.</p>
        <p>Learn more about the Precog security model in the <a href="/developers">Developer Center</a>.</p>
        <h2>account id</h2>
        <pre id="account-id"></pre>
        <p>Your account ID uniquely identifies you across Precog's managed cloud offering. Even if you change your email address, your account ID will stay the same. All data you create and store in Precog will be owned by your account ID.</p>
        <p>Learn more about accounts in the <a href="/developers">Developer Center</a>.</p>
        <h2>root path</h2>
        <pre id="account-basepath"></pre>
        <p>Your root path is where inside Precog your data is stored. To make it easy to remember, it has the same name as your account ID.</p>
        <p>Learn more about the Precog file system in the <a href="/developers">Developer Center</a>.</p>
        <h2>analytics service</h2>
        <pre id="account-analyticsservice"></pre>
        <p>Your analytics service determines which cluster your account is deployed on. We separate freemium accounts from paid accounts.</p>
        <p>You will need the analytics service URL in order to use the Precog API or any of the client libraries.</p>
        <h2>manage your apikeys</h2>
        <div id="current-api-keys">
        </div>
        <form id="precog-create-apikey" class="precog-account-form-full" method="post">
            <dl class="two-columns">
                <dt>
                    <label for="form-name">Name</label>
                </dt>
                <dd>
                    <input type="text" id="form-name" name="form-path">
                </dd>
            </dl>
            <dl class="two-columns">
                <dt>
                    <label for="form-description">Description</label>
                </dt>
                <dd>
                    <input type="text" id="form-description" name="form-path">
                </dd>
            </dl>
            <dl class="clear-left"></dl>
            <dl>
                <dt>
                    <label for="form-path">Path</label>
                </dt>
                <dd>
                    <input type="text" id="form-path" name="form-path">
                </dd>
            </dl>
            <dl>
                <dt class="form-radio">
                    <label for="form-grants-read">Read</label>
                    <input type="checkbox" id="form-grants-read" name="form-grants" value="read">
                </dt>
                <dt class="form-radio">
                    <label for="form-grants-write">Write</label>
                    <input type="checkbox" id="form-grants-write" name="form-grants" value="write">
                </dt>
                <dt class="form-radio">
                    <label for="form-grants-delete">Delete</label>
                    <input type="checkbox" id="form-grants-delete" name="form-grants" value="delete">
                </dt>
                <dt class="clear-left"></dt>
            </dl>
            <input class="button small-button red-background" type="submit" value="Create">
        </form>
    </div>
</div>
<div class="two-columns-end">
    <div class="dark-background">
        <h2>Get Started</h2>
        <a href="/developers/">Developer Center</a>
        <p>Click here for our developer center, jam-packed with documentation and code snippets.</p>
        <a href="/developers/how-tos/embed-reporting/">Embed Reporting In Your App For Your Customers</a>
        <p>An easy guide for developers that shows them how to use Precog to embed self-service reporting into any app.</p>
        <a href="/developers/client-libraries/javascript/">Client Libraries</a>
        <p>Javascript, PHP and many more!</p>
        <a href="/developers/rest-apis/accounts/">REST API</a>
        <p>The easy to use Precog Rest API!</p>
    </div>
</div>
<div class="clear-left">
</div>