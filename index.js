const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const cors = require('cors');
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000

//middleware
app.use(cors());
app.use(express.json());


console.log(process.env.DB_PASS);


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jimwvxl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {


    const serviceCollection = client.db("carDoctor").collection("services");

    app.get("/services", async (req,res)=>{
            const result = await serviceCollection.find().toArray();
            res.send(result);
    })

    app.get("/services/:id", async(req,res)=>{
      const result = await serviceCollection.findOne({_id:new ObjectId(req.params.id)})
      res.send(result);
    });


    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get("/",(req,res)=>{
    res.send("I am from Home Route")
})

app.listen(port,()=>{
    console.log(`Server is running at : http://localhost:${port}`);
})