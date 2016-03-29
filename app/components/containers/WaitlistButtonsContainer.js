define(function() {
    'use strict';
    var React = require('react');
    var WaitlistButton = require('./../buttons/WaitlistButton');

    var WaitlistButtonsContainer = React.createClass({

        render: function () {
            return (
                <div className="waitlist-buttons">
                    <WaitlistButton key="add" buttonType="add"/>
                    <WaitlistButton key="remove" buttonType="remove"/>
                    <WaitlistButton key="seat" buttonType="seat"/>
                </div>
            );
        }
    });
    return WaitlistButtonsContainer;
});