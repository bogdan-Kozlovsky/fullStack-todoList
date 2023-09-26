import {create} from "zustand";
import jwt_decode from 'jwt-decode';

interface AuthState {
  isLoggedIn: boolean
  checkLoginStatus: () => void
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  checkLoginStatus: () => {
    const token = localStorage.getItem('authToken')

    if (token) {
      try {
        const decodeToken = jwt_decode(token)
        const currentTimestamp = Math.floor(Date.now() / 1000)

        if (decodeToken.exp < currentTimestamp) {
          set({isLoggedIn: false})
        } else {
          set({isLoggedIn: true})
        }
      } catch (e) {
        console.log(e)
        set({isLoggedIn: false})
      }
    } else {
      set({isLoggedIn: false})
    }
  }
}))

export {useAuthStore}
