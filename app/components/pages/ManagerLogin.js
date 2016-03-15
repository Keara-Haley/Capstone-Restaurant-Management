define(function() {
    var React = require('react');
    var Router = require('react-router');

    var ManagerLogin = React.createClass({
        mixins: [Router.Navigation],

        login: function () {
            var userName = 'khaley';
            var password = 'manager';
            var inputUserName = document.getElementById("username-input");
            var inputPassword = document.getElementById("password-input");

            if(inputPassword.value === password && inputUserName.value === userName) {
                this.transitionTo('stationMenu');
            }
            else {
                inputUserName.value = "";
                inputPassword.value = "";
                alert("Wrong user name or password");
            }
        },

        render: function () {
            return (
                <div className="manager-login">
                    <div className="username">
                        <input id="username-input" type="text" placeholder="Username"/>
                    </div>
                    <div className="password">
                        <input id="password-input" type="password" placeholder="Password"/>
                    </div>
                    <button className="login-button" onClick={this.login}>Login</button>
                </div>
            );
        }
    });
    return ManagerLogin;
});