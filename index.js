

const Razorpay = require('razorpay');
const crypto = require('crypto');
const morgan = require('morgan');
const express = require('express');



const app = express();
const port = process.env.PORT || 5000;

const router = express.Router();
// const path = require("path");
const cors = require("cors");
// connect to db
const bodyParser = require('body-parser');

// middlewares
app.use(express.json());
 app.use(bodyParser.urlencoded({extended:false}));
// app.use(helmet());
app.use(morgan("common")); 
//http://localhost:3000/payment/success
app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello World!')
  })
app.post('/create', async(req, res) => {

    const instance = new Razorpay({ key_id:"rzp_test_6G6Yj3PsY2wyka", key_secret: "VVi9aLAYMbsaOW4FNtIvJo5Q"})
const options ={amount:10000,
    currency: "INR", 
    }
     order= await instance.orders.create(options)
     res.status(200).send(order)
   

  })

//
app.post('/payment/success' , async (req, res) => {
  console.log(req.body)
const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =req.body;

const body = razorpay_order_id + "|" + razorpay_payment_id;

const expectedSignature = crypto
.createHmac("sha256","VVi9aLAYMbsaOW4FNtIvJo5Q")
.update(body.toString())
.digest("hex");

const isAuthentic = expectedSignature === razorpay_signature;

if (isAuthentic) {
// Database comes here

// await Payment.create({
//   razorpay_order_id,
//   razorpay_payment_id,
//   razorpay_signature,
// });

res.redirect(
  // `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
  "https://paymentarzor.onrender.com/"
);
} else {
res.status(400).json({
  success: false,
});
 }
// res.send(razorpay_signature)
})
//
  // app.post('/payment/success', async(req, res) => {
    
    // res.send(req.body)
  // })
app.listen(port, () => console.log(`server started on port ${port}`));
app.get('/payment/success' , async (req, res) => {
 
res.status(400).json({
  success: false,
});
 })
// res.send(razorpay_signature)
