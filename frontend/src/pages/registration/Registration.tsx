import React from 'react';
import s from './s.module.scss';
import {useInput} from "../../utils/hooks/useInput";
import {useNavigate} from "react-router-dom";
import {PATHS} from "../../utils/types/Routes.enum";
import {AuthApi} from "../../services/auth/auth";

const Registration = (): React.ReactElement => {
  const {value: nameValue, onChange: onChangeName} = useInput('')
  const {value: emailValue, onChange: onChangeEmail} = useInput('')
  const {value: passwordValue, onChange: onChangePassword} = useInput('')
  const {value: confirmPasswordValue, onChange: onChangeConfirmPassword} = useInput('')

  const navigate = useNavigate()

  const onCreateAccountClick = async (): Promise<void> => {
    const trimmedValues = {
      fullName: nameValue,
      email: emailValue,
      password: passwordValue,
    }

    try {
      const {data} = await new AuthApi().sigUp(trimmedValues)

      if (data) {
        navigate(PATHS.LOGIN)
      }

    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div className={s.l}>
      <div className={s.l__wrap}>
        <h2>Create Account</h2>
        <label className={s.l__label}>
          Name
          <input
            className={s.l__input}
            type="email"
            placeholder='name'
            value={nameValue}
            onChange={event => onChangeName(event)}
          />
        </label>
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

        <label className={s.l__label}>
          Confirm Password
          <input
            className={s.l__input}
            type="password"
            placeholder='***************'
            value={confirmPasswordValue}
            onChange={event => onChangeConfirmPassword(event)}
          />
        </label>

        <button
          disabled={passwordValue !== confirmPasswordValue}
          onClick={onCreateAccountClick}
        >
          Create Account
        </button>
      </div>
    </div>
  );
};

export {Registration}
