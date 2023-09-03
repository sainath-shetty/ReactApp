import React, { useState } from 'react'

import './LoginSignup.css'
import email_icon from './Assets/email_icon.png'
import password_icon from './Assets/password_icon.png'
import user_icon from './Assets/user_icon.png'
import { Link, useNavigate } from 'react-router-dom'


const Signup = () => {

    const [form, setForm] = useState({});
    const navigate=useNavigate();


    const handleForm = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value

        })
    }
    const handleSubmit = async (e) => {
        const response = await fetch('http://localhost:8080/signup', {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json();
        console.log(data);
        
        if(data.error)
        {
            alert("email already exist");
        }
       else if(data.message){
        alert('Signup Succesful');
            navigate('/login');
        }
        
    }
    // if (action === 'Login') {
    //     response = await fetch('http://localhost:8080/login', {
    //         method: 'POST',
    //         body: JSON.stringify(form),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })

    // }
   

// const getUser=async (e)=>{
//     const response =await fetch('http://localhost:8080/demo',{
//           method:'GET',


//       });

//  const data=await response.json();
//       console.log(data);

//   }
//    useEffect(()=>{
//         getUser();
//      },[]);





return (
    <div className='main'>
        <div className='container'>
        
        <div className="header">
            <div className="text">Sign Up</div>
            <div className="underline"></div>
        </div>
        
        <div className="inputs">
             <div className="input">
                <img src={user_icon} alt="" width={45} height={45} />
                <input type="text" name='name' onChange={handleForm} placeholder='Name' />
            </div>

        </div>
        <div className="inputs">
            <div className="input">
                <img src={email_icon} alt="" width={45} height={45} />
                <input type="email" name='email' onChange={handleForm} placeholder='Email Id' />
            </div>
        </div>
        <div className="inputs">
            <div className="input">
                <img src={password_icon} alt="" width={45} height={45} />
                <input type="password" name='password' onChange={handleForm} placeholder='Password' />
            </div>
        </div>
       <div><p>ALready have an account? <Link to="/login">Login</Link></p></div>

        <div className="submit-container">
    <button className='submit' onClick={handleSubmit}>Sign Up</button>
           
        </div>
        </div>
    </div>
)

}
export default Signup;

