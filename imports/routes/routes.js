import React from 'react';
import {Meteor} from 'meteor/meteor';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import Login from '../ui/Login';
import Link from '../ui/Link';
import Signup from '../ui/Signup';
import NotFound from '../ui/NotFound';

const history = createHistory();

const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];

export const onAuthChange = (isAuthenticated) => {
  const pathname = location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);
  if (isUnauthenticatedPage && isAuthenticated) {
    history.replace('/links');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    history.replace('/');
  }
};

export const routes = (
  <Router history={history}>
    <Switch>
      <Route exact path="/" render={props => (
          Meteor.userId() ? (
            <Redirect to="/links"/>
          ) : (
            <Login {...props} />
          )
        )}/>
      <Route exact path="/signup" render={props => (
          Meteor.userId() ? (
            <Redirect to="/links"/>
          ) : (
            <Signup {...props} />
          )
        )}/>
      <Route exact path="/links" render={props => (
          !Meteor.userId() ? (
            <Redirect to="/"/>
          ) : (
            <Link {...props} />
          )
        )}/>
      <Route component={NotFound}/>
    </Switch>
</Router>
);
