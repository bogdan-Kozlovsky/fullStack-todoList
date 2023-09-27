import React from 'react';
import {useUserInformationStore} from "../../store/useUserInformation";
import {AccountApi} from "../../services/account/account";

const Home = (): React.ReactElement => {
  const {fullName} = useUserInformationStore(state => state.userInformation)
  const setUserInformation = useUserInformationStore(state => state.setUserInformation)

  const getUserInformation = async (): Promise<void> => {
    try {
      const token = localStorage.getItem('authToken')

      if (token) {
        const response = await new AccountApi().me(token)
        setUserInformation(response)
      }
    } catch (e) {
      console.log(e)
    }
  }

  React.useEffect(() => {
    getUserInformation()
  }, [])

  return (
    <div>
      <h1>HOME</h1>
      <p>{fullName}</p>

    </div>
  );
};

export {Home};
