var React = require('react');
var Router = require('react-router');

var ManagerLogin = React.createClass({
    mixins: [Router.History],

    login: function() {
        this.history.pushState(null, "StationsMenu");
    },

    render: function() {
        return (
            <div className="manager-login">
                <div className="username">
                    <input type="text" placeholder="Username"/>
                </div>
                <div className="password">
                    <input type="password" placeholder="Password"/>
                </div>
                <button className="login-button" onClick={this.login}>Login</button>
            </div>
        );
    }
});

module.exports = ManagerLogin;