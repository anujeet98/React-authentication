import { useContext, useRef, useState } from 'react';

import classes from './AuthForm.module.css';
import AuthContext from '../../contexts/auth-context';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
const FIREBASEKEY = process.env.REACT_APP_FIREBASE_KEY;

const AuthForm = () => {
  const emailref = useRef('');
  const passwordref = useRef('');
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const authCtx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const authenticationHandler = async(e) => {
    try{
      e.preventDefault();
      setIsLoading(true);
      const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:${isLogin ? 'signInWithPassword': 'signUp'}?key=${FIREBASEKEY}`,{
        method: 'POST',
        body: JSON.stringify({
          email: emailref.current.value,
          password: passwordref.current.value,
          returnSecureToken: true,
        }),
        headers:{
          'Content-Type': 'application/json'
        }
      });
      const resData = await res.json();
      if(!res.ok){
        throw new Error(resData.error.message);
      }

      authCtx.addToken(resData.idToken, resData.expiresIn);
      alert(`${isLogin ? 'User sign in successful' : 'User sign up successful'}`);
      passwordref.current.value='';
      history.push('/profile');
    }
    catch(err){
      console.log(err.message); 
      alert(err.message);
    }
    finally{
      setIsLoading(false);
    }

  }


  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={(e)=>authenticationHandler(e)}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={emailref} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' ref={passwordref} required/>
        </div>
        { isLoading && <div className={classes.reqMsg}>Sending requests...</div>}
        {!isLoading && <div><button type='submit' className={classes.authBtn}>{isLogin ? 'Signin' : 'Signup'}</button></div>}
        <div className={classes.actions}>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
