import React from 'react'

const FormCard = ({data,handleDelete,handleEdit}) => {
  return (
    <div style={{height:"400px",width:"300px",border:"2px solid black",display:"flex",flexDirection:"column",alignItems:"center",padding:"20px",backgroundColor:"white",borderRadius:"20px",margin:"5px",}}>
      <h1>{data.name}</h1>
      <h2>{data.email}</h2>
      <h3>{data.password}</h3>
      <h3>{data.gender}</h3>
      <h3>{data.country}</h3>
      <button style={{padding:"10px 30px",backgroundColor:"navy",border:"none",color:'white',fontSize:"16px",fontWeight:"bold",borderRadius:"10px"}}  onClick={()=>handleDelete(data.id)}>Delete</button>
      <button style={{padding:"10px 30px",backgroundColor:"green",border:"none",color:'white',fontSize:"16px",fontWeight:"bold",borderRadius:"10px",marginTop:"5px"}} onClick={()=>handleEdit(data.id)}>Update Data</button>
    </div>
  )
}

export default FormCard
