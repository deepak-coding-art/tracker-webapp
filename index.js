// import modules
const express = require("express");
const app = express();

// Use some middleware functions
app.use(express.urlencoded({ extended: true }));
app.use(express.json({limit: "1mb"}));

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

// temporary home route
app.get("/", async (req,res) => {
    res.status(200).send(dummyData);
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

// Start server on the port
const port = process.env.PORT || 3500;
app.listen(port, () => console.log(`listening on port ${port}...`));