let mongoose =require('mongoose');
//no need to require mongodb

let express = require('express');
app = express();

//user    (because of the explore)
let User = require('./models/user');
let Car = require('./models/car')

let url = "mongodb://localhost:27017/week6lec"  //database name
// let url = "mongodb://128.0.15.66:27017/Travel"  //database name

//connet to the server (simple one 
mongoose.connect(url,function(err){
    if (err) console.log(err);
    else{
        console.log ('connected!');
        //create a suser
        // let user = new User({
        //     name : 'Tim',
        //     age : 23,  //validator error
        //     address : 'Melbourne'
        // });

        // //time to save
        // user.save(function(err){
        //     if (err) console.log(err);
        //     else console.log('User Saved!!!');
        // })
    }
})

app.get('/getusers',function(req,res){
    User.find().exec(function(err,data){
        res.send(data);
    })
})

app.get('/adduser/:name/:age/:address/:maker/:year',function(req,res){
    let theName = req.params.name;
    let theAge = parseIt(req.params.age);
    let theAddre = req.params.address;
    let theMaker = req.params.maker;
    let theYear = parseInt(req.params.year);

    let user = new User({
        theName : 'Tim',
        age : 23,  //validator error
        address : 'Melbourne'
    });

    //time to save
    user.save(function(err){
        if (err) console.log(err);
        else {
            console.log('User Saved!!!');  //if user created succus, create ht enew car and link to the new user

            let car =new Car({
                maker:theMaker,   //maker is the schema name
                year:theYear,
                user:user._id   //the user just created
            });

            car.save(function(err){
                if (err)
                console.log(err);

                else
                console.log('car...saved');
            })

        }
    })

    res.redirect('/getusers'); 
})

app.get('/getcar',function(req,res){
    Car.find().populate('user').exec(function(err,data){
        res.send(data);  //populate: user become a object inside each car collection
    })                   //populate bring the whole document
})

app.listen(8080);
