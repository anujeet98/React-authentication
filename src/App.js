import { Switch, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { useContext } from 'react';
import AuthContext from './contexts/auth-context';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        <Route path='/auth'> 
          {!authCtx.authToken ? <AuthPage /> : <Redirect to='/'/>}
        </Route>
        <Route path='/profile'> 
          {authCtx.authToken ? <UserProfile /> : <Redirect to='/auth'/>}
        </Route>
        <Route path='*'>
          <Redirect to='/auth'/>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
