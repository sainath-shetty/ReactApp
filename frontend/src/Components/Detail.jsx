import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import profile from './Assets/profile.png'
import MenuBookIcon from '@mui/icons-material/MenuBook';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import BadgeIcon from '@mui/icons-material/Badge';
import Phone from '@mui/icons-material/Phone';
import DescriptionIcon from '@mui/icons-material/Description';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import {Link} from 'react-router-dom'
const Detail = () => {
const {id}=useParams("");
const [getuserdata, setuserdata] = useState([]);
  const getdata = async () => {

    const response = await fetch(`http://localhost:8003/getuser/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json();


    if (data.error) {
        alert(data.error);
     }
    else {
        setuserdata(data);
    }
    //    else if(data.message){
    //     alert('Registration Succesful');
    //     navigate('/');


}
useEffect(()=>{
  getdata();
},[])

const deleteuser=async(id)=>
 { 
    const res2=await fetch(`http://localhost:8003/deleteuser/${id}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json"
        }
    });
    const deletedata=await res2.json()
    console.log(deletedata);
    if(deletedata.error)
    {
        alert(deletedata.error);
    }else{
        console.log("user deleted");
        
    }
 }


  return (
    <div className='Container mt-3 mx-5'>
      <h1 style={{ fontWeight: 400 }} >DETAILS</h1>
      <Card sx={{ maxWidth: 900 }}>
        <CardContent>
        <div className="add_btn">
              <Link to={`/edit/${getuserdata._id}`} className='btn btn-warning mx-2'><EditIcon/></Link>
                                    <Link to='/' className='btn btn-danger' onClick={()=>deleteuser(getuserdata._id)}><DeleteIcon/></Link>
              </div>
          <div className="row">
            <div className="left_view col-lg-6 col-md-6 col-12">
              <img src={profile} style={{ width: 50 }} alt="" />
              <h3 className='mt-3'><BadgeIcon /> Name: <span>{getuserdata.guidename}</span></h3>
              <h3 className='mt-3'><MenuBookIcon /> Course: <span>{getuserdata.coursename}</span></h3>
              <h3 className='mt-3'><EmailIcon /> Email: <span>{getuserdata.guideemail}</span></h3>
            </div>
            <div className="right_view col-lg-6 col-md-6 col-12">
             
              <h3 className='mt-5'><Phone /> Phone Number: <span>{getuserdata.phonenumber}</span></h3>
              <h3 className='mt-3'><DescriptionIcon />Description :<span>{getuserdata.description}</span></h3>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>
  )
}

export default Detail
