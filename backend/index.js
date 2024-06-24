var express = require("express");
var bodyparser = require("body-parser");
var upload = require("express-fileupload");
var session = require("express-session");
var cors = require ("cors")


var admin_route = require("./routes/admin_route");

var app = express();

app.use(bodyparser.urlencoded({extended:true}));
app.use(upload());
app.use(cors());
app.use(express.json());
app.use(session({
    secret:"secret",
    resave:true,
    saveUninitialized:true
}));
app.use(express.static("public/"));

app.use("/",admin_route);


app.listen(1000); 

//npm i express
//npm init
//npm i ejs
//npm i mysql
//npm i express-fileupload
//npm i express-session
//npm i cors
