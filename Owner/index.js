
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const dbconnect = require('./dbconnect.js');
const PersonModel = require('./schema/person_schema.js');
const OrderModel = require('./schema/order_schema.js');
const ProductModel = require('./schema/product_schema.js');

// View all products
app.get('/product', async (req, res) => {
  try {
    const products = await ProductModel.find(); // Get all products
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// View product by name
app.get('/product/:product_name', async (req, res) => {
  try {
    const product = await ProductModel.findOne({ "product_name": req.params.product_name });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.put('/updateorder', async (req, res) => {
  try {
 const update_delivered = {
  "status" : "delieverd"
 }
 const update_order = await OrderModel.findOneAndUpdate({
  "user_emailid":req.body.emailid, 
  "product_name":req.body.product_name, 
  "status":"in-processing"}, update_delivered, { new:true})
  res.status(200).json({message: "Order Update Successful"})
 if (!updatedProduct) {
    return res.status(404).json({ message: 'Product not found' });
    }
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
})

// View user's order by email
app.get('/customerorder', async (req, res) => {
  try {
    const orders = await OrderModel.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete an in-processing order
app.delete('/customerorder', async (req, res) => {
  try {
    const deleted = await OrderModel.findOneAndDelete({
      user_emailid: req.body.emailid,
      product_name: req.body.name,
    });

    if (deleted) {
      res.status(200).json({ message: "Order canceled successfully" });
    } else {
      res.status(404).json({ message: "Order not found or already processed" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/addproduct', (req, res) => {
    const pobj = new ProductModel({
        id: req.body.id,
        product_name: req.body.product_name,
        price: req.body.price,
        description: req.body.description
    });
    ProductModel.findOne({ "": req.body.product_name})
        .then(existingdocument => {
            if (existingdocument != null) {
                res.status(404).send("product already existed")
            }
            else {
                pobj.save()
    .then(inserteddocument => {
        res.status(200).send('Information inserted into Database');
    })
    .catch(err => {
        res.status(500).send({message: err.message})
    });
                  }
        })
        .catch(err => {
            res.status(500).send({message: err.message})
            })

})


app.listen(5002, () =>
  console.log('✅ EXPRESS Server Started at Port 5002'));