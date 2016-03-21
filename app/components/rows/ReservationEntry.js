define(function() {
    'use strict';
    var React = require('react');

    var ReservationEntry = React.createClass({
        PropTypes: {
            entry: React.PropTypes.object.isRequired,
            onClick: React.PropTypes.func.isRequired,
            classname: React.PropTypes.string.isRequired
        },

        render: function () {
            var reservationText = this.props.entry.name + ": " + this.props.entry.numberInParty;
            return (
                <div className={this.props.classname} onClick={this.props.onClick.bind(null, this.props.entry.reservationId)}>{reservationText}</div>
            );
        }
    });
    return ReservationEntry;
});