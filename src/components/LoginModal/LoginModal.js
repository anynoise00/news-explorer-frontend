import { useState } from 'react';
import { Link } from 'react-router-dom';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import FormInputField from '../FormInputField/FormInputField';
import {
  emailOptions,
  passwordOptions,
  handleInputChange,
} from '../../utils/validation';

import './LoginModal.css';

function LoginModal(props) {
  const [email, setEmail] = useState({ value: '' });
  const [password, setPassword] = useState({ value: '' });

  return (
    <ModalWithForm
      {...props}
      name='login-form'
      title='Entrar'
      body={
        <>
          <FormInputField
            type='email'
            name='email'
            label='E-mail'
            placeholder='Insira o e-mail'
            onChange={(e) => handleInputChange(e, setEmail, emailOptions)}
            value={email.value}
            error={email.error}
          />
          <FormInputField
            type='password'
            name='password'
            label='Senha'
            placeholder='Insira a senha'
            onChange={(e) => handleInputChange(e, setPassword, passwordOptions)}
            value={password.value}
            error={password.error}
          />
        </>
      }
      footer={
        <p className='form__bottom-text'>
          ou{' '}
          <Link className='link' onClick={props.onLinkClick}>
            Inscreva-se
          </Link>
        </p>
      }
      submitBtnText='Entrar'
      btnActive={email.valid && password.valid}
    />
  );
}

export default LoginModal;
