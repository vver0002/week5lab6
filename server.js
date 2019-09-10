//Import packages
const express = require("express");
//const mongodb = require("mongodb");
const bodyparser = require('body-parser');
const app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static('img'));
app.use(express.static('css'));
app.use(bodyparser.urlencoded({ extended: false }));
app.listen(8080);


//the reference to mongodb module ref
let mongodb = require('mongodb');
//from the ref to get client
let mongoDBclient = mongodb.MongoClient;
//from the client get the db
let url = "mongodb://localhost:27017";
mongoDBclient.connect(url,{useNewUrlParser: true},function(err,client){
    if (err){
        console.log('Err',err);
    }
    else{
        console.log("Connected successfully to server");
        db = client.db('fit2095lab5');
        col=db.collection('tasks');
        //col.insertOne({TaskID : 2, TaskName : "built scope statement", AssignTo : "Caroline", DueDate : 09/01/2019, TaskStatus : "Complete", TaskDescription : "list all the scope statement based on the running case"});
        //col.insertOne({TaskName : "built scope statement", AssignTo : "Caroline", DueDate : 09/01/2019, TaskStatus : "Complete", TaskDescription : "list all the scope statement based on the running case"});

    }
})

//Insert new User
//GET request: send the page to the client
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/insertask', function (req, res) {
    res.sendFile(__dirname + '/insert.html');
});
//POST request: receive the details from the client and insert new document (i.e. object) to the collection (i.e. table)
app.post('/insertask', function (req, res) {
    let userDetails = req.body;

    col.insertOne({TaskID : userDetails.taskId, TaskName : userDetails.taskName, AssignTo : userDetails.assignTo, DueDate : userDetails.dueDate, TaskStatus : userDetails.taskStatus, TaskDescription : userDetails.taskDesc});
    res.redirect('/getasks'); // redirect the client to list tasks page
});



//List all users
//GET request: send the page to the client. Get the list of documents form the collections and send it to the rendering engine
app.get('/getasks', function (req, res) {
    col.find({}).toArray(function (err, data) {
        console.log(data);
        res.render(__dirname + '/getasks.html', { usersDb: data });
    });
});

//Update user: 
//GET request: send the page to the client 
app.get('/updatestatus', function (req, res) {
    res.sendFile(__dirname + '/update.html');
});

//POST request: receive the details from the client and do the update
app.post('/updatetaskstatus', function (req, res) {
    let userDetails = req.body;
    let filter = { TaskID: userDetails.taskId };
    let theUpdate = { $set: { TaskStatus : userDetails.statusNew } };
    col.updateOne(filter, theUpdate);
    res.redirect('/getasks');// redirect the client to list users page
})


//GET request: send the page to the client to enter the user's name
app.get('/deletebyID', function (req, res) {
    res.sendFile(__dirname + '/deleteID.html');
});
//POST request: receive the user's name and do the delete operation 
app.post('/deletetaskid', function (req, res) {
    let userDetails = req.body;
    let filter = { TaskID: userDetails.taskId };
    col.deleteOne(filter, function (err, obj) {
        console.log(obj.result);
      });

    res.redirect('/getasks');// redirect the client to list users page
});


app.get('/deletecomp', function (req, res) {
    res.sendFile(__dirname + '/deletecomp.html');
});
//POST request: receive the user's name and do the delete operation 
app.post('/deleteallcomp', function (req, res) {
    //let userDetails = req.body;
    let filter = { TaskStatus: "Complete" };
   // col.deleteOne(filter);
    col.deleteMany(filter, function (err, obj) {
        console.log(obj.result);
      });
    res.redirect('/getasks');// redirect the client to list users page
});



app.get('/insertMany', function (req, res) {
    res.sendFile(__dirname + '/insertMany.html');
});
//POST request: receive the details from the client and insert new document (i.e. object) to the collection (i.e. table)
app.post('/insertaskmany', function (req, res) {
    let userDetails = req.body;

    let input =[{TaskID : userDetails.taskId, TaskName : userDetails.taskName, AssignTo : userDetails.assignTo, DueDate : userDetails.dueDate, TaskStatus : userDetails.taskStatus, TaskDescription : userDetails.taskDesc}];
    let tid = parseInt(userDetails.taskId);
    for(let i=1; i<userDetails.count;i++){
        tid++;
        input.push({TaskID : tid, TaskName : userDetails.taskName, AssignTo : userDetails.assignTo, DueDate : userDetails.dueDate, TaskStatus : userDetails.taskStatus, TaskDescription : userDetails.taskDesc})
    }

    col.insertMany(
        input
        );
    res.redirect('/getasks'); // redirect the client to list tasks page
});