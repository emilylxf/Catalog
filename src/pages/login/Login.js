import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import OktaSignInWidget from './OktaSignInWidget';
import { useOktaAuth } from '@okta/okta-react';

const DEFAULT_ORIGINAL_URI = window.location.origin;

const Login = ({ config }) => {
  const { oktaAuth, authState } = useOktaAuth();

  const onSuccess = (tokens) => {
    //use localhost:5000 for dev purpose
    axios
      .get("http://127.0.0.1:5000/user", { 
        headers: {"Authorization" : `Bearer ${tokens.idToken.idToken}`} 
      })
      .then(
        function (response) {
          //Perform action based on response

          localStorage.setItem("user_id", response.data)
        }.bind(this)
      )
      .catch(function (error) {
        console.log(error);
        //Perform action based on error
      });
    oktaAuth.handleLoginRedirect(tokens);
  };

  const onError = (err) => {
    console.log('error logging in', err);
  };

  if (!authState) return null;

  return authState.isAuthenticated ?
    <Redirect to={{ pathname: '/' }}/> :
    <OktaSignInWidget
      config={config}
      onSuccess={onSuccess}
      onError={onError}/>;
};
export default Login;