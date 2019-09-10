let mogoose = require ('mongoose');

let userSchema = mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    age:{
        type : Number,
        // min: 17,
        // max: 80
        validate:{       
            validator:function(value){    //value: supposed to use for age //return boolean 
                if(value % 2 == 0) 
                    return true; 
                else 
                    return false;
            },
            message:'Should be an even age. Soory :('  //if false will print the message
        }
    },
    address: {
        type:String,
        set:function(newAfddress){  //should return String, should be saved as the address
            console.log('Setter');
            return "you live in " + newAfddress; //add prefix   preproccessing

    }},
    created: {
        type: Date,
        default: Date.now()    //default value is current date
    }
});

//have access to all object before save, use middleware
userSchema.pre('save',function(){
    this.age += 2; //pre processing
    this.address += " city";
})

                                    //collection name, but in mongodb, all in lower case
let userModel = mongoose.model("UserCollection", userSchema);
module.exports=userModel;


