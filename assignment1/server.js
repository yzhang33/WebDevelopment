var express = require('express');
var app = express();
//middle ware. express run public folder
app.use(express.static("public"));

//default route
app.get('/',function(req,res){
        res.send("OK");
});


app.listen(80);