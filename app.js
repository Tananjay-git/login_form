const express = require("express");
const path = require("path");
const app = express();
var mongoose = require("mongoose");
const bodyparser = require('body-parser');
mongoose.connect("mongodb://localhost/loginform",{useNewUrlParser: true});
const port = 8000;

// Mongo stuff

const loginformSchema = new mongoose.Schema({
    email : String,
    password: String 
});

const login = mongoose.model('login', loginformSchema);

//Express Stuff

app.use('/static',express.static('static'))
app.use(express.urlencoded({extended:true}))

//Pug Stuff

app.set('view engine','pug')
app.set('views', path.join(__dirname,'views'))

//End Point

app.get('/',(req,res)=>{
    const send ={}
    res.render('index.pug',send)
})
app.post('/login',(req,res)=>{
    var mydata = new login(req.body);
    mydata.save().then(()=>{
        res.send("This item has been saved to database")
    }).catch(()=>{
        res.status(400).send("Item was not save to the database")
    })
})

// Server Stuff

app.listen(port,()=>{
    console.log(`App Started on ${port}`)
})