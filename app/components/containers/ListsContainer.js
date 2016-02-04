var React = require('react');
var ReservationsList = require('./../lists/ReservationsList');
var WaitlistsList = require('./../lists/WaitlistsList');

var ListContainer = React.createClass({

    render: function() {
        return (
            <div className="lists-container">
                <ReservationsList />
                <WaitlistsList />
            </div>
        );
    }
});

module.exports = ListContainer;