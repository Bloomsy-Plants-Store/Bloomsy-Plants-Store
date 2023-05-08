const express = require("express");
const session = require('express-session');
const passport = require("./Utils/passportConfig");
const config = require('./config.json');
const app = express();


const PORT = process.env.PORT||7400

const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

//Facebook middlewares
app.use(session({
    secret: config.SECRETKEY,
    resave: false,
    saveUninitialized: true
  }));
app.use(passport.initialize());
app.use(passport.session());

//Global MiddleWare
const logging = require("./MiddleWares/Logging");
app.use("/",logging);

// Register
const UserRoutes = require("./Routes/UsersRoutes");
app.use("/api/users",UserRoutes)

//LogIn Routes
const LoginRoutes = require("./Routes/LoginRoutes");
app.use("/api/login",LoginRoutes);

const facebookRoutes = require('./Routes/FacebookRoutes');
app.use('/auth/facebook', facebookRoutes);



app.listen(PORT, ()=>{console.log("http://localhost:"+PORT)})

