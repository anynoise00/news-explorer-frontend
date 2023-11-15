import { useState } from 'react';
import { Link } from 'react-router-dom';
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import FormInputField from '../FormInputField/FormInputField';
import {
  emailOptions,
  usernameOptions,
  passwordOptions,
  handleInputChange,
} from '../../utils/validation';

import './RegisterModal.css';

function RegisterModal(props) {
  const [email, setEmail] = useState({ value: '' });
  const [username, setUsername] = useState({ value: '' });
  const [password, setPassword] = useState({ value: '' });

  return (
    <ModalWithForm
      {...props}
      name='register-form'
      title='Inscreva-se'
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
            type='text'
            name='username'
            label='Nome de usuário'
            placeholder='Insira seu nome de usuário'
            onChange={(e) => handleInputChange(e, setUsername, usernameOptions)}
            value={username.value}
            error={username.error}
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
            Entrar
          </Link>
        </p>
      }
      submitBtnText='Inscreva-se'
      btnActive={email.valid && username.valid && password.valid}
    />
  );
}

export default RegisterModal;
