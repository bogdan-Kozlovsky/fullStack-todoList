import {create} from "zustand";
import jwt_decode from 'jwt-decode';

interface IAuthState {
  isLoggedIn: boolean
  checkLoginStatus: () => void
  setIsLoggedIn: (status: boolean) => void
}

const useAuthStore = create<IAuthState>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (status: boolean) => {
    set({isLoggedIn: status})
  },
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
