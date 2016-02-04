var React = require('react');
var ReservationButton = require('./../buttons/ReservationButton');

var ReservationButtonsContainer = React.createClass({

    render: function() {
        return (
            <div className="reservation-buttons">
                <ReservationButton key="take" buttonType="take"/>
                <ReservationButton key="remove" buttonType="remove"/>
                <ReservationButton key="seat" buttonType="seat"/>
            </div>
        );
    }
});

module.exports = ReservationButtonsContainer;