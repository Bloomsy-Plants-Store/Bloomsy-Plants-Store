module.exports = ("/",(req,res,next)=>{
    console.log("MiddleWare Called..")
    next();
})