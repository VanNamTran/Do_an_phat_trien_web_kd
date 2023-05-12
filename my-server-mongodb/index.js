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


//get chair details
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
furnitureCollection=database.collection('furniture');

app.get('/techshop/furniture', cors(), async (req,res)=>{
    const result=await furnitureCollection.find().toArray();
    res.send(result)
})


//get chair details
app.get('/techshop/furniture/:id', cors(), async (req, res) => {
    const id = req.params.id;

    const result = await furnitureCollection.aggregate([
        { $match: { _id: id } },
        { $lookup: {
            from: 'furniture_details',
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
// ============================= insert favorite products to database =====================
const collectionName = 'favorites';
const collectionFavorites = database.collection(collectionName);
app.get("/favorites",cors(),async(req,res)=>{
    const result=await collectionFavorites.find().toArray();
    res.send(result)
})
app.post("/favorites",cors(),async(req,res)=>{
    const { customerId}= req.body;
    const newFavorites = {
      customer_id: customerId,
      favorites: []
    };
    await collectionFavorites.insertOne(newFavorites)
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

app.get("/favorites/:customerId", cors(), async (req, res) => {
    try {
      const customerId = req.params.customerId;
  
      const query = { customer_id: customerId };
      const result = await collectionFavorites.findOne(query);
  
      if (!result) {
        res.send([]);
        return;
      }
  
      const favoriteProducts = result.favorites.map(favorite => favorite.product_id);
  
      const products = [];
  
      for (let i = 0; i < favoriteProducts.length; i++) {
        const productId = favoriteProducts[i];
        const productType = productId.substring(0, 2); // lấy ký tự đầu tiên để phân biệt loại sản phẩm
  
        switch (productType) {
          case "dt":
            products.push(await phoneCollection.findOne({ _id:productId }));
            break;
          case "la":
            products.push(await laptopCollection.findOne({ _id:productId }));
            break;
          case "mt":
            products.push(await tabletCollection.findOne({ _id:productId }));
            break;
          case "dh":
            products.push(await watchCollection.findOne({ _id:productId }));
            break;
          case "tn":
            products.push(await earphoneCollection.findOne({ _id:productId }));
            break;
          case "bg":
            products.push(await furnitureCollection.findOne({ _id:productId }));
            break;
        }
      }
        const filteredProducts = products.filter(product => product !== null);
        res.send(filteredProducts);

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi server." });
    }
  });
  
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

// Update user profile
app.put('/techshop/update-profile/:userId', async (req, res) => {
  const userId = req.params.userId;
  const { name, address } = req.body;

  try {
    const userCollection = database.collection('users');
    const updatedUser = await userCollection.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { $set: { name, address } },
      { returnOriginal: false }
    );

    if (updatedUser) {
      res.json(updatedUser.value);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Change password
app.put('/techshop/change-password/:userId', async (req, res) => {
  const userId = req.params.userId;
  const { currentPassword, newPassword } = req.body;

  try {
    const userCollection = database.collection('users');
    const user = await userCollection.findOne({ _id: new ObjectId(userId) });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const crypto = require("crypto");
    const currentHash = crypto.pbkdf2Sync(currentPassword, user.salt, 1000, 64, `sha512`).toString(`hex`);

    if (currentHash !== user.password) {
      res.status(401).json({ error: 'Invalid current password' });
      return;
    }

    const salt = crypto.randomBytes(16).toString('hex');
    const newHash = crypto.pbkdf2Sync(newPassword, salt, 1000, 64, `sha512`).toString(`hex`);

    const updatedUser = await userCollection.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { $set: { password: newHash, salt } },
      { returnOriginal: false }
    );

    if (updatedUser) {
      res.json(updatedUser.value);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
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
  

  



//================= insert product to database_cart =================

const collectionProductCart = database.collection('product_cart');
app.get("/prod-in-cart",cors(),async(req,res)=>{
    const result=await collectionProductCart.find().toArray();
    res.send(result)
})
app.post("/prod-in-cart",cors(),async(req,res)=>{
  const { customerId}= req.body;
    const newCart = {
      customer_id: customerId,
      cart: []
    };
  await collectionProductCart.insertOne(newCart)
  res.send(req.body)
})
app.get("/prod-in-cart/:customerId", cors(), async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const query = { customer_id: customerId };
    const result = await collectionProductCart.findOne(query);
    if (!result) {
      res.send([]);
      return;
    }

    const productsInCart = result.cart;

const products = [];

for (let i = 0; i < productsInCart.length; i++) {
  const item = productsInCart[i];
  const productId = item.product_id;
  const productType = productId.substring(0, 2); // lấy 2 ký tự đầu tiên để phân biệt loại sản phẩm

  switch (productType) {
    case "dt":
      const phone = await phoneCollection.findOne({ _id: productId });
      if (phone) {
        phone.quantity = item.quantity;
        products.push(phone);
      }
      break;
    case "la":
      const laptop = await laptopCollection.findOne({ _id: productId });
      if (laptop) {
        laptop.quantity = item.quantity;
        products.push(laptop);
      }
      break;
    case "mt":
      const tablet = await tabletCollection.findOne({ _id: productId });
      if (tablet) {
        tablet.quantity = item.quantity;
        products.push(tablet);
      }
      break;
    case "dh":
      const watch = await watchCollection.findOne({ _id: productId });
      if (watch) {
        watch.quantity = item.quantity;
        products.push(watch);
      }
      break;
    case "tn":
      const earphone = await earphoneCollection.findOne({ _id: productId });
      if (earphone) {
        earphone.quantity = item.quantity;
        products.push(earphone);
      }
      break;
    case "bg":
      const furniture = await furnitureCollection.findOne({ _id: productId });
      if (furniture) {
        furniture.quantity = item.quantity;
        products.push(furniture);
      }
      break;
  }
}

      const filteredProducts = products.filter(product => product !== null);
      res.send(filteredProducts);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi server." });
  }
});

app.put("/prod-in-cart", cors(), async (req, res) => {
  try {
    const { customerId, productId, quantity, inCart } = req.body;
    const query = { customer_id: customerId };

    // Kiểm tra sản phẩm đã có trong giỏ hàng hay chưa
    const productInCart = await collectionProductCart.findOne({
      customer_id: customerId,
      "cart.product_id": productId,
    });

    if (inCart) {
      // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới sản phẩm vào giỏ hàng
      if (!productInCart) {
        const update = {
          $push: {
            cart: {
              product_id: productId,
              quantity: quantity,
              add_date: new Date().toISOString(),
            },
          },
        };
        await collectionProductCart.updateOne(query, update);
        res
          .status(200)
          .json({ message: "Đã thêm sản phẩm vào giỏ hàng." });
      } else {
        // Nếu sản phẩm đã có trong giỏ hàng, cập nhật ngày thêm mới của sản phẩm đó
        const update = {
          $set: {
            "cart.$.add_date": new Date().toISOString(),
          },
        };
        await collectionProductCart.updateOne(
          { "cart.product_id": productId },
          update
        );
        res
          .status(200)
          .json({ message: "Đã cập nhật ngày thêm mới của sản phẩm." });
      }
    } else {
      // Nếu sản phẩm bị xóa khỏi giỏ hàng, xóa sản phẩm đó khỏi giỏ hàng
      const update = {
        $pull: {
          cart: {
            product_id: productId,
          },
        },
      };
      await collectionProductCart.updateOne(query, update);
      res
        .status(200)
        .json({ message: "Đã xóa sản phẩm khỏi giỏ hàng." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi server." });
  }
});
// ========== hiển thị sản phẩm ở trang chủ =================
tonghopCollection=database.collection('tonghops');

app.get('/tonghop', cors(), async (req,res)=>{
    const result=await tonghopCollection.find().toArray();
    res.send(result)
})

// app.get('/phones/:id', async (req, res) => {
//     const id = req.params.id;
//     const result = await phoneCollection.findOne({ _id: id });
//     res.send(result);
// });

// app.get('/tonghop/:id', cors(), async (req, res) => {
//     const id = req.params.id;

//     const result = await tonghopCollection.aggregate([
//         { $match: { _id: id } },
//         { $lookup: {
//             from: 'phone_details',
//             localField: 'details_id',
//             foreignField: '_id',
//             as: 'details'
//         }}
//     ]).toArray();

//     if (result.length > 0) {
//         res.json(result[0]);
//     } else {
//         res.sendStatus(404);
//     }
// });
// =============== ORDER ================
collectionOrder=database.collection('orders');
app.post("/order",cors(),async(req,res)=>{
  try {
    const { customerId, info, products } = req.body;
    const newOrder = {
      order_id: customerId + new Date().toISOString(),
      data: new Date().toISOString(),
      customer_id: customerId,
      info: info.map((info)=>({
        phone:info.phone,
        name: info.name,
        address:info.address,

      })),
      products: products.map((product) => ({
        product_id: product.product_id,
        quantity: product.quantity
      }))
    };
    await collectionOrder.insertOne(newOrder)
    res.send(req.body)
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Lỗi server." });
  }
  
})
app.get('/order', cors(), async (req,res)=>{
  const result=await collectionOrder.find().toArray();
  res.send(result)
})
collectionUsers=database.collection('users');
app.get("/user/:customerId",cors(),async(req,res)=>{
  const customerId = req.params.customerId;
  const projection = { phone:1, name: 1, address: 1 };
  const query = { phone: customerId };
  const result=await collectionUsers.findOne(query,projection);
  res.send(result)
})
// ======== admin ========
//connect to phones collection
phoneCollection=database.collection('phones');

app.get('/phone', cors(), async (req,res)=>{
    const result=await phoneCollection.find({}).toArray();
    res.send(result)
})

// app.get('/phones/:id', async (req, res) => {
//     const id = req.params.id;
//     const result = await phoneCollection.findOne({ _id: id });
//     res.send(result);
// });

//get phone details
app.get('/phone/:id',cors(),async (req, res)=>{
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


app.get("/phone/:id",cors(),async (req,res)=>{
    var o_id = new ObjectId(req.params["id"]);
    const result = await phoneCollection.find({_id:o_id}).toArray();
    res.send(result[0])
})

app.post("/phone",cors(),async(req,res)=>{
    //put json phone into database
    await phoneCollection.insertOne(req.body)
    //send message to client (send all database to client)
    res.send(req.body)
})

app.put("/phone",cors(),async(req,res)=>{
    //update json Phone into database
    await phoneCollection.updateOne(
        {_id:new ObjectId(req.body._id)},//condition for update
        { $set: { //Field for updating
                name: req.body.name,
                brand:req.body.brand,
                initial_price:req.body.initial_price,
                discount_amount:req.body.discount_amount,
                image:req.body.image
            }
        }
    )
    //send phone after updating
        var o_id = new ObjectId(req.body._id);
        const result = await phoneCollection.find({_id:o_id}).toArray();
        res.send(result[0])
})

app.delete("/phone/:id",cors(),async(req,res)=>{
    //find detail phone with id
    var o_id = new ObjectId(req.params["id"]);
    const result = await phoneCollection.find({_id:o_id}).toArray();
    //update json phone into database
    await phoneCollection.deleteOne(
        {_id:o_id}
        )
    //send phone after remove
    res.send(result[0])
})