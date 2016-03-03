define(function(require) {
    'use strict';

    require('./assets/sass/restaurant.scss');

    var React = require('react');
    var Router = require('react-router');
    var Route = Router.Route, DefaultRoute = Router.DefaultRoute, RouteHandler = Router.RouteHandler;

    var StationsMenu = require('./components/pages/StationsMenu');
    var ManagerLogin = require('./components/pages/ManagerLogin');
    var Station = require('./components/pages/Station');
    var Header = require('./components/containers/Header');

    var App = React.createClass({
        mixins: [Router.State],

        render: function () {
            return (
                <div className="restaurant-app">
                    <Header />
                    <div className="container">
                        <RouteHandler key="app-key" />
                    </div>
                </div>
            );
        }
    });

    var routes = (
        <Route name="app" path="/" handler={App}>
            <DefaultRoute name="home" handler={ManagerLogin} />
            <Route name="station" path="Station/:stationType" handler={Station} />
            <Route name="stationMenu" path="Station-Menu" handler={StationsMenu} />
        </Route>
    );

    Router.run(routes, function(Handler, State) {
        React.render(<Handler params={State.params} />, document.body);
    });
});