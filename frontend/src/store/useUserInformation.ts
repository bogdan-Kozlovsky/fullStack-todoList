import {create} from "zustand";
import {IUserInformation} from "../services/account/account.interface";

interface IUserDataState {
  userInformation: IUserInformation
  setUserInformation: (userInformationResponse: IUserInformation) => void
}

const useUserInformationStore = create<IUserDataState>((set) => ({
  userInformation: {},
  setUserInformation: (userInformationResponse: IUserInformation) => {
    set({userInformation: userInformationResponse})
  }
}))

export {useUserInformationStore}
