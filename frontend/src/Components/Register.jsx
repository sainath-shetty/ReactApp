import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
const Register = () => {
    const navigate=useNavigate();
    const [form, setForm] = useState({});
    // const navigate=useNavigate();


    const setdata = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:8003/register', {
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
            alert(data.error);
        }
       else if(data.message){
        alert('Registration Succesful');
        navigate('/');
        }
        
    }
    return (
        <div>
 
            
   <h1>Enter New Info</h1>
            <form className='mt-4'>
                <div className="row">
                    
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Course Name</label>
                        <input type="text" name="cname" onChange={setdata}   class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Guide Name</label>
                        <input type="text" name="gname"  onChange={setdata} class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputEmail1" class="form-label">Guide Email</label>
                        <input type="email" name="gemail"  onChange={setdata} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                      
                    </div>
                    <div className="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="exampleInputPassword1" class="form-label">Phone Number</label>
                        <input type="text" name="gphone"  onChange={setdata}  class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3 col-lg-12 col-md-12 col-12">
                        <label for="exampleInputPassword1" class="form-label">Description</label>
                        <input type="text" name="desc"  onChange={setdata} class="form-control" id="exampleInputPassword1" />
                    </div>
                    
                </div>
                <button type="submit" onClick={handleSubmit} class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Register
