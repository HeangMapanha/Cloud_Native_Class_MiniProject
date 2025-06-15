const schema_mongoose = require('mongoose');

const PersonSchema = schema_mongoose.Schema(
    {
     user_name: {type : String},
     emailid: {type : String},
     pass: {type : String},
     mobile: {type : Number},
     role: {type : String}
    },
    {
        timestamp: true
    }

);
module.exports = schema_mongoose.model('personal_collection',PersonSchema);