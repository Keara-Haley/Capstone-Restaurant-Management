define(function() {
    'use strict';
    var React = require('react');

    var ReservationButton = React.createClass({
        propTypes: {
            buttonType: React.PropTypes.string.isRequired
        },

        render: function () {
            var classes,
                buttonText;
            switch (this.props.buttonType) {
                case 'take':
                    classes = 'take-reservation-button';
                    buttonText = 'TAKE RESERVATION';
                    break;
                case 'remove':
                    classes = 'remove-reservation-button';
                    buttonText = 'REMOVE RESERVATION';
                    break;
                case 'seat':
                    classes = 'seat-reservation-button';
                    buttonText = 'SEAT RESERVATION';
                    break;
            }
            return (
                <div className={classes}>
                    <button>{buttonText}</button>
                </div>
            );
        }
    });
    return ReservationButton;
});