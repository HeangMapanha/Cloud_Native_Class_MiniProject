
const express = require('express');
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const dbconnect = require('./dbconnect.js');
const PersonModel = require('./schema/person_schema.js');
const OrderModel = require('./schema/order_schema.js');
const ProductModel = require('./schema/product_schema.js');


app.get('/product', async (req, res) => {
       try {
          const products = await ProductModel.find(); // No filter = get all
          res.status(200).json(products);
  } 
     catch (err) {
          res.status(500).json({ message: err.message });
  }
})
app.get('/product/:product_name', async (req, res) => {
  try {
    const product = await ProductModel.findOne({ "product_name": req.params.product_name });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
      return res.status(200).json(product);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/checkout', (req, res) => {
  const pobj = OrderModel({
    user_name: req.body.user_name,
    user_emailid: req.body.emailid,
    product_name: req.body.product_name,
    price: req.body.price,
    status : "in-processing"
  })
  if (PersonModel.findOne({"user_name": req.body.user_name,"emailid": req.body.emailid}) != null, 
  ProductModel.findOne({name: req.body.product_name}) != null) {
    pobj.save()
    .then(insertdocuemnt => {
      console.log("Product saved")
      console.log(insertdocuemnt)
      res.status(200).json(insertdocuemnt);
    })
    .catch(err => {
        res.status(500).send({message: err.message})
    });
  }
})

app.get('/yourorder/:emailid', async (req, res) => {
 try {
    const order = await OrderModel.find({ "user_emailid": req.params.emailid });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

}) // customers view thier orders

app.delete('/yourorder/:emailid', async (req, res) => {
 try {
  const delete_order = await OrderModel.findOneAndDelete({
    "user_emailid": req.params.emailid,
    "product_name": req.body.product_name,
    "status": "in-processing"})
    if (delete_order) {
      console.log("Order Canceled Successfully")
      res.status(500).json("Order Canceled Successfully");
    }
    else {
      console.log("Error canceling order, order may already been processed.")
      res.status(200).json("Error canceling order, order may already been processed.");
      }
    }
 catch (err) {
          res.status(500).json({ message: err.message });
  }

}) // customer delete thier order that haven't been process yet




app.listen(5003, () =>
    console.log('EXPRESS Server Started at Port No: 5003'));