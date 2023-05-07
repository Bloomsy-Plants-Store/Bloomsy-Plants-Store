module.exports = ("/",(req,res,next)=>{
    console.log("logging...")
    next();
})