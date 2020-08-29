
import React from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import Header from '../components/Header';
import User from '../components/User';
import reducers from '../reducers';

const Routes = () => {
  const context = {};
  const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

  return (
    <Provider store={store}>
      <BrowserRouter context={context}>
        <Header />
        <Switch>
          <Route
            exact
            path='/'
          />
          <Route
            exact
            path='/user/:userID'
            component={User}
          />
        </Switch>
      </BrowserRouter>
    </Provider>
  )
};

export default Routes;