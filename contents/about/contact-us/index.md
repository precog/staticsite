title: "Contact Us"
author: Matthew De Goes
date: 2013-03-26 12:20
template: page.jade

<div id="body-contactus">
    <div class="three-columns">
        <h2>Signup for our Newsletter</h2>
        <form method="post" action="https://app.icontact.com/icp/signup.php" name="icpsignup" id="icpsignup88" accept-charset="UTF-8" onsubmit="return verifyRequired88();" >
            <input type="hidden" name="redirect" value="http://www.precog.com/site/newsletter/">
            <input type="hidden" name="errorredirect" value="http://www.icontact.com/www/signup/error.html">
            
            <div id="SignUp">
            <table width="260" class="signupframe" border="0" cellspacing="0" cellpadding="5">
                    <tr>
                  <td valign="top" align="right">
                    <p><span class="required">&#42;</span> Email</p>
                  </td>
                  <td align="left">
                    <input type="text" name="fields_email">
                  </td>
                </tr>
                    <tr>
                  <td valign="top" align="right"><p>First Name</p>
                  </td>
                  <td align="left">
                    <input type="text" name="fields_fname">
                  </td>
                </tr>
                    <tr>
                  <td valign="top" align="right"><p>Last Name</p>
                  </td>
                  <td align="left">
                    <input type="text" name="fields_lname">
                  </td>
                </tr>
                <input type="hidden" name="listid" value="1366">
                <input type="hidden" name="specialid:1366" value="N0SQ">
            
                <input type="hidden" name="clientid" value="1348845">
                <input type="hidden" name="formid" value="88">
                <input type="hidden" name="reallistid" value="1">
                <input type="hidden" name="doubleopt" value="0">
                <tr>
                  <td> </td>
                  <td><p class="mini-text"><span class="required">&#42;</span> = Required Field</p></td>
                </tr>
                </table>
                <input class="red-background small-button" type="submit" name="Submit" value="Sign Up">
            </div>
        </form>
        <script type="text/javascript">
        
        var icpForm88 = document.getElementById('icpsignup88');
        
        if (document.location.protocol === "https:")
        
                icpForm88.action = "https://app.icontact.com/icp/signup.php";
        function verifyRequired88() {
          if (icpForm88["fields_email"].value == "") {
            icpForm88["fields_email"].focus();
            alert("The Email field is required.");
            return false;
          }
        
        
        return true;
            }
            </script>
    </div>
    <div class="three-columns">
        <h2>Contact Us</h2>
        <h4>Sales</h4>
        <a class="sales-link" href="mailto:sales@precog.com">sales@precog.com</a>
        <h4>Support</h4>
        <a class="support-link" href="mailto:support@precog.com">support@precog.com</a>
        <h4>Support Center</h4>
        <a class="small-button blue-background" href="http://support.precog.com/support/home">Support Center</a>
    </div>
    <div class="three-columns-end">
        <h2>Social Connections</h2>
        <a href="https://twitter.com/Precog"><i class="icon-twitter-sign"></i></a>
        <a href="https://www.facebook.com/precogplatform"><i class="icon-facebook-sign"></i></a>
    </div>
    <div class="clear-left">
    </div>
</div>