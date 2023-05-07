const express = require("express");
const app = express();

const PORT = process.env.PORT||7400

const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

//Global MiddleWare
const logging = require("./MiddleWares/Logging");
app.use("/",logging);

// Register
const UserRoutes = require("./Routes/UsersRoutes");
app.use("/api/users",UserRoutes)

//LogIn Routes
const LoginRoutes = require("./Routes/LoginRoutes");
app.use("/api/login",LoginRoutes);

app.listen(PORT, ()=>{console.log("http://localhost:"+PORT)})

