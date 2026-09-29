import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios'
import FormCard from './FormCard';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
    let[data,setData]=useState(null)
    let navigate=useNavigate();
     let getData=async()=>{
        let res=await axios.get("http://localhost:5000/users")
        setData(res.data)
    }
    
    useEffect(()=>{
   getData()
    },[])



  //delete operation  
  let handleDelete=async(id)=>{
    //delete from local host
    let res=await axios.delete(`http://localhost:5000/users/${id}`)
    //delete from card
    let filterDelete=data.filter((ele)=>{
        return ele.id!=id;
    })
   setData(filterDelete);
}
//let edit the data
let handleEdit=(id)=>{
  navigate(`/signup/${id}`)

}

  return (
      <div style={{display:"flex",flexWrap:"wrap",gap:"20px",justifyContent:"center",alignItems:"center",backgroundColor:"palegreen"}}>
      {data?.map((el,index)=>{
          return <FormCard key={index} data={el} handleDelete={handleDelete} handleEdit={handleEdit}/>
        })}
        <button onClick={()=>navigate("/signup")}  style={{padding:"10px 50px ",backgroundColor:"orange",color:"black",fontSize:"20px",border:"none",borderRadius:"15px"}}>got to signup</button>
    </div>
    
  )
}

export default UserList
