import React from "react";
import "./assets/css/App.css";
import Home from "./pages/home/Home";
import Catalog from "./pages/catalog/Catalog";
import Story from "./pages/story/Story";
import StoryWriter from "./pages/story/StoryWriter.js";
import About from "./pages/about/About";
import FHDANavbar from "./pages/navbar/FHDANavbar";
import Login from "./pages/login/Login";
import { Route, useHistory, Switch } from "react-router-dom";
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security } from '@okta/okta-react';
import config from './config';
import StoryDetail from "./pages/story/StoryDetail";

const oktaAuth = new OktaAuth(config.oktaConfig);

export default function App() {
  console.log(oktaAuth)
  const [corsErrorModalOpen, setCorsErrorModalOpen] = React.useState(false);
  const history = useHistory();
  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };
  

  return (
    <div className="app">
      <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
        <FHDANavbar {...{ setCorsErrorModalOpen }} />
      
        <Switch>
          <Route exact path="/" render={(routerProps) => < Home routerProps={routerProps} />} />
          <Route exact path="/catalog" render={(routerProps) => < Catalog routerProps={routerProps} />} />
          <Route exact path="/story" render={(routerProps) => < Story routerProps={routerProps} />} />
          <Route exact path="/about" render={(routerProps) => < About routerProps={routerProps} />} />
          <Route path='/login' render={() => <Login config={config.oktaSignInConfig} />} />
          <Route path='/story/new' render={() => <StoryWriter/>} />
          <Route path='/story/:article_id?' render={(routerProps) => < StoryDetail routerProps={routerProps} />} />
        </Switch>
      </Security>
    </div>
  );
}
