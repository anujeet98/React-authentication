import { useContext, useRef, useState } from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../../contexts/auth-context';

const ProfileForm = () => {
  const passwordref = useRef('');
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);

  const resetRequest = async () => {
    try{
      setIsLoading(true);
      const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDgVNgrmcZxsz-Kiut7ZtJ_AeTUP-Z1iPA',{
        method: 'POST',
        body: JSON.stringify({
          idToken: authCtx.authToken,
          password: passwordref.current.value,
          returnSecureToken: true,
        }),
        headers:{
          'Content-Type': 'application/json'
        }
      });
      const resData = await res.json();
      
      if(!res.ok)
        throw new Error(resData.error.message);

      passwordref.current.value='';
      alert('Password reset complete');
      console.log(resData.idToken);
      authCtx.addToken(resData.idToken);

    }
    catch(err){
      alert(err.message);
      console.log(err.message);
    }
    finally{
      setIsLoading(false);
    }
  }

  const resetHandler = (e) => {
    e.preventDefault();
    if(passwordref.current.value.trim() === '')
      return alert('Kindly provide a valid password');
    resetRequest();
  }
  return (
    <form className={classes.form} onSubmit={(e)=>resetHandler(e)}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={passwordref} required />
      </div>
      {isLoading && <div>Sending request...</div>}
      <div className={classes.action}>
        <button type='submit'>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
