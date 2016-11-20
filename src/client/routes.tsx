import * as React from 'react';
import { Router, Route, IndexRoute, RouterState } from 'react-router';
import history from './history';
import Home from './pages/home';
import Blank from './pages/blank';
import Calendar from './pages/calendar';
import LoginMobile from './pages/login_mobile';

const Routes = (
  <Router history={history}>
    <Route path="/" component={Home}/>
    <Route path="/calendar/*" component={Calendar}/>
    <Route path="/login_mobile" component={LoginMobile}/>
    <Route path="*" component={Blank}/>
  </Router>
);

export default Routes;
