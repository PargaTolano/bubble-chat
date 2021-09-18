import React      from 'react';

import MainBubble from './components/MainBubble';
import ChatBubble from './components/ChatBubble';

import LoadingScreenWrapper from './components/loading/LoadingScreenWrapper';
import Login                from './components/Login';

import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import { routes } from './config/routes';

import './styles/globals.css'; 
import 'semantic-ui-css/semantic.min.css';

const App =() => {
  return (
    <Router>
      <LoadingScreenWrapper/>
      <Switch>
        <Route exact path={routes.home}>
          <MainBubble/>
          <ChatBubble/>
        </Route>
        <Route exact path={routes.login}>
          <Login/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App; 