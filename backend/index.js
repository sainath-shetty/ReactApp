const express = require('express');
const server=express();
const cors=require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/auth');
console.log('db connected')
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const userSchema=new mongoose.Schema({
    username:String,
    password:String,
    email:String,
});
const User=mongoose.model('User',userSchema);
const bodyParser=require('body-parser')
server.use(cors());
server.use(bodyParser.json())
server.post('/signup',async(req,res)=>{
 
    

   const {name,email,password}=req.body;

    const existingUser= await User.findOne({ email })
    if (existingUser) {
        // Email already exists, return an error response
        return res.status(400).json({ error: 'Email already exists' });
        
      }
      const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
      const user=await User.create({
        username:name,email,password:secPass
      });

    
   await user.save();
   res.status(200).json({ message: 'Signup successful',user });
    
})

server.post('/login',async(req,res)=>{

    const {email,password}=req.body;
 
     const user= await User.findOne({ email })
     if (!user) {
         // Email already exists, return an error response
         return res.status(400).json({ error: 'Invalid Credential enter correct credentials' });
         
       }
       const passCompare = await bcrypt.compare(password, user.password);

       if (!passCompare) {
           return res.status(400).json({ error: "Please try to login using correct credentials" })
       }
       
    
    res.status(200).json({ message: 'Login successful',user});
     
 })
server.get('/demo',async(req,res)=>{
    const docs=await User.find({});
    res.json(docs);

})

server.listen(8080,()=>{
    console.log('server started')
})