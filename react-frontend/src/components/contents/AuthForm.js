import { useState } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = (props) => {
  const [enteredUsername, setEnteredUsername] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  const loginSubmitHandler = (event) => {
    event.preventDefault();
    const data = {
      username: enteredUsername,
      password: enteredPassword
    }
    console.log(data)
    props.onLogin(data);
    setEnteredPassword('');
    setEnteredUsername('');
  }

  const inputUsernameChangeHandler = (event) => {
    console.log(event.target.value);
    setEnteredUsername(event.target.value);
  }
  const inputPasswordChangeHandler = (event) => {
    setEnteredPassword(event.target.value)
  }

  return (
    <section className={classes.auth}>
      <h1>Please login to continue.</h1>
      
      <form onSubmit={loginSubmitHandler} >
        <div className={classes.control}>
          <label htmlFor='username'>Username</label>
          <input type='text' id='username' required value={enteredUsername} onChange={inputUsernameChangeHandler} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Password</label>
          <input type='password' id='password' required  value={enteredPassword} onChange={inputPasswordChangeHandler} />
        </div>
        <div className={classes.actions}>
          <button type="submit">Login</button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
