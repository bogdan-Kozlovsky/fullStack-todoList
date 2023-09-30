import React from 'react';
import {useUserInformationStore} from "../../store/useUserInformation";
import {AccountApi} from "../../services/account/account";
import {TodoLists} from "../../components/todoLists/TodoLists";

const Home = (): React.ReactElement => {
  const {fullName} = useUserInformationStore(state => state.userInformation)
  const setUserInformation = useUserInformationStore(state => state.setUserInformation)

  const getUserInformation = async (): Promise<void> => {
    try {
      const response = await new AccountApi().me()
      setUserInformation(response)
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

      <TodoLists/>
    </div>
  );
};

export {Home};
