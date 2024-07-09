import React from 'react'
import { useSelector,useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import Modal1 from './Modal1'
import { useRef } from 'react'
import { useEffect } from 'react'
import { fetchUser } from '../features/UseReducer'
import { deleteUser } from '../features/UseReducer'

const Home = () => {
  const ref = useRef();
  const dispatch = useDispatch()
  const handleOnEditClick =(user)=>{
    ref.current.openModal(user)
  }
  
  useEffect(() => {
    dispatch(fetchUser())
  }, [dispatch])
  
  const users = useSelector((state) => state.users)
  console.log(users);
  
  return (
    <>
    <div className="container">
    <h3 className='my-4'>Crud App with JSON Server</h3>
    <Link className="btn btn-primary" to="/create" role="button">Create +</Link>


    <div className='container my-4'>
    <Modal1 ref={ref}></Modal1>
      <table className="table">
  <thead>
    <tr>
      <th scope="col">Roll No</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Action</th>
    </tr>
  </thead>

  <tbody>
     { 
         users.map((user,index)=>(
             <tr key={index}>
               <td>{user.id}</td>
               <td>{user.name}</td>
               <td>{user.email}</td>
               <td>
               <button type="button" className="btn btn-primary m-1" onClick={()=>handleOnEditClick(user)}>Update</button>
               <button type="button" className="btn btn-secondary m-1" onClick={() => dispatch(deleteUser(user._id))}>Delete</button>
               </td>
               
            </tr>
        ))
    }
  </tbody>
</table>
    </div>
    </div>
    </>
  )
}

export default Home
