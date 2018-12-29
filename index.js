const express = require("express");
const app = express();

const feedRoute = require("./routes/feed.route");
const orgRoute = require("./routes/org.route");
const userRoute = require("./routes/user.route");
const dbConfig = require("./configs/database.config");
const mongoose = require("mongoose");

mongoose.connect(dbConfig.server + "/" + dbConfig.database, {
    useNewUrlParser: true
})
.then(()=>{
    console.log("DB Connected!!!!");
})
.catch(()=>{
    console.log("DB Connection Failed!!")
});

app.get("/", (req, res)=>{
    res.status(200);    
    res.send("Begining of an amazing journey!!");
});

app.use("/user", userRoute);
app.use("/feed", feedRoute);
app.use("/org", orgRoute);

app.use(function (req, res, next) {
    res.header("Content-Type","application/json");
    next();
});

app.listen(8000, ()=>{
    console.log("Listening on Port 8000");
});