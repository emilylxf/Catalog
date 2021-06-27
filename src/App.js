import React from "react";
import Home from "./pages/home/Home";
import Catalog from "./pages/catalog/Catalog";
import Story from "./pages/story/Story";
import About from "./pages/about/About";
import FHDANavbar from "./pages/navbar/FHDANavbar";
import Login from "./pages/login/Login";
import { Route, useHistory, Switch } from "react-router-dom";
import "./assets/css/App.css";
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security, LoginCallback } from '@okta/okta-react';
var OktaSignIn = require('@okta/okta-signin-widget');


const CLIENT_ID = "0oa13dfryq3ffhUKb5d7"
const ISSUER = "https://dev-19217834.okta.com/oauth2/default"
const config = {
  clientId: CLIENT_ID,
  issuer: ISSUER,
  redirectUri: 'http://localhost:3000/login/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true
};
const oktaAuth = new OktaAuth(config);

export default function App() {

  const [corsErrorModalOpen, setCorsErrorModalOpen] = React.useState(false);
  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };
  const oktaSignInConfig = {
    baseUrl: 'https://dev-19217834.okta.com',
    clientId: oktaAuth.options.clientId,
    issuer: oktaAuth.options.issuer,
    redirectUri: oktaAuth.options.redirectUri,
    authClient: oktaAuth,
    features: {
       registration: true // REQUIRED
    }
  }

  return (
    <div className="app">
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
        <FHDANavbar {...{ setCorsErrorModalOpen }} />
      
        <Switch>
          <Route exact path="/" render={(routerProps) => < Home routerProps={routerProps} />} />
          <Route exact path="/catalog" render={(routerProps) => < Catalog routerProps={routerProps} />} />
          <Route exact path="/story" render={(routerProps) => < Story routerProps={routerProps} />} />
          <Route exact path="/about" render={(routerProps) => < About routerProps={routerProps} />} />
          <Route path='/login' render={() => <Login config={oktaSignInConfig} />} />
        </Switch>
      </Security>
    </div>
  );
}
