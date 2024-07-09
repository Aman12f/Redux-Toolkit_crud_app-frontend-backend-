import { configureStore } from '@reduxjs/toolkit'
import UseReducer from '../features/UseReducer'

export const store = configureStore({
  reducer: {
    users:UseReducer,
  },
})