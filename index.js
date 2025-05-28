// index.js
const express = require("express");
require("dotenv").config(); 
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require('mongodb');
const { ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 8000;

// Middlewares
app.use(cors());
app.use(express.json());


// JO4R6PJcQGzW0aPZ

// JobProtle





const uri = `mongodb+srv://${process.env.KEY_USER}:${process.env.KEY_PASS}@cluster0.y3jqe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    
    await client.connect();

    const db = client.db("jobPortal");
    const Jocollection = db.collection("AllJobs");


    app.post('/jobs', async (req, res) => {
       const producted = req.body;
      const result = await Jocollection.insertOne(producted)
      res.send(result);
   });
    
  
  //  app.get('/jobs', async (req, res) => {
  //   const products = await Jocollection.find().toArray();
  //   res.send(products);
  //  });
  app.get('/jobs', async (req, res) => {
    const search = req.query.search;
    let query = {};
  
    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { company: { $regex: search, $options: "i" } },
          { location: { $regex: search, $options: "i" } }
        ]
      };
    }
  
    const jobs = await Jocollection.find(query).toArray();
    res.send(jobs);
  });
  
  
    
    

  app.get('/jobsperson/email', async (req, res) => {
    const email = req.query.email; 
    const query = { "employer.email": email };  // এখানে employer.email ফিল্ড ধরে নিচ্ছি
    const result = await Jocollection.find(query).toArray();
    res.send(result);
  });
  
  

   //  app.get('/groups/:id', async (req, res) => {
   //   const id = req.params.id;
   //   const query = { _id: new ObjectId(id) };
   //   const result = await Jocollection.findOne(query);
   //   res.send(result);
   //  });

   //  app.delete('/groups/:id', async (req, res) => {
   //    const id = req.params.id;
   //    const query = { _id: new ObjectId(id) };
   //    const result = await Jocollection.deleteOne(query);
   //    res.send(result);
   //  });
    

   //  app.get('/groupsupdated/:id', async (req, res) => {
   //    const id = req.params.id;
   //    const query = { _id: new ObjectId(id) };
   //    const result = await Jocollection.findOne(query)
   //    res.send(result)
   //  });
    
    //update data single


   //  app.put('/groupsupdated/:id', async (req, res) => {
   //    const id = req.params.id;
   //    const job = req.body;
   //    const filter = { _id: new ObjectId(id) }
   //    const option = { upsert: true }
    
   //    const updateDoc = {
   //      $set: job
   //    }
   //    const result = await Jocollection.updateOne(filter, updateDoc, option)
   //    res.send(result)
   //  });
    


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
   //  await client.close();
  }
}
run().catch(console.dir);




// Basic route
app.get("/", (req, res) => {
  res.send(" Server is running..");
});


app.listen(port, () => {
  console.log(` Server listening on port ${port}`);
});
