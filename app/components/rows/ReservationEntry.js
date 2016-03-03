define(function() {
    'use strict';
    var React = require('react');

    var ReservationEntry = React.createClass({
        PropTypes: {
            entry: React.PropTypes.object.isRequired
        },

        render: function () {
            var reservationText = this.props.entry.name + ": " + this.props.entry.numInParty;
            return (
                <div className="reservation-entry">{reservationText}</div>
            );
        }
    });
    return ReservationEntry;
});