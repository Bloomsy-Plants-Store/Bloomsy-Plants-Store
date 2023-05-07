var jwt = require("jsonwebtoken");

module.exports = (req,res,next)=>{
    var Token = req.header("x-auth-token");
    if(!Token) return res.status(400).send("Access Denied...");
    
    if(isAdmin(Token)){
        next(); 
    }else{
        res.status(400).send("Forbidden Access...");
    }
}

function isAdmin(userToken){
    var decodePayload = jwt.verify(userToken,"thisistokensecret");
    if(decodePayload.adminRole){
        return true;
    }else{
        return false;
    }

}