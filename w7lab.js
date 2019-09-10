let mongoose =require('mongoose');
//no need to require mongodb
const bodyparser = require('body-parser');

let express = require('express');
app = express();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static('img'));
app.use(express.static('css'));
app.use(bodyparser.urlencoded({ extended: false }));
app.listen(8080);

let Task = require('./task');
let Developer = require('./developer')

let url = "mongodb://localhost:27017/week7lab"  



mongoose.connect(url,function(err){
    if (err) console.log(err);
    else{
        console.log ('connected!');
        
    }
})

// Insert a new Developer: adds a new document to ‘Developers’ collection
app.get('/addNewDeveloper', function (req, res) {
    res.sendFile(__dirname + '/addDeve.html');
});
app.post('/addDeveloper', function (req, res) {
    let deveDetails = req.body;
    console.log(deveDetails);
    let developer = new Developer({
        name:{
            fname : deveDetails.defn,
            lname : deveDetails.deln
        },  
        level : deveDetails.delevel,
        address:{
            state: deveDetails.destate,
            suburb: deveDetails.desub,
            street : deveDetails.dest,
            unit: deveDetails.deunit
        }
    });

    //time to save
    developer.save(function(err){
        if (err) console.log(err);
        else {
            console.log('Developer Saved!!!');  

        }
    })
    res.redirect('/getdeveloper'); // redirect the client to list tasks page
});


// Get all developers page: shows all the developers in a table format (including the _id field)
app.get('/getdeveloper', function (req, res) {
    Developer.find().exec(function(err,data) {
        console.log(data);
        res.render(__dirname + '/alldeveloper.html', { usersDb: data });
    });
});


// Insert new task page: adds a new document to Tasks collection. (Hint: Get the Developer’s ID from the  ‘Get all developers page’ manually)
app.get('/insertask', function (req, res) {
    res.sendFile(__dirname + '/insert.html');
});
app.post('/insertask', function (req, res) {
    let taskDetails = req.body;

    let task = new Task({
        tname : taskDetails.taskName,
        assignTo : taskDetails.assignTo,  
        dueDate : taskDetails.dueDate,
        tstatus: taskDetails.taskStatus,
        tdescrip: taskDetails.taskDesc
    });

    //time to save
    task.save(function(err){
        if (err) console.log(err);
        else {
            console.log('Task Saved!!!');  
   
        }
    })
    res.redirect('/getasks'); // redirect the client to list tasks page
});



// Get all tasks page: shows all the tasks in a table format
app.get('/getasks', function (req, res) {
    Task.find().exec(function(err,data) {
        console.log(data);
        res.render(__dirname + '/getasks.html', { usersDb: data });
    });
});


// Delete task by taskID: the page takes a taskID as input and deletes its tasks from the DB
app.get('/deletebyID', function (req, res) {
    res.sendFile(__dirname + '/deleteID.html');
});
app.post('/deletetaskid', function (req, res) {
    let taskDetails = req.body;

    Task.deleteOne({_id:taskDetails.taskId},function(err,doc){
        console.log(doc);
    });

    res.redirect('/getasks');// redirect the client to list users page
});


// Delete all the completed tasks
app.get('/deletecomp', function (req, res) {
    Task.deleteMany({'tstatus' : 'Complete'},function(err,doc){
        console.log(doc);
    })
    res.redirect('/getasks');// redirect the client to list users page

});




// Update task status by taskID: the page takes two inputs: a taskID and a new status (either InProgress or Complete). It sets the new status to the task with taskID.
app.get('/updatestatus', function (req, res) {
    res.sendFile(__dirname + '/update.html');
});

app.post('/updatetaskstatus', function (req, res) {
    let taskDetails = req.body;
    let filter = { _id: taskDetails.taskId };
    let theUpdate = { $set: { 'tstatus' : taskDetails.statusNew } };
    Task.updateOne(filter, theUpdate,function(err,doc){
        console.log(doc);
    });
    res.redirect('/getasks');// redirect the client to list users page
})







//home page
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

//task4
app.get('/sort',function(req,res){
    
    Task.find().sort({tname: -1}).limit(5).exec(function(err,data) {
        console.log(data);
        //res.send(data);
        res.render(__dirname + '/getasks.html', { usersDb: data });
    });
})







 










