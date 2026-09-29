import React, { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom';

const Form = () => {
    let [name,setName]=useState("");
    let [email,setEmail]=useState("");
    let [password,setPassword]=useState("");
    let [confirmPassword,setConfirmPassword]=useState("");
    let [gender,setGender]=useState("");
    let [country,setCountry]=useState("");
    let navigate=useNavigate();
   let {id}=useParams(); 

    let handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(name)
        console.log(email)
        console.log(password)
        console.log(confirmPassword)
        console.log(gender)
        console.log(country)

        
        //storing the data in one object
        let data={
               name,
               email,
               password,
               confirmPassword,
               gender,
               country
           }
           console.log(data)

            //post the form data 
        //do validation betfore posting
        //1)checks fields are empty or not
        //2)check whether the object already exist or not
        if(name && email && password && confirmPassword && gender && country){

            if(id){
                let res=await axios.put(`http://localhost:5000/users/${id}`,data)

                if(res.status==200){
                    toast.success("Data Updated successfully")
                    navigate("/users")
                }
            }else{

                //if all are completly field go for existing object
                let res=await axios.get(`http://localhost:5000/users?email=${email}`)
                let alreadyExist=res.data.length>0;
                if(alreadyExist){
                    toast.error ("user already exist")
                    
                }else{
                    let res=await axios.post("http://localhost:5000/users",data)
                    console.log(res)
                    if( res.status==201){
                        toast.success("data posted successfully")
                        navigate('/users')
                    }
                    
                
                    
                }
                
            }
            
        }else{
            toast.error("fill all the fields first")
        }

        
       
    }
    let getUsers=async()=>{

            //fetch a single users
            let res=await axios.get(`http://localhost:5000/users/${id}`)
            let users=res.data;

            //get the data in fields
            setName(users.name)
            setPassword(users.password)
            setConfirmPassword(users.confirmPassword)
            setEmail(users.email) 
            setGender(users.gender)
            setCountry(users.country);

        }
        useEffect(()=>{
            if(id){
                getUsers();
            }
        },[id])

    
  return (
    <div style={{border:"2px solid black",height:"100vh",width:"100vw",display:"flex",justifyContent:"center",alignItems:"center"}}>
      
      <form onSubmit={handleSubmit} style={{border:"2px solid black",margin:"10px",width:"fit-content",height:"auto",padding:"30px",borderRadius:"10px",backgroundColor:"beige",border:"none"}}>
  <input type="text" value={name} onChange={(e)=>setName(e.target.value)}  placeholder="enter name.."  style={{padding:"10px 60px",fontSize:"20px",borderRadius:"20px",border:"none"}}/>
  <br />
  <br />
  <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)}  placeholder="enter email.." style={{padding:"10px 60px",fontSize:"20px",borderRadius:"20px",border:"none"}}/>
  <br />
  <br />
  <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder="enter password.." style={{padding:"10px 60px",fontSize:"20px",borderRadius:"20px",border:"none"}} />
  <br />
  <br />
  <input type="password" value={confirmPassword} onChange={(e)=>
    setConfirmPassword(e.target.value)}placeholder="confirm password.." style={{padding:"10px 60px",fontSize:"20px",borderRadius:"20px",border:"none"} } />
    {/* first confirm password check the value exist or not if exist do compare */}
    {confirmPassword && confirmPassword!=password && <p style={{color:"red"}}>Password not match</p>}
   <br />
  <br />
  <h2>Select Gender</h2>
  <input type="radio" name="gender" value="male" checked={gender=="male"}  onChange={(e)=>setGender(e.target.value)} />Male
  <input type="radio" name="gender" value="female" checked={gender=="female"}   onChange={(e)=>setGender(e.target.value)} />Female
  <input type="radio" name="gender" value="other" checked={gender=="other"}  onChange={(e)=>setGender(e.target.value)} />Other
  <br />
  <br />
  <h2>Select Country</h2>
  <select value={country} onChange={(e)=>setCountry(e.target.value)}>
    <option >-select-country</option>
    <option value="india">India</option>
    <option value="americe">America</option>
    <option value="england">England</option>
    <option value="Africa">Africa</option>
  </select>
  <br /><br />
  <div style={{textAlign:"center"}}>
    <button type='submit' style={{padding:"10px 170px",fontSize:"20px",fontWeight:"bold",border:"none",borderRadius:"20px",color:"navy",backgroundColor:"orange", cursor:"pointer"}}>submit</button>

  </div>
      </form>
                </div>
       
    
  )
}

export default Form
