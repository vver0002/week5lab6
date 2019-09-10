let mongoose = require ('mongoose');

let taskSchema = mongoose.Schema({
      
    tname: {
        type: String
        
    },
    assignTo:{
        type:mongoose.Schema.Types.ObjectId,
        
        ref: 'DeveloperCollection'
        
    },
    dueDate: {
        type:Date
    },
    tstatus:{
        type:String,
        required:true
    },
    tdescrip:{
        type:String
    }

});



                                    //collection name, but in mongodb, all in lower case
let taskModel = mongoose.model("TaskCollection", taskSchema);
module.exports=taskModel;

//collection name: DeveloperCollection
//collection name: taskCollection

