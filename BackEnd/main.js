const express = require("express");
const cors = require('cors');
const session = require('express-session');
const passport = require("./Utils/passportConfig");
const config = require('./config.json');
const app = express();

const PORT = process.env.PORT||7400

require('dotenv').config();

const bodyparser = require("body-parser");

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());


//Global MiddleWare
const logging = require("./MiddleWares/Logging");
app.use("/",logging);

// CORS middleware
const corsOptions = {
  origin: '*', //allowed origin
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
  exposedHeaders: ['x-auth-token', 'remember_me'],
  preflightContinue: true,
  preflight: function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-auth-token');
    res.setHeader('Access-Control-Expose-Headers', 'x-auth-token');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  },
  credentials: true,
};

app.options('*', cors(corsOptions));
app.use(cors(corsOptions));
app.use(express.json());

//Facebook , Google and Twitter Middlewares
app.use(session({
  secret: config.SECRETKEY,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

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
const busboy = require("busboy");
app.use('/api/auth/google', googleRoutes);

//LogOut Routes
const LogoutRoutes = require("./Routes/LogoutRoutes");
app.use("/api/auth/logout",LogoutRoutes);


//Products Routes
const productsRoutes=require('./Routes/ProductsRoutes');
app.use('/api/products', productsRoutes);

// Cart Route
const cartRoutes = require('./Routes/CartRoutes');
app.use('/users', cartRoutes);

// Order Route
const orderRouted = require('./Routes/OrderRoutes');
app.use('/user/order', orderRouted);

// Favourites Route
const favouritesRoutes = require('./Routes/FavouritesRoutes');
app.use('/users', favouritesRoutes);


// Stripe Route
const stripeRoutes = require('./Routes/StripeRoutes');
app.use('/charge', stripeRoutes);

// Revenue Route
const RevenueRoutes = require('./Routes/RevenueRoutes');
app.use('/', RevenueRoutes);

// Chatbot Route
const ChatbotRoutes = require('./Routes/ChatbotRoutes');
app.use('/', ChatbotRoutes);

app.listen(PORT, ()=>{console.log("http://localhost:"+PORT)})
