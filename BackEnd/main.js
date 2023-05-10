const express = require("express");
const cors = require('cors');
const session = require('express-session');
const passport = require("./Utils/passportConfig");
const config = require('./config.json');
const app = express();

const PORT = process.env.PORT||7400

const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

const corsOptions = {
  origin: 'http://localhost:4200', //allowed origin
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE'], //allowed methods
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'], //allowed headers
  exposedHeaders: ['x-auth-token'] //exposed headers
};

app.use(cors(corsOptions));

//Facebook , Google and Twitter middlewares 
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

// Register Routes
const UserRoutes = require("./Routes/UsersRoutes");
app.use("/api/auth/register",UserRoutes)

//LogIn Routes
const LoginRoutes = require("./Routes/LoginRoutes");
app.use("/api/auth/login",LoginRoutes);

const facebookRoutes = require('./Routes/FacebookRoutes');
app.use('/api/auth/facebook', facebookRoutes);

const twitterRoutes = require('./Routes/TwitterRoutes');
app.use('/api/auth/twitter', twitterRoutes);

const googleRoutes = require('./Routes/GoogleRoutes');
app.use('/api/auth/google', googleRoutes);

const productsRoutes=require('./Routes/ProductsRoutes');
app.use('/api/products', productsRoutes);

app.listen(PORT, ()=>{console.log("http://localhost:"+PORT)})
