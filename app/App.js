var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var routes = require('./config/routes');

require('./assets/sass/restaurant.scss');

ReactDOM.render(
    <Router>{routes}</Router>,
    document.getElementById('app')
);