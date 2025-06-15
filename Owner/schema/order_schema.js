const schema_mongoose = require('mongoose');

const OrderSchema = schema_mongoose.Schema(
    {
     user_name: {type : String},
     user_emailid: {type : String},
     product_name: {type : String},
     price: {type : Number},
     status: {type : String} // in-processing/delivering/delivered
    },
    {
        timestamp: true
    }

);
module.exports = schema_mongoose.model('order_collection',OrderSchema);