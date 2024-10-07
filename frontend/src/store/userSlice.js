import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    createUser : (state, actions) =>{
    state.user = actions.payload
   }
  },
})

// Action creators are generated for each case reducer function
export const { createUser } = userSlice.actions

export default userSlice.reducer