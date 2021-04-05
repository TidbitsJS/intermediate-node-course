const express= require('express');
const mongoose= require('mongoose');
const bodyParser= require('body-parser');
const port=8000;
const app= express();

const User = require('./models/User')
mongoose.connect("mongodb://172.17.0.2:27017/userData", 
    {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => console.log("Successfully Connected to MongoDB"))
        .catch((err) => {throw new Error("Oops an Error", err)})


app.use(bodyParser.json());

app.listen(port, ()=>{
	console.log(`server is listening on port:${port}`)
})

// CREATE
app.post('/users',(req,res)=>{
  // User.create()
})

app.route('/users/:id')
// READ
.get((req,res)=>{
  // User.findById()
})
// UPDATE
.put((req,res)=>{
  // User.findByIdAndUpdate()
})
// DELETE
.delete((req,res)=>{
  // User.findByIdAndDelete()
})