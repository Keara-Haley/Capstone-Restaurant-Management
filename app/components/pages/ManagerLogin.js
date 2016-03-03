define(function() {
    var React = require('react');
    var Router = require('react-router');

    var ManagerLogin = React.createClass({
        mixins: [Router.Navigation],

        login: function () {
            this.transitionTo('stationMenu');
        },

        render: function () {
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
    return ManagerLogin;
});