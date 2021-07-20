import React from 'react';
import { Redirect } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import StoryList from './StoryList';

const Story = () => {
  const { oktaAuth, authState } = useOktaAuth();

  return !authState || authState.isAuthenticated ?
    <StoryList/> : <Redirect to={{ pathname: '/login' }}/>
};
export default Story;