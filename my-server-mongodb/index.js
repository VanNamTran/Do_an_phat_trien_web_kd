const express=require('express');
const app=express();
const port=3000;
const morgan=require('morgan')
app.use(morgan("combined"))

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

app.get('/phones', cors(), async (req,res)=>{
    const result=await phoneCollection.find().toArray();
    res.send(result)
})

// app.get('/phones/:id', async (req, res) => {
//     const id = req.params.id;
//     const result = await phoneCollection.findOne({ _id: id });
//     res.send(result);
// });

//get phone details
app.get('/phones/:id', cors(), async (req, res) => {
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

app.get('/laptops', cors(), async (req,res)=>{
    const result=await laptopCollection.find().toArray();
    res.send(result)
})

// app.get('/laptops/:id', async (req, res) => {
//     const id = req.params.id;
//     const result = await laptopCollection.findOne({ _id: id });
//     res.send(result);
// });

//get laptop details
app.get('/laptops/:id', cors(), async (req, res) => {
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

app.get('/tablets', cors(), async (req,res)=>{
    const result=await tabletCollection.find().toArray();
    res.send(result)
})

// app.get('/tablets/:id', async (req, res) => {
//     const id = req.params.id;
//     const result = await tabletCollection.findOne({ _id: id });
//     res.send(result);
// });

//get tablet details
app.get('/tablets/:id', cors(), async (req, res) => {
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

app.get('/watches', cors(), async (req,res)=>{
    const result=await watchCollection.find().toArray();
    res.send(result)
})

// app.get('/watches/:id', async (req, res) => {
//     const id = req.params.id;
//     const result = await watchCollection.findOne({ _id: id });
//     res.send(result);
// });

//get watch details
app.get('/watches/:id', cors(), async (req, res) => {
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

app.get('/earphones', cors(), async (req,res)=>{
    const result=await earphoneCollection.find().toArray();
    res.send(result)
})

// app.get('/earphones/:id', async (req, res) => {
//     const id = req.params.id;
//     const result = await earphoneCollection.findOne({ _id: id });
//     res.send(result);
// });

//get earphone details
app.get('/earphones/:id', cors(), async (req, res) => {
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
        }
      }
        const filteredProducts = products.filter(product => product !== null);
        res.send(filteredProducts);

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Lỗi server." });
    }
  });
  
//================= insert product to database_cart =================

const collectionProductCart = database.collection('product_cart');
app.get("/prod-in-cart",cors(),async(req,res)=>{
    const result=await collectionProductCart.find().toArray();
    res.send(result)
})
app.post("/prod-in-cart",cors(),async(req,res)=>{
  await collectionProductCart.insertOne(req.body)
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
