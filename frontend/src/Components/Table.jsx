import React, { useState } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';


const Table = () => {
    const [getuserdata, setuserdata] = useState([]);
    console.log(getuserdata)
    const getdata = async (e) => {

        const response = await fetch('http://localhost:8003/getdata', {
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
    useEffect(() => {
        getdata();
    }, [])
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
        getdata();
    }
 }

    return (
        
       
    
        <div>
            <div class="alert alert-sucess alert-dismissible fade show" role="alert">
  <strong>Sucess!</strong> Course added Sucessfully!!
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
            <div className="mt-5">
                <div className="container">
                    <div className="add_btn mt-2">
                        <Link to='/register' className="btn btn-primary">+ Add Data</Link>
                    </div>
                    <table className="table mt-2">
                        <thead>
                            <tr className="table-dark ">
                                <th scope="col">id</th>
                                <th scope="col">Course</th>
                                <th scope="col">Guide</th>
                                <th scope="col">Email</th>
                                <th scope="col">Number</th>
                                <th scope="col"></th>
                                <th scope="col"></th>

                            </tr>
                        </thead>
                        
                        <tbody>

                           
                            {
                                getuserdata.map((element, id) => {
                                    return (
                                        <>
                                            <tr>
                                                <th scope="row">{id+1}</th>
                                                <td>{element.coursename}</td>
                                                <td>{element.guidename}</td>
                                                <td>{element.guideemail}</td>
                                                <td>{element.phonenumber}</td>
                                                <td className='d-flex justify-content-between'>
                                                    <Link to={`detail/${element._id}`} className='btn btn-success'><VisibilityIcon /></Link>
                                                    <Link to={`edit/${element._id}`} className='btn btn-warning'><EditIcon /></Link>
                                                    <button className='btn btn-danger' onClick={()=>deleteuser(element._id)}><DeleteIcon /></button>

                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                            }


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        
    )
}

export default Table
