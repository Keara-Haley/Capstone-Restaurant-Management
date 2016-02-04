var React = require('react');
//var Constants = require('utils/Constants');
var Router = require('react-router');

var StationsMenu = React.createClass({
    mixins: [Router.History],

    openStation: function() {
        this.history.pushState(null, "Station");
    },

    render: function() {
        return (
            <div className="stations-menu">
                <button className="host-station" onClick={this.openStation()}>Host Station</button>
                <button className="server-station">Server Station</button>
                <button className="kitchen-station">Kitchen Station</button>
            </div>
        );
    }
});

module.exports = StationsMenu;