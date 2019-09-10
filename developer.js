let mongoose = require ('mongoose');

let developerSchema = mongoose.Schema({
    name: {
        fname:{
            type: String,    
            required:true
        },
        lname:{
            type: String
        }
        
    },
    level:{
        type : String,
        required : true
        
    },
    address: {
        state:{
            type:String
        },
        suburb:{
            type:String
        },
        street:{
            type:String
        },
        unit:{
            type:String
        }
    }
    
});



                                    //collection name, but in mongodb, all in lower case
let developerModel = mongoose.model("DeveloperCollection", developerSchema);
module.exports=developerModel;

//collection name: DeveloperCollection


