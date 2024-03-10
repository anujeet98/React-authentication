import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import { Fragment, useContext } from 'react';
import AuthContext from '../../contexts/auth-context';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const history = useHistory();

const logoutHandler = () => {
  authCtx.deleteToken();
  history.push('/auth');
}

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {
            !authCtx.authToken ? 
            <Fragment>
            <li>
              <Link to='/auth'>Login</Link>
            </li>
            </Fragment>:
            <Fragment>
              <li>
                <Link to='/profile'>Profile</Link>
              </li>
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            </Fragment>
          }
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
