const schema_mongoose = require('mongoose');

const OrderSchema = schema_mongoose.Schema(
    {
     id: {type : Number},
     name: {type : String},
     user_name: {type : String},
     user_emailid: {type : String},
     price: {type : Number},
     stock: {type : Number},
     status: {type : String} // in-processing/delivering/delivered
    },
    {
        timestamp: true
    }

);
module.exports = schema_mongoose.model('order_collection',OrderSchema);