import React from 'react'
// import { AddUser } from '../features/UseReducer'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addUser } from '../features/UseReducer'

const Create = () => {
    const [note, setNote] = useState({id:"",name:"",email:""});
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleOnChange =(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    const handleOnSubmit=(e)=>{
        e.preventDefault();
        console.log(`the note which is gonna add is ${note}`);
        dispatch(addUser(note));
        navigate("/");
    }
  return (
   <>
   <div className="container" style={{ 
    marginTop: "63px", 
    padding: "53px", 
    // border: "2px solid black", 
    borderRadius: "46px", 
    width: "42%", 
    background: "grey" 
}}>
    <h2>Create Info</h2>

  <form  onSubmit={handleOnSubmit}>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Roll No</label>
    <input type="text" className="form-control" id="id" aria-describedby="emailHelp" placeholder="Enter Id" required minLength={10} name="id" value={note.id} onChange={handleOnChange}></input>
    <small id="emailHelp" className="form-text text-muted">Enter Your Roll No</small>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Name</label>
    <input type="text" className="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter Name" required minLength={2} name="name" value={note.name} onChange={handleOnChange}></input>
    <small id="emailHelp" className="form-text text-muted">Enter Your Name</small>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required name="email" value={note.email} onChange={handleOnChange}></input>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <button type="submit" className="btn btn-dark">Create</button>
</form>
   </div>
   </>
  )
}

export default Create
