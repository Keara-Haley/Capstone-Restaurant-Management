var React = require('react');
var ReservationEntry = require('./../rows/ReservationEntry');

var ReservationsList = React.createClass({
    render: function() {
        return (
            <div className="reservation-list">
                <h1 className="reservations-header">RESERVATIONS</h1>
                <ReservationEntry entry={{name: 'John Smith', numInParty: 4}} />
            </div>
        );
    }
});

module.exports = ReservationsList;