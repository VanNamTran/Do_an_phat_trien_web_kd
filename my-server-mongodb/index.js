const express=require('express');
const app=express();
const port=3000;
const morgan=require('morgan');

const nodemailer = require('nodemailer');

require('dotenv').config();

app.use(morgan("combined"))

const { ObjectId } = require('mongodb');

const bodyParser=require('body-parser')
app.use(bodyParser.json({limit:'10mb'}))
app.use(bodyParser.urlencoded({extended:true, limit:'10mb'}))

app.use(express.json({limit:'10mb'}))
app.use(express.urlencoded({limit:'10mb'}))
app.use(express.json())

const cors = require('cors');
app.use(cors())

//create default api
app.get('/',(req,res)=>{
    res.send('This Web server is processed for MongoDB')
})

app.listen(port,()=>{
    console.log(`My Server listening on port ${port}`)
})

const {MongoClient}=require('mongodb');
client=new MongoClient('mongodb://127.0.0.1:27017');
client.connect();
database=client.db('TechShopData');

//connect to phones collection
phoneCollection=database.collection('phones');

app.get('/techshop/phones', cors(), async (req,res)=>{
    const result=await phoneCollection.find().toArray();
    res.send(result)
})


//get phone details
app.get('/techshop/phones/:id', cors(), async (req, res) => {
    const id = req.params.id;

    const result = await phoneCollection.aggregate([
        { $match: { _id: id } },
        { $lookup: {
            from: 'phone_details',
            localField: 'details_id',
            foreignField: '_id',
            as: 'details'
        }}
    ]).toArray();

    if (result.length > 0) {
        res.json(result[0]);
    } else {
        res.sendStatus(404);
    }
});

//connect to laptops collection
laptopCollection=database.collection('laptops');

app.get('/techshop/laptops', cors(), async (req,res)=>{
    const result=await laptopCollection.find().toArray();
    res.send(result)
})


//get laptop details
app.get('/techshop/laptops/:id', cors(), async (req, res) => {
    const id = req.params.id;

    const result = await laptopCollection.aggregate([
        { $match: { _id: id } },
        { $lookup: {
            from: 'laptop_details',
            localField: 'details_id',
            foreignField: '_id',
            as: 'details'
        }}
    ]).toArray();

    if (result.length > 0) {
        res.json(result[0]);
    } else {
        res.sendStatus(404);
    }
});


//connect to tablets collection
tabletCollection=database.collection('tablets');

app.get('/techshop/tablets', cors(), async (req,res)=>{
    const result=await tabletCollection.find().toArray();
    res.send(result)
})

//get tablet details
app.get('/techshop/tablets/:id', cors(), async (req, res) => {
    const id = req.params.id;

    const result = await tabletCollection.aggregate([
        { $match: { _id: id } },
        { $lookup: {
            from: 'tablet_details',
            localField: 'details_id',
            foreignField: '_id',
            as: 'details'
        }}
    ]).toArray();

    if (result.length > 0) {
        res.json(result[0]);
    } else {
        res.sendStatus(404);
    }
});

//connect to watches collection
watchCollection=database.collection('watches');

app.get('/techshop/watches', cors(), async (req,res)=>{
    const result=await watchCollection.find().toArray();
    res.send(result)
})

//get watch details
app.get('/techshop/watches/:id', cors(), async (req, res) => {
    const id = req.params.id;

    const result = await watchCollection.aggregate([
        { $match: { _id: id } },
        { $lookup: {
            from: 'watch_details',
            localField: 'details_id',
            foreignField: '_id',
            as: 'details'
        }}
    ]).toArray();

    if (result.length > 0) {
        res.json(result[0]);
    } else {
        res.sendStatus(404);
    }
});

//connect to earphones collection
earphoneCollection=database.collection('earphones');

app.get('/techshop/earphones', cors(), async (req,res)=>{
    const result=await earphoneCollection.find().toArray();
    res.send(result)
})


//get earphone details
app.get('/techshop/earphones/:id', cors(), async (req, res) => {
    const id = req.params.id;

    const result = await earphoneCollection.aggregate([
        { $match: { _id: id } },
        { $lookup: {
            from: 'earphone_details',
            localField: 'details_id',
            foreignField: '_id',
            as: 'details'
        }}
    ]).toArray();

    if (result.length > 0) {
        res.json(result[0]);
    } else {
        res.sendStatus(404);
    }
});
<<<<<<< HEAD

<<<<<<< HEAD
  
=======

>>>>>>> c2ece3e9b5b01688141f9e8bbcd12cb219f29def
//create new user account
app.post('/techshop/register', async (req, res) => {
    var crypto = require("crypto");
    salt = crypto.randomBytes(16).toString("hex");
  
    userCollection = database.collection("users");
    user = req.body;
  
    // Check if email or phone number already exists
    const existingUser = await userCollection.findOne({$or: [{email: user.email}, {phone: user.phone}]});
    if (existingUser) {
      return res.status(400).send("Email or phone number already exists");
    }
  
    hash = crypto.pbkdf2Sync(user.password, salt, 1000, 64, `sha512`).toString(`hex`);
  
    user.password = hash;
    user.salt = salt;
  
    await userCollection.insertOne(user);
  
    res.send(req.body);
});
  

//login user
app.post('/techshop/login', async (req, res) => {
    userCollection = database.collection("users");
    user = req.body;

    var crypto = require("crypto");
    // Find user by email or phone
    result = await userCollection.findOne({
        $or: [
            { email: user.email },
            { phone: user.phone }
        ]
    });

    if (result == null) {
        res.status(400).send("User not found");
    } else {
        // Check password
        hash = crypto.pbkdf2Sync(user.password, result.salt, 1000, 64, `sha512`).toString(`hex`);
        if (hash == result.password) {
            res.send(result);
        } else {
            res.status(400).send("Wrong password");
        }
    }
});

// Send Email
app.post('/techshop/forget-password', async (req, res) => {
  
    userCollection = database.collection("users");
    resetPasswordsCollection = database.collection("reset_passwords");
    user = req.body;
    // Check if the email exists in the database
    result = await userCollection.findOne({ email: user.email});
    if (!result) {
      return res.status(404).json({ message: 'User not found.' });
    }
  
    // Generate a random OTP of length 6
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Create a nodemailer transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD
    }
    });
  
    // Send the OTP to the registered email
    const mailOptions = {
      from: 'techshopforshopping@gmail.com',
      to: req.body.email,
      subject: 'Password reset OTP',
      text: `Your OTP for password reset is ${otp}.`
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log(`OTP sent to ${email}: ` + info.response);
      }
    });
    // Save the OTP in the reset_passwords collection
    currentDate = new Date();
    resetPasswordsCollection.insertOne({ email: user.email, otp: otp, createdDay: currentDate }, function(err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log(`OTP saved in reset_passwords collection: ${otp}`);
        }
    });
    res.json({ message: 'OTP sent successfully.' });
});

// Verify OTP
app.post('/techshop/check-otp', async (req, res) => {
    resetPasswordCollection = database.collection("reset_passwords");
    user = req.body;
    
    result = await resetPasswordCollection.findOne({ otp: user.otp });
    
    if (!result) {
      return res.status(404).json({ message: 'OTP not found.' });
    }
  
    res.json({ message: 'OTP is valid.'});
});

app.post('/techshop/reset-password', async (req, res) => {

    var crypto = require("crypto");
    salt = crypto.randomBytes(16).toString("hex");

    resetPasswordCollection = database.collection("reset_passwords");
    userCollection = database.collection("users");
    user = req.body;
  
    // Find the OTP in the reset_passwords collection
    result = await resetPasswordCollection.findOne({ email: user.email, otp: user.otp });
    if (!result) {
      return res.status(404).json({ message: 'OTP not found.' });
    }
  
    // Hash the new password with the salt
    hash = crypto.pbkdf2Sync(user.password, salt, 1000, 64, `sha512`).toString(`hex`);
  
    password = hash;
    salt = salt;
  
    // Update the user's password and salt in the users collection
    await userCollection.updateOne({ email: user.email }, { $set: { password: hash, salt: salt } });
  
    // Delete the OTP from the reset_passwords collection
    // await resetPasswordCollection.deleteOne({ email: user.email, otp: user.otp });
  
    res.json({ message: 'Password reset successfully.' });
});
  

  

// ============================= insert favorite products to database =====================
const collectionName = 'favorites';
const collectionFavorites = database.collection(collectionName);
app.get("/favorites",cors(),async(req,res)=>{
    const result=await collectionFavorites.find().toArray();
    res.send(result)
})
app.post("/favorites",cors(),async(req,res)=>{
    await collectionFavorites.insertOne(req.body)
    res.send(req.body)
})
app.put("/favorites", cors(), async (req, res) => {
    try {
      const { customerId, productId, isFavorite } = req.body;
      const query = { customer_id: customerId };
      const productInFavorite = await collectionFavorites.findOne({
        customer_id: customerId,
        "favorites.product_id": productId,
      });
      // Nếu sản phẩm đang được yêu thích, thêm nó vào danh sách yêu thích
      if (isFavorite) {
        if(!productInFavorite){
          const update = {
            $push: {
              favorites: {
                product_id: productId,
                add_date: new Date().toISOString(),
              },
            },
          };
          await collectionFavorites.updateOne(query, update);
          res.status(200).json({ message: "Đã thêm sản phẩm vào danh sách yêu thích." });
        }
        else{
          const update = {
            $set: {
              "favorites.$.add_date": new Date().toISOString(),
            },
          };
          await collectionProductCart.updateOne(
            { "favorites.product_id": productId },
            update
          );
          res
            .status(200)
            .json({ message: "Đã cập nhật ngày thêm mới của sản phẩm." });
        }
        
      } else { // Nếu sản phẩm bị hủy yêu thích, xóa nó khỏi danh sách yêu thích
        const update = {
          $pull: {
            favorites: {
              product_id: productId,
            },
          },
        };
        await collectionFavorites.updateOne(query, update);
        res.status(200).json({ message: "Đã xóa sản phẩm khỏi danh sách yêu thích." });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi server." });
    }
  });
// Dữ liệu mẫu để test trên postman
//   {
//     "customerId": "ctm000003",
//     "productId": "mtb0008",
//     "isFavorite": true 
//   }
=======
>>>>>>> parent of 9b82a81 (	modified:   my-app/angular.json)


<<<<<<< HEAD
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi server." });
    }
  });
=======
>>>>>>> parent of 9b82a81 (	modified:   my-app/angular.json)

