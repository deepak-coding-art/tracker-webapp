// import modules
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();

// Use some middleware functions
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json({limit: "1mb"}));
app.use( express.static( "public" ) );
app.set('view engine', 'ejs');

// Private key
const jwtPrivateKey = "idmskj54#@$fincxzm2";

// dummy data for the api
let dummyData = {
    "id":"45dkl2F455",
    "active":true,
    "latitude":27.0278995,
    "longitude":75.8939335,
    "altitude":401.6,
    "time":1648814062,
    "speed":2,
    "satellites":4,
    "signal":-43,
    "pub_key":"sl093nap8d"
}

// dummy device list
let deviceList = {
    "deviceId": "",
    "password": ""
}

// temporary home route
app.get("/", validateUser, async (req,res) => {
    res.status(200).render("home", {devIce: req.user.id});
})

app.get("/about", validateUser, async (req, res) => {
    res.status(200).render("about")
})

// Login routes
app.get("/login", async (req, res) => {
    res.status(200).render("login", {message: ""});
})

// Login post
app.post("/login", async (req, res) => {
    let validDevice = await validateDevice(req.body);
    if(!validDevice){
        return res.status(200).render("login", {message: "Invalid ID/Password"});
    }
    deviceList = req.body;
    const token = await jwt.sign({id: deviceList.deviceId}, jwtPrivateKey, { expiresIn: '24h' });
    res.cookie("x-auth-token", token, {
        maxAge: 86400000,
        httpOnly: true, // no client side js access
        // secure: true, // https only use it
        // domain: example.com
    })
    return res.status(301).redirect("/");
})

// Api get route 
app.get("/api/:id", async (req, res) => {
    let validId = await validateId(req.params.id);
    if(!validId) {
        return res.status(400).send("Invalid ID/Password.");
    }
    return res.status(200).json(dummyData);
})

// Api posting route
app.post("/api/:id" , async (req, res) => {
    let validId = await validateId(req.params.id);
    if(!validId) {
        return res.status(400).send("Invalid ID/Password.");
    }
    let validData = await validateData(req.body);
    if(!validData){
        return res.status(400).send("Invalid data.");
    }
    let validPassword = validatePassword(req.body.pub_key)
    if(!validPassword){
        return res.status(400).send("Invalid ID/Password.")
    }
    dummyData = req.body
    dummyData.time = Math.round(Date.now()/1000)
    res.status(200).send("Ok");
})

// Logout route
app.get("/logout", validateUser, (req, res) => {
    res.clearCookie("x-auth-token");
    res.redirect("/login");
})

// All other routes 
app.use(async (req, res) => {
    res.status(404).render("404");
})

// Validation functions 
function validateId(deviceId) {
    if(deviceId != dummyData.id){
        return false;
    }
    return true;
}

function validateData(deviceData){
    for(var key in dummyData){
        if(deviceData.hasOwnProperty(key)){
            key = key;
        } else{
            return false;
        }
    }
    if(deviceData.id != dummyData.id){
        return false
    }
    return true;
}

function validatePassword(devicePassword){
    if(devicePassword != dummyData.pub_key){
        return false
    }
    return true
}

function validateDevice(loginData) {
    if(loginData.deviceId != dummyData.id || loginData.password != dummyData.pub_key){
        return false;
    }
    return true;
}

// Authenticate function
function validateUser(req, res, next){
    const token = req.cookies["x-auth-token"];
    if(!token) return res.status(401).send("no token")//redirect("/login");
    try{
    const decode = jwt.verify(token, jwtPrivateKey);
    req.user = decode;
    next();
    } catch (ex) {
        return res.status(401).send("invalid token")//redirect("/login")
    }
} 

// Start server on the port
const port = process.env.PORT || 3500;
app.listen(port, () => console.log(`listening on port ${port}...`));