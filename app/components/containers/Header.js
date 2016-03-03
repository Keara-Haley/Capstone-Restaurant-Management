define(function() {
    'use strict';

    var React = require('react');
    var Router = require('react-router');

    var Header = React.createClass({
        mixins: [Router.Navigation],

        goHome: function() {
            this.transitionTo('stationMenu');
        },

        render: function () {
            return (
                <div className="navbar">
                    <div className="name-logo">
                        <span className="logo" onClick={this.goHome}>RESTAURANT SOLUTIONS</span>
                    </div>
                </div>
            );
        }
    });

    return Header;
});