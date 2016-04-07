define(function() {
    'use strict';
    var React = require('react');
    var WaitlistButtonsContainer = require('./WaitlistButtonsContainer');
    var ReservationButtonsContainer = require('./ReservationButtonsContainer');
    var Tables = require('./Tables');

    var TablesContainer = React.createClass({
        propTypes: {
            includeButtons: React.PropTypes.bool.isRequired
        },

        render: function () {
            var reservationButtons, waitlistButtons;

            if(this.props.includeButtons) {
                reservationButtons = <ReservationButtonsContainer />;
                waitlistButtons = <WaitlistButtonsContainer />;
            }

            return (
                <div className="tables-container">
                    {reservationButtons}
                    <Tables />
                    {waitlistButtons}
                </div>
            );
        }
    });
    return TablesContainer;
});