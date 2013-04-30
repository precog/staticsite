title: Login
author: Matthew De Goes
date: 2013-03-26 12:20
template: page.jade

<div class="two-columns-even">
    <h2>Login below</h2>
    <form class="precog-account-form" id="precog-form-login" method="post">
        <dl>
            <dt>
                <label for="login-email">Your Email</label>
            </dt>
                <dd>
                    <input type="email" id="login-email" name="email">
                </dd>
            <dt>
                <label for="login-password">Your Password</label>
            </dt>
                <dd>
                    <input type="password" id="login-password" name="password">
                </dd>
                <a id="reset-password" href="#">Forgot your password? Click to reset.</a>
        </dl>
        <input class="button small-button red-background" type="submit" value="Login">
    </form>
</div>
<div class="two-columns-even-end">
    <h2>Or Create an Account</h2>
    <form class="precog-account-form" id="precog-form-create-account" method="post">
        <dl>
            <dt>
                <label for="user-email">Email</label>
            </dt>
                <dd>
                    <input type="email" id="user-email" name="email">
                </dd>
            <dt>
                <label for="login-name">Name</label>
            </dt>
                <dd>
                    <input type="text" id="login-name" name="name">
                </dd>
            <dt>
                <label for="login-company">Company</label>
            </dt>
                <dd>
                    <input type="text" id="login-company" name="company">
                </dd>
            <dt>
                <label for="create-title">Title</label>
            </dt>
                <dd>
                    <input type="text" id="create-title" name="create-title">
                </dd>
            <dt>
                <label for="new-password">Password</label>
            </dt>
                <dd>
                    <input type="password" id="new-password" name="new-password">
                </dd>
            <dt>
                <label for="new-password-confirm">Confirm Password</label>
            </dt>
                <dd>
                    <input type="password" id="new-password-confirm" name="confirm-password">
                </dd>
        </dl>
        <input class="button small-button red-background" type="submit" value="Create">
    </form>
</div>
<div class="clear-left"></div>