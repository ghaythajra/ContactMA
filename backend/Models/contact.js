const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({

    FirstName : {type : String,
                 required : true},
    LastName : {type : String,
        required : true} ,
    CIN :  {type : Number,
        required : true},
    PhoneNumber :  {type : String,
        required : true}
}, {timestamps: true})

module.exports = mongoose.model("contacts", ContactSchema)