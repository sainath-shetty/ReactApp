require("dotenv").config
const express = require('express');
const server = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/auth');
    console.log('db connected')
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const courseSchema = new mongoose.Schema({
    coursename: String,
    guidename: String,
    guideemail: String,
    phonenumber: String,
    description: String

}

);
const Courses = mongoose.model('Courses', courseSchema);
const bodyParser = require('body-parser')
server.use(cors());
server.use(bodyParser.json())


//register the course 
server.post('/register', async (req, res) => {


    console.log(req.body);
    const { cname, gname, gemail, gphone, desc } = req.body;
    if (!cname || !gemail || !gname || !gphone || !desc) {
        res.status(404).send({ error: "Plz fill the data" });

    }
    const sameemail = await Courses.findOne({ guideemail: gemail })
    const sameguide = await Courses.findOne({ coursename: cname })
    if (sameemail && sameguide) {
        res.status(404).send({ error: "Duplicate Data entry" });
    }
    else {
        const course = await Courses.create({
            coursename: cname, guidename: gname, guideemail: gemail, phonenumber: gphone, description: desc
        });
        await course.save();
        console.log(course);
        res.status(200).json({ message: 'Registration successful', course });
    }


})
//get the course for displaying 
server.get('/getdata', async (req, res) => {
    try {
        const coursedata = await Courses.find();
        res.status(201).json(coursedata)
       
    }
    catch (error) {
        res.status(404).json(error)
    }
})
//to get the user data for detailed viewing 

server.get("/getuser/:id", async (req, res) => {
    try {

        const { id } = req.params;
        const userindividual = await Courses.findById({_id: id })
        res.status(201).json(userindividual)
    }
    catch (error) {
        res.status(404).json(error);
    }

})
//update user data

server.patch('/updateuser/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        const updatedUser = await Courses.findByIdAndUpdate(id,req.body);

        res.status(201).json(updatedUser);
    }
    catch (error) {
        res.status(422).json(error);
    }

})
//delete data
server.delete("/deleteuser/:id",async(req,res)=>{
    try{
        const {id}=req.params;
        const deleteuser =await Courses.findByIdAndDelete({_id:id})
        console.log(deleteuser);
        res.status(201).json(error);
    }
    catch(error)
    {
        res.status(422).json(error);
    }
})
server.listen(8003, () => {
    console.log('server started')
})