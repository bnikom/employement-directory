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

import Header from './components/Header';
import Home from './components/Home';
import Employee from './components/Employee';
import reducers from './reducers';

const App = () => {
  const context = {};
  const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));

  // client-side routing for application
  return (
    <Provider store={store}>
      <BrowserRouter context={context}>
        <Header />
        <Switch>
          <Route
            exact
            path='/employee/:employeeID'
            component={Employee}
          />
          <Route
            exact
            path='/'
            component={Home}
          />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
