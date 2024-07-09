const connectToMongoose = require('./db')
connectToMongoose()

const express = require('express')
const app = express()

var cors = require('cors')
const port = 5000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send({msg:"hello world",body:req.body})
    console.log(req)
  })
app.listen(port,()=>{
    console.log(`Inotebook Backend listening on port http://localhost:${port}`)
})
const userRoute = require('./routes/user')
app.use('/api/user',userRoute)