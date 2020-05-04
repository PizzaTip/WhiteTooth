import React, { useState, useEffect } from 'react';
import InitSideEffects from './sideEffects/initSideEffects';
import LoginPage from './components/pages/loginPage';
import Authentication from './authentication';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import MainPage from './components/pages/mainPage';

//Change this to move from real to mock side effects
const isMocking = false;
InitSideEffects(isMocking);

function App() {
  const [isLoggedin, setLoginStatus] = useState(false);
  const login = (
    username: string,
    password: string,
    onStart: () => void,
    onFail: (error: string) => void,
    onSuccess: () => void
  ) => {
    onStart();
    Authentication.AuthenticateAsync(username, password)
      .then((token) => {
        setLoginStatus(true);
      })
      .catch((err) => {
        onFail(err);
      })
      .finally(() => {
        onSuccess();
      });
  };

  useEffect(() => {
    if (Authentication.IsAuthenticated()) setLoginStatus(true);
  }, [isLoggedin]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <PrivateRoute
            isLoggedin={isLoggedin}
            component={MainPage}
            exact
            path="/"
          />
          <Route exact path="/login">
            <LoginPage isAuthenticated={isLoggedin} login={login} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

const PrivateRoute = ({ component, isLoggedin, ...rest }: any) => {
  const Component = component;
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedin ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default App;
