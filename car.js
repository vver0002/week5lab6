let mongoose = require('mongoose');
let carSchema = mongoose.Schema({
    maker: String,
    year : Number,
    user:           //duplicate the data for user is not good
                  // better to save the id of the user (mongodb created for collection)
    {
        type:mongoose.Schema.Types.ObjectId,
        //where can find that, where to save?
        ref: 'UserCollection'
    }
})

let carModel = mongoose.model("carCollection",carSchema);
//export
module.exports=carModel;