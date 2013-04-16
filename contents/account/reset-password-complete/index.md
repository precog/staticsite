title: Reset Password
author: Matthew De Goes
date: 2013-03-26 12:20
template: page.jade

<div class="two-columns">
    <h2>Select your new password!</h2>
    <p>Please fill out the form below to reset your new password!</p>
    <form class="precog-account-form" id="precog-form-reset-complete" method="post">
        <dl>
            <dt>
                <label for="new-password">New Password</label>
            </dt>
                <dd>
                    <input type="password" id="new-password" name="password">
                </dd>
            <dt>
                <label for="new-password-confirm">Confirm New Password</label>
            </dt>
                <dd>
                    <input type="password" id="new-password-confirm" name="confirmpassword">
                </dd>
        </dl>
        <input class="button small-button red-background" type="submit" value="Reset">
    </form>
</div>
<div class="two-columns-end">
</div>
<div class="clear-left"></div>