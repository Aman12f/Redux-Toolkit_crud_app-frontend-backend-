import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


export const fetchUser = createAsyncThunk("user/fetch",async(thunkApi)=>{
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  const response = await fetch("http://localhost:5000/api/user/fetchUser", {
    method: "GET",
    // body: JSON.stringify({ username: "example" }),
    headers: myHeaders,
  });
  const json = await response.json();
  console.log(json);
  return json;
})

export const addUser = createAsyncThunk("user/add",async (note,thunkApi)=>{
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  const response = await fetch("http://localhost:5000/api/user/createUser", {
    method: "POST",
    body: JSON.stringify({ id:note.id,name:note.name,email:note.email}),
    headers: myHeaders,
  });
  const json = await response.json();
  console.log(json);
  return json;
})
export const updateUser = createAsyncThunk("user/update",async(note)=>{
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  
  const response = await fetch(`http://localhost:5000/api/user/editNote/${note._id}`, {
    method: "PUT",
    body: JSON.stringify({ id:note.id,name:note.name,email:note.email}),
    headers: myHeaders,
  });
  console.log(`The note is ${note}`)
  const json = await response.json();
  console.log('The updated note json is', JSON.stringify(json, null, 2));

  return json;
})

export const deleteUser = createAsyncThunk("user/delete",async(id)=>{
  
  const response = await fetch(`http://localhost:5000/api/user/deleteUser/${id}`, {
    method: "DELETE",
  });
  const json = await response.json();
  console.log('The deleated note json is', JSON.stringify(json, null, 2));
  return json;
})

export const UseReducer = createSlice({
  name: 'users',
  initialState:[],
  reducers: {
  },
  extraReducers:(builder)=>{
    builder.addCase(fetchUser.fulfilled,(state,action)=>{
      return action.payload
    });

    builder.addCase(addUser.fulfilled,(state,action)=>{
      state.push(action.payload)
    })

    builder.addCase(deleteUser.fulfilled,(state,action)=>{
       console.log(`note ${JSON.stringify(action.payload)} deleated successfully`);
       return state.filter((user)=>user._id!==action.payload._id)
    })

    builder.addCase(updateUser.fulfilled,(state,action)=>{
      // return state.map((user)=>user._id === action.payload.id?action.payload:user)
      console.log('The updated note is', action.payload);
      const tempState = state.map(user => user._id === action.payload._id ? action.payload : user);
      return tempState;
      
    })
  }
})

// Action creators are generated for each case reducer function
export const {AddUser,DeleteUser,editUser} = UseReducer.actions

export default UseReducer.reducer