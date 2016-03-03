define(function() {
    'use strict';
    var React = require('react');
    var Router = require('react-router');

    var StationsMenu = React.createClass({
        mixins: [Router.Navigation],

        openStation: function (stationType) {
            this.transitionTo('station', {stationType: stationType});
        },

        render: function () {
            return (
                <div className="stations-menu">
                    <button className="host-station" onClick={() => this.openStation("host")}>Host Station</button>
                    <button className="server-station" onClick={() => this.openStation("server")}>Server Station</button>
                    <button className="kitchen-station" onClick={() => this.openStation("kitchen")}>Kitchen Station</button>
                </div>
            );
        }
    });
    return StationsMenu;
});