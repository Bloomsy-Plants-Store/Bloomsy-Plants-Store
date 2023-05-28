const getEmailTemplate = (name, confirmationCode) => {
    return `
          <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
          style="@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&display=swap'); font-family: 'Open Sans', sans-serif;">
          <tr>
                  <td>
                  <table style="background-color: #f2f3f8; max-width:670px; margin:0 auto;padding-top:45px;" width="100%" border="0"
                  align="center" cellpadding="0" cellspacing="0">
                  <tr>
                      <td>
                          <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                              style="max-width:670px; background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,0.6);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);padding:15px">
                              <tr>
                                  <td style="padding:15px 35px;">
                                      <img width="300" height="150" src="https://media.tenor.com/q2lP9vEriZUAAAAC/party-plants.gif" title="logo" alt="logo">
                                      <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Hi <span style="font-family:'Dancing Script', cursive;">${name}</span></h1>
                                      <p style="font-size:15px; color:#455056; margin:8px 0 0; line-height:24px;">
                                          Your account has been created on the <br> <strong style="font-family: 'Dancing Script', cursive; font-style:italic; font-weight:bold"> Bloomsy Plants Shop </strong><br><strong>Please verify your account
                                              by click on the button below</strong>.</p> <br>
                                      <a href="https://bloomsy.onrender.com/api/auth/register/confirm/${confirmationCode}"
                                      style="background:#628665;text-decoration:none !important; display:block; font-weight:500; margin-top:24px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">
                                      VERIFY ACCOUNT</a>
                                  </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
                  <tr>
                      <td style="text-align:center;">
                          <p style="font-size:14px; color:#628665; line-height:18px; margin-top:15px;">&copy; <a href="https://bloomsy-168d4.web.app/" style="color:#628665;text-decoration:none !important;"><strong>www.Bloomsy.com</strong> </a></p>
                      </td>
                  </tr>
              </table>
          </td>
      </tr>
  </table>`;
  };
  
  const getResetPasswordEmailTemplate = (name) => {
      return `
      <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
      style="@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&display=swap'); font-family: 'Open Sans', sans-serif;">
      <tr>
          <td>
              <table style="background-color: #f2f3f8; max-width:670px; margin:0 auto;padding-top:45px;" width="100%" border="0"
                  align="center" cellpadding="0" cellspacing="0">
                  <tr>
                      <td>
                          <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                              style="max-width:670px; background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,0.6);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);padding:15px">
                              <tr>
                                  <td style="padding:15px 35px;">
                                      <img width="300" height="150" src="https://i.pinimg.com/originals/a4/0a/4a/a40a4ab242edf05c812f843acbbaa067.gif" title="plants animation" alt="plants animation"/>
                                      <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;">Hi <span style="font-family:'Dancing Script', cursive;">${name}</span></h1>
                                      <p style="font-size:15px; color:#455056; margin:8px 0 0; line-height:24px;">Please Click On Below Button to Reset Your Password</p>
                                      <a href="https://bloomsy-168d4.web.app/reset-password"
                                          style="background:#628665;text-decoration:none !important; display:block; font-weight:500; margin-top:24px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">
                                          RESET PASSWORD</a>
                                  </td>
                              </tr>
                          </table>
                      </td>
                  </tr>
                  <tr>
                      <td style="text-align:center;">
                          <p style="font-size:14px; color:#628665; line-height:18px; margin-top:15px;">&copy; <a href="https://bloomsy-168d4.web.app/" style="color:#628665;text-decoration:none !important;"><strong>www.Bloomsy.com</strong> </a></p>
                      </td>
                  </tr>
              </table>
          </td>
      </tr>
  </table>`;
  
  };
  
  module.exports = { getEmailTemplate , getResetPasswordEmailTemplate};