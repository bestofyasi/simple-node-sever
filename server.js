var express = require('express');

//post body ---> conver to json
var bodyParser = require('body-parser');

//Mongodb ORM
var mongoose = require('mongoose');
var app = express();

var Task = require('./models/task.model');
mongoose.connect('mongodb://127.0.0.1:27017/todoApp');

app.use(bodyParser.urlencoded({extended:true}));

app.get('/hello', function(req,res){
    res.send('Hello Node!');
});

app.post('/task/add', function(req, res){
    var task = new Task({
        title: req.body.title,
        done: req.body.done
    });

    task.save(function(err,data){
        if(err){
            res.status(400).json({error: err});
        }
        res.json({status: 'success', data:data});
    });
});

app.listen(3100,()=>{
    console.log("Sever up and running at "+3100);
});