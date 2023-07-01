import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
    value: {
        username: string
        role: string
    }
  }

  const initialState: AuthState = { value: {
    username: '',
    role: ''
  } }

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{username: string, role: string}>) => {
            console.log(action.payload)
            state.value = action.payload
        },
        logout: (state) => {
            state.value = null
        }
    },
  })

export const { login, logout } = authSlice.actions

export default authSlice.reducer