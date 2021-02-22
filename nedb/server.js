var datastore = require('nedb');
var db = new datastore({filename:'database.json',autoload:true});


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

app.get('/displayrecord',function(req,res){
    db.find({_id:req.query._id},function(err,docs){
        var dataWrapper = {data:docs[0]};
        res.render("individual.ejs",dataWrapper);
    });
});

app.post('/formdata', function (req,res){
    var msg = {
        mood:req.body.mood,
        color:req.body.color,
        longtext:req.body.longtext
    }

    db.insert(msg,function(err,newDoc){
        //res.send("data saved" + newDoc);
    });

    db.find({}, function(err, docs){
        var dataWrapper = {data:docs};
        res.render("outputtemplate.ejs", dataWrapper);
    });

    //var dataWrapper = {data:submittedData};
    // var output ="<html><body><h1>Your Mood in Color is:</h1>";
    // output +="<div style='font-size:32px;color:" + msg.color + "'>" + msg.mood + "</div>"

    // output +="</body></html>"


    // res.send(output);
    //res.render("outputtemplate.ejs", dataWrapper);
});

app.listen(80);