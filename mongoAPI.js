import { MongoClient } from "mongodb"
import { uri, dbName } from "./dbsecrets.js"
// connect to client
const client = new MongoClient(uri)
// connects to database
const db = client.db("sample_mflix")
const movieCollection = db.collection("movies") // movie collection
import express from 'express'
import cors from 'cors'
const app = express()
const port = 4000 // port number doorways!
app.use(cors()) // allows anyone to use API
app.use(express.json()) // allow a POST with JSON

//if you got to http://localhost:4000/
app.get("/", (req, res) => {
    res.status(200).send("Hello world")
})

//if you got to http://localhost:4000/movies
app.get("/movies", (req, res) => {
    const query = {}
    console.log(movieCollection.countDocuments(query))
    
    movieCollection.find(query).limit(10).toArray((err, movies) => { // callback function
        res.status(200).json(movies)
    })

})
app.post("/movie",(req,res) => {
    const newMovie = req.body

    movieCollection.insertOne(newMovie,(err,results) => {
        if (err) {
            res.status(500).json({error:true})
        } else {
            res.status(201).json(results)
        }
    })
})

app.listen(port, () => {
    console.log("ready on http://localhost:" + port)
})