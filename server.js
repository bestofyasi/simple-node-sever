var express = require('express');

//post body --> convert to json
var bodyParser = require('body-parser');

//Mongodb ORM
var mongoose = require('mongoose');
var app = express();

var Task = require('./models/task.model');

mongoose.connect('mongodb://127.0.0.1:27017/todoApp');


var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.get('/hello', function (req, res){
    res.send('Hello World');
});

// add
app.post('/task/add', function (req, res){
    var title = req.body.title;
    var done = req.body.done;

    console.log(req.body);
    var task = new Task({
        title: title,
        done: done
    });

    task.save(function (err, data){
        if(err){
            res.status(400).json({ error: err });
        }
        res.json({ status: 'success', data: data});
    });
});

//get
app.get('/task/list',function(req,res){
    Task.find({},function(err,data){
            if(err){
            res.status(400).json({ error: err });
        }
        res.json({ status: 'success', data: data});
    });
})

// view

app.get("/task/view/:id",function(req,res){
    Task.findById(req.params.id,function(err,data){

                    if(err){
            res.status(400).json({ error: err });
        }
        res.json({ status: 'success', data: data});
    })
});

// update
app.put('/task/update/:id',function(req,res){
    Task.findById(req.params.id, function(err,task){
        if(err){
               res.status(400).json({ error: err });
        }

        task.title = req.body.title;
        task.done= req.body.done;

        task.save(function(err,data){
 if(err){
            res.status(400).json({ error: err });
        }
        res.json({ status: 'success', data: data});
        });
    })
})

//delete
app.delete('/task/delete/:id',function(req,res){
     Task.findByIdAndRemove(req.params.id, function(err,task){
 
 if(err){
            res.status(400).json({ error: err });
        }
        res.json({ status: 'success', data: task});
        })
    
})

app.listen(3200, () => {
    console.log("server started at" + 3200);
} );