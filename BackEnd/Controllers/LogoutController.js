var Logout = async(req, res)=>{
    await req.logout();
    res.redirect('/');
  };

module.exports = {Logout}