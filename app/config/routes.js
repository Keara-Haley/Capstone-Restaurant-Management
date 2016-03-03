var React = require('react');
var Main = require('../components/Main');
var ManagerLogin = require('./components/pages/ManagerLogin');
var Station = require('./components/pages/Station');
var Router = require('react-router');
var Route = Router.Route;
var IndexRoute = Router.IndexRoute;

module.exports = (
    <Route path="/" component={Main}>
        <Route path="Station" component={Station}/>
        <IndexRoute component={ManagerLogin} />
    </Route>
);