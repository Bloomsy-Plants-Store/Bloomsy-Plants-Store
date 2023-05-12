const getEmailTemplate = (name, confirmationCode) => {
  return `
    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
    style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
    <tr>
        <td>
            <table style="background-color: #f2f3f8; max-width:670px; margin:0 auto;" width="100%" border="0"
                align="center" cellpadding="0" cellspacing="0">
                <tr>
                    <td style="height:80px;">&nbsp;</td>
                </tr>

                <tr>
                    <td style="height:20px;">&nbsp;</td>
                </tr>
                <tr>
                    <td>
                        <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                            style="max-width:670px; background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                            <tr>
                                <td style="height:40px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="padding:15px 35px;">
                                    <img width="300" height="150" src="https://media.tenor.com/q2lP9vEriZUAAAAC/party-plants.gif" title="logo" alt="logo">
                                    <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Hi ${name}</h1>
                                    <p style="font-size:15px; color:#455056; margin:8px 0 0; line-height:24px;">
                                        Your account has been created on the <br> <strong style="@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&display=swap'); font-family: 'Dancing Script', cursive; font-style:italic; font-weight:bold"> Bloomsy Plants_Shop </strong><br><strong>Please verify your account
                                            by click on the button below</strong>.</p> <br>
                                    <a href="http://localhost:7400/api/auth/register/confirm/${confirmationCode}"
                                        style="background:rgb(20, 85, 38);text-decoration:none !important; display:block; font-weight:500; margin-top:15px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">
                                        Verify Account</a>
                                </td>
                            </tr>
                    
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="height:20px;">&nbsp;</td>
                </tr>
                <tr>
                    <td style="text-align:center;">
                        <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>www.Bloomsy.com</strong> </p>
                    </td>
                </tr>
                <tr>
                    <td style="height:80px;">&nbsp;</td>
                </tr>
            </table>
        </td>
    </tr>
</table>`;
};

const getResetPasswordEmailTemplate = (name, resetToken) => {
    return `
    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
    style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
    <tr>
        <td>
            <table style="background-color: #f2f3f8; max-width:670px; margin:0 auto;" width="100%" border="0"
                align="center" cellpadding="0" cellspacing="0">
                <tr>
                    <td style="height:80px;">&nbsp;</td>
                </tr>

                <tr>
                    <td style="height:20px;">&nbsp;</td>
                </tr>
                <tr>
                    <td>
                        <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                            style="max-width:670px; background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                            <tr>
                                <td style="height:40px;">&nbsp;</td>
                            </tr>
                            <tr>
                                <td style="padding:15px 35px;">
                                    <img width="300" height="150" src="https://media.tenor.com/q2lP9vEriZUAAAAC/party-plants.gif" title="logo" alt="logo">
                                    <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Hi ${name}</h1>
                                    <p style="font-size:15px; color:#455056; margin:8px 0 0; line-height:24px;">
                                        Your account has been created on the <br> <strong style="@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600&display=swap'); font-family: 'Dancing Script', cursive; font-style:italic; font-weight:bold"> Bloomsy Plants_Shop </strong><br><strong>Please verify your account
                                            Click On Below Button to Reset Your Password</p> <br>
                                    <a href="http://localhost:4200/reset-password"
                                        style="background:rgb(20, 85, 38);text-decoration:none !important; display:block; font-weight:500; margin-top:24px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">
                                        RESET PASSWORD</a>
                                </td>
                            </tr>
                    
                        </table>
                    </td>
                </tr>
                <tr>
                    <td style="height:20px;">&nbsp;</td>
                </tr>
                <tr>
                    <td style="text-align:center;">
                        <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>www.Bloomsy.com</strong> </p>
                    </td>
                </tr>
                <tr>
                    <td style="height:80px;">&nbsp;</td>
                    ${resetToken}
                </tr>
            </table>
        </td>
    </tr>
</table>`;

};

module.exports = { getEmailTemplate , getResetPasswordEmailTemplate};
