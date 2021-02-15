var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var urlencodedBodyParser = bodyParser.urlencoded({extended:true});
app.use(urlencodedBodyParser);

//middle ware. express run public folder
app.use(express.static("public"));

app.set('view engine', 'ejs');

var submittedData = [];
//default route
app.get('/',function(req,res){
        res.send("OK");
});

app.post('/formdata', function (req,res){
    var msg = {
        mood:req.body.mood,
        color:req.body.color
    }
    submittedData.push(msg);
    console.log(submittedData);
    var dataWrapper = {data:submittedData};
    // var output ="<html><body><h1>Your Mood in Color is:</h1>";
    // output +="<div style='font-size:32px;color:" + msg.color + "'>" + msg.mood + "</div>"

    // output +="</body></html>"


    // res.send(output);
    res.render("outputtemplate.ejs", dataWrapper);
});

app.listen(80);