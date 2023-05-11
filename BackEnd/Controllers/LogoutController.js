var Logout = async(req, res)=>{
    await req.session.destroy((err) => {
      if(err) {
        res.status(400).json({message:'Failed to LogOut'})
      }else{
        res.status(200).json({message:'LogOut Successfully'})
      }
    });
  };

module.exports = {Logout}