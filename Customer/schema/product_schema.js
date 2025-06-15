const schema_mongoose = require('mongoose');

const ProductSchema = schema_mongoose.Schema(
    {
     id: {type : Number},
     product_name: {type : String},
     price: {type : Number},
     description: {type : String}
    },
    {
        timestamp: true
    }

);
module.exports = schema_mongoose.model('product_collection',ProductSchema);