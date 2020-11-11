//BRINING THE EXPRESS LIBRARY
const express= require("express");
const bodyparser= require("body-parser");
const cors= require('cors');
// const mongodb = require("mongodb").MongoClient;
const mongoose = require('mongoose');
//INITIALIZING THE EXPRESS LIBRARY
const app= express();
const messages = require("./models/message");
const register = require('./models/register')
const bcrypt = require('bcrypt')
const jwt = require('jwt-simple')
const moment = require('moment')
//MIDDLEWARES
app.use(bodyparser.json())
app.use(cors());

//GLOBAL DB CONNECTION


//ANOTHER WAY OF ENABLING CORS-
// app.use((req, res)=>{
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//     next();

// })

app.get('/api/getmessages/:user', async (req,res) => {
    const getmessage = await messages.find({username:req.params.user});
    res.json(getmessage)
})


app.post('/api/message/:user', async (req, res)=>{
    console.log(req.params.user);
    const message = new messages();
    message.message=req.body.message;
    try{
        
        message.username=req.params.user
        const savemess = await message.save();
        res.json({message:"Post successfully !"})
        res.status(200)

    }
    catch(err){
        res.json({message:err})
    }
})

//CHECKS IF USER EXISTS, IF NOT CREATES A NEW USER IN DB.
app.post('/api/register',async (req,res)=>{
    try{
        console.log(req.body)
            IsUserExists(req.body.emailid).then(result=>{            
                if(result){
                    res.json({message:"This user already exists !"})
                }
                else{
                    bcrypt.hash(req.body.password, 10, (err, hash)=>{
                        console.log(hash)
                        const registeruser = new register();
                        registeruser.username=req.body.emailid
                        registeruser.password=hash;
                        
                        const createuser = registeruser.save().then(data=>{
                        res.json({message:"Success"})
                        res.status(200)
                        });
                    });
                }
            })
        
        
    }
    catch(err){
        res.json({messages:err})
    }
    
})

function IsUserExists(username){
    const user = new register();
        const finduser= register.findOne({username:username}).then((data)=>{
            if (data!=null){
                return (true);
            }
            else{
                return false;
            }
        })
        return finduser;
}

app.post('/api/login', async(req, res)=>{
    try{
        console.log(req.body)
        const user = new register();
        const finduser=await register.findOne({username:req.body.emailid}).then((data)=>{
            if (data==null){
                res.json({message:"This user does not exist"})
            }
            else{
                bcrypt.compare(req.body.password, data.password , (err, result)=>{
                    if (result){
                        res.json({message:"Login Successful !"})
                        res.status(200)
                    }
                    else{
                        res.json({message:"Wrong Password. Try Again"})
                        res.status(404)
                    }
                
                });
            }
        })
        
    }
    catch(err){
        res.json({message:err})
    }
})

mongoose.connect("Your Mongo DB URL",{ useNewUrlParser: true },
        (err,client)=>{
        try{
            console.log("DB Connected !")
        }
        catch(err){
            console.log(err)
        }
        
})

//STARTING OUR SERVER AND LISTENING ON PORT
// PORT AS FIRST PARAM AND CALLBACK FUCNTION AS SECOND. 
//This callback will let us know the response of trying to start the server
const server = app.listen(5000, function(){
    console.log("Listerning on port", server.address().port)
});