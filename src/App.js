import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';

import {UserIsAuthenticated , UserIsNotAuthenticated} from './help/auth';
import AppNavbar from "./components/layout/AppNavbar";
import Dashboard from "./components/layout/Dashboard";
import AddClients from "./components/clients/AddClients";
import ClientDetails from "./components/clients/ClientDetails";
import Login from "./components/auth/Login";
import Settings from "./components/settings/Settings";

import {Provider } from 'react-redux';
import store from './Store';


import './App.css';

class App extends Component {
  render()
  {
  return (
    <Provider store={store}>
    <Router>
    <div className="App">
    <AppNavbar/>
    <div className="container">
      <Switch>
        <Route exact path="/" component={UserIsAuthenticated(Dashboard)} />
        <Route exact path="/client/add" component={UserIsAuthenticated(AddClients)} />
        <Route exact path="/clients/:id" component={UserIsAuthenticated(ClientDetails)}/>
        <Route exact path="/login" component={UserIsNotAuthenticated(Login)}/>
        <Route exact path="/settings" component={UserIsAuthenticated(Settings)} />
      </Switch>
    </div>
    </div>
    </Router>
    </Provider>
  );
}
}

export default App;
