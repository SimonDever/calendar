import * as React from 'react';
import { Router, Route, IndexRoute, RouterState } from 'react-router';
import history from './history';
import Home from './pages/home';
import Blank from './pages/blank';
import SuiExamplePage from './pages/sui-example';

const Routes = (
  <Router history={history}>
    <Route path="/" component={Home}/>
    <Route path="/sui" component={SuiExamplePage} />
    <Route path="*" component={Blank}/>
  </Router>
);

export default Routes;