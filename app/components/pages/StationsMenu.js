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
                    <div className="buttons-container">
                        <div className="station-button host">
                            <button onClick={() => this.openStation("host")}>Host Station</button>
                        </div>
                        <div className="station-button server">
                            <button onClick={() => this.openStation("server")}>Server Station</button>
                        </div>
                        <div className="station-button kitchen">
                            <button onClick={() => this.openStation("kitchen")}>Kitchen Station</button>
                        </div>
                    </div>
                    <div className="manager-info">
                        <div className="info-1-container">
                            <div className="info-1">
                                <h1 className="info-1-header">Information Section 1</h1>
                            </div>
                        </div>
                        <div className="info-2-container">
                            <div className="info-2">
                                <h1 className="info-2-header">Information Section 2</h1>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    });
    return StationsMenu;
});