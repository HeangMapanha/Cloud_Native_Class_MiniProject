const schema_mongoose = require('mongoose');

const ProductSchema = schema_mongoose.Schema(
    {
     id: {type : Number},
     name: {type : String},
     price: {type : Number},
     stock: {type : Number},
     description: {type : String}
    },
    {
        timestamp: true
    }

);
module.exports = schema_mongoose.model('product_collection',ProductSchema);