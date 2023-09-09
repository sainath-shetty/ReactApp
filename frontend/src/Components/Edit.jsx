import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link ,useParams,useNavigate} from 'react-router-dom'

const Edit = () => {

    const [form, setForm] = useState({});
    const navigate=useNavigate();


    const setdata = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }


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
        setForm(data);
    }
    //    else if(data.message){
    //     alert('Registration Succesful');
    //     navigate('/');


}
useEffect(()=>{
  getdata();
},[])
const updateuser=async(e)=>{
    e.preventDefault();
    
    const res2=await fetch(`http://localhost:8003/updateuser/${id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify( form)
    })
    const data2=await res2.json();
    console.log(data2);
    if(data2.error){
        alert(data2.error)
    }
    else{
        alert("Data edited")
        navigate('/');
    }
}

    
  return (
    <div>
    {/* <Link to='/'>home</Link> */}
    <h1>EDIT INFO</h1>
    <form className='mt-4'>
        <div className="row">
            
            <div className="mb-3 col-lg-6 col-md-6 col-12">
                <label for="exampleInputPassword1" class="form-label">Course Name</label>
                <input type="text" name="coursename"  value={form.coursename}  onChange={setdata}   class="form-control" id="exampleInputPassword1" />
            </div>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
                <label for="exampleInputPassword1" class="form-label">Guide Name</label>
                <input type="text" name="guidename" value={form.guidename} onChange={setdata} class="form-control" id="exampleInputPassword1" />
            </div>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
                <label for="exampleInputEmail1" class="form-label">Guide Email</label>
                <input type="email" name="guideemail" value={form.guideemail}  onChange={setdata} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
              
            </div>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
                <label for="exampleInputPassword1" class="form-label">Phone Number</label>
                <input type="text" name="phonenumber" value={form.phonenumber} onChange={setdata}  class="form-control" id="exampleInputPassword1" />
            </div>
            <div className="mb-3 col-lg-12 col-md-12 col-12">
                <label for="exampleInputPassword1" class="form-label">Description</label>
                <input type="text" name="description" value={form.description}  onChange={setdata} class="form-control" id="exampleInputPassword1" />
            </div>
            
        </div>
        <button type="submit"onClick={updateuser}class="btn btn-primary">Submit</button>
    </form>
    </div>
  )
}

export default Edit
