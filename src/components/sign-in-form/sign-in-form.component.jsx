import { useState } from 'react';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import {
  signInUserWithEmailAndPassword,
  signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils';

import './sign-in-form.styles.scss';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithGooglePopup();
    } catch (error) {
      console.log('User signing in with google encountered an error', error);
    }
  };

  const signInWithEmailAndPassword = async (event) => {
    event.preventDefault();

    if (!email || !password) return;

    try {
      await signInUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-credential':
          alert('Invalid user credentials!');
          break;
        case 'auth/wrong-password':
          alert('Incorrect password for email!');
          break;
        case 'auth/user-not-found':
          alert('No user associated with this email!');
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className='sign-in-container'>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={signInWithEmailAndPassword}>
        <FormInput
          label='Email'
          type='email'
          name='email'
          value={email}
          required
          onChange={handleChange}
        />
        <FormInput
          label='Password'
          type='password'
          name='password'
          value={password}
          required
          onChange={handleChange}
        />
        <div className='buttons-container'>
          <Button type='submit'>Sign in</Button>
          <Button type='button' buttonType='google' onClick={signInWithGoogle}>
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
