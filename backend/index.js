const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");
const { log } = require("console");

app.use(express.json());
app.use(cors());

// Database Connection with MongoDB
mongoose.connect("mongodb+srv://raushan17nerkar:pass@cluster0.wdhoruq.mongodb.net/e-commerce");

//Api Creation
app.get("/", (req, res)=> {
    res.send("Express App is running")
})

// Image storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage: storage})

//Creating upload endpoint
app.use('/images',express.static('upload/images'))
app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

// Schema for creating products

const Products = mongoose.model("Product",{
    id:{
        type: Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
       type:Number,
       required:true, 
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    },
})

app.post('/addproduct',async (req, res) =>{
    let products = await Products.find({});
    let id;
    if(products.length>0)
        {
            let last_product_array = products.slice(-1);
            let last_product = last_product_array[0];
            id = last_product.id + 1;
        }
    else{
        id = 1;
    }
    const product = new Products({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        succcess:true,
        name:req.body.name,
    })
})

// Creating API for deleting Products
app.post('/removeproduct', async(req,res)=>{
    await Products.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        succcess: true,
        name: req.body.name,
    })
})

//Creating API for displaying all products
app.get('/allproducts', async(req, res)=>{
    let products = await Products.find({});
    console.log("All Products Fetched");
    res.send(products);
})

//Schema for User model
const Users = mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

// Creating Endpoint for registering user
app.post('/signup',async(req,res)=>{
    let check = await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,errors:"existing user found"});
    }
    let cart = {};
    for (let i =0 ; i<300;i++){
        cart[i]=0;
    }
    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart, 
    })
    await user.save();

    const data = {
        user: {
            id: user.id
        }
    }
    const token = jwt.sign(data, 'secret_ecom');
    res.json({success:true,token})
})


//User login endpoint
app.post('/login',async(req,res)=>{
    let user = await Users.findOne({email:req.body.email});

    if (user){
        const passcompare = req.body.password === user.password;
        if(passcompare){
            const data = {
                user:{
                    id: user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true,token});
        }
        else{
            res.json({success:false, error:"Wrong Pass"});
        }
    }
    else{
        res.json({success:false,errors:"wrong email"})
    }
})

//Endpoint for new collection

app.get('/newcollections',async(req,res)=>{
    let products = await Products.find({});
    let newcollection = products.slice(1).slice(-6);
    console.log("New Collection");
    res.send(newcollection);
})

app.listen(port, (error) =>{
    if(!error){
        console.log("Server Running on Port 4000")
    }
    else{
        console.log("Error: " +error)
    }
})
