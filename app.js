const express = require("express");
const app = express ();

const port = 4000;

app.use(express.json())

//coonection string
//mongo client

const connectedString = "mongodb://localhost:27017/bookshop"
const MongoClient = require("mongodb").MongoClient;

const client = new MongoClient(connectedString, {
          useNewUrlParser:true,
          useUnifiedTopology:true
});



app.get("/book", (req, res) => {
    client.connect((err, connectedClient) => {
        if(err) return res.status(500).json({message: err});
       const db = connectedClient.db();
       db.collection("book").find({}).toArray((err, result) => {
           if(err) {
            return res.status(500).json({message: err});
           } 
        return res.status(200).json({book: result})
    })
    })
})

app.post("/book", (req, res) => {
    client.connect((err, connectedClient) => {
        if(err) {
            return res.status(500).json({message: err})
        }
        const db = connectedClient.db();
        db.collection("book").insertOne({
            name: req.body.name,
            email: req.body.email,
            country: req.body.country
        }, (err, result) => {
            if(err) {
                 return res.status(500).json({message: err})
            }
            return res.status(200).json({message: "Your request is successful"})
        })
    })
})

app.put("/book:id", (req, res) => {
    client.connect((err, connectedClient) => {
        if(err) {
            return res.status(500).json({message: err})
        }
        const db = connectedClient.db();
        db.collection("book").findOneAndUpdate({
            name: req.body.name,
            email: req.body.email,
            country: req.body.country
        }, (err, result) => {
            if (err) {
                return res.status(500).json({message: err})
            }
            return res.status(200).json({message: "Your data have been updated"})
        })
    })
})


app.listen(port, () => {
    console.log("server is running at port 4000");
})