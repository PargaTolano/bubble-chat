import React, { useEffect, useState } from 'react';

import MainBubble from './components/MainBubble';
import ChatBubble from './components/ChatBubble';

import LoadingScreenWrapper from './components/loading/LoadingScreenWrapper';
import Login                from './components/Login';

import {Route, BrowserRouter as Router } from 'react-router-dom';

import { routes } from './config/routes';

import './styles/globals.css'; 
import 'semantic-ui-css/semantic.min.css';

const App =() => {

  const [loading, setLoading] = useState(false);

  useEffect(()=>{

    const onClick = e=>{
      e.preventDefault();
      setLoading(x => !x);
    }

    document.addEventListener('click', onClick);

    return ()=>{
      document.removeEventListener('click', onClick);
    };

  },[]);

  return (
    <Router>
      <LoadingScreenWrapper loading={loading}/>
      <Route exact path={routes.home}>
        <MainBubble/>
        <ChatBubble/>
      </Route>
      <Route exact path={routes.login}>
        <Login/>
      </Route>
    </Router>
  );
}

export default App; 
