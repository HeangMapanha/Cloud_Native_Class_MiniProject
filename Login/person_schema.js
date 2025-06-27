const schema_mongoose = require('mongoose');

const PersonSchema = schema_mongoose.Schema(
    {
     id: {type : Number},
     name: {type : String},
     emailid: {type : String},
     pass: {type : String},
     mobile: {type : Number},
     role: {type : String} // customer/admin
    },
    {
        timestamp: true
    }

);
module.exports = schema_mongoose.model('personal_collection',PersonSchema);