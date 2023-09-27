import React from 'react';
import s from './s.module.scss';
import {useInput} from "../../utils/hooks/useInput";
import {useNavigate} from "react-router-dom";
import {PATHS} from "../../utils/types/Routes.enum";
import {AuthApi} from "../../services/auth/auth";
import {useAuthStore} from "../../store/useAuth";
import {useUserInformationStore} from "../../store/useUserInformation";

const Login = (): React.ReactElement => {
  const {value: emailValue, onChange: onChangeEmail} = useInput('bogdankozlovski18@gmail.com')
  const {value: passwordValue, onChange: onChangePassword} = useInput('bogdan04')

  const setIsLoggedIn = useAuthStore(state => state.setIsLoggedIn)
  const setUserInformation = useUserInformationStore(state => state.setUserInformation)

  const navigate = useNavigate()

  const onLoginAccountClick = async (): Promise<void> => {
    try {
      const trimmedValues = {
        email: emailValue,
        password: passwordValue,
      }

      const {data} = await new AuthApi().sigIn(trimmedValues)

      setUserInformation(data)
      navigate(PATHS.ROOT)
      setIsLoggedIn(true)

      localStorage.setItem('authToken', data.token)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className={s.l}>
      <div className={s.l__wrap}>
        <h2>Log In</h2>
        <label className={s.l__label}>
          Email
          <input
            className={s.l__input}
            type="email"
            placeholder='user@example.com'
            value={emailValue}
            onChange={event => onChangeEmail(event)}
          />
        </label>
        <label className={s.l__label}>
          Password
          <input
            className={s.l__input}
            type="password"
            placeholder='***************'
            value={passwordValue}
            onChange={event => onChangePassword(event)}
          />
        </label>

        <button onClick={onLoginAccountClick}>Login</button>
      </div>
    </div>
  );
};

export {Login}
