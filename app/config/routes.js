var React = require('react');
var Main = require('../components/Main');
var ManagerLogin = require('../components/ManagerLogin');
var StationsMenu = require('../components/StationsMenu');
var Station = require('../components/Station');
var Router = require('react-router');
var Route = Router.Route;
var IndexRoute = Router.IndexRoute;

module.exports = (
    <Route path="/" component={Main}>
        <Route path="StationsMenu" component={StationsMenu}>
            <Route path="Station/:StationType" component={Station} />
        </Route>
        <IndexRoute component={ManagerLogin} />
    </Route>
);