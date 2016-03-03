define(function() {
    'use strict';
    var React = require('react');
    var WaitlistButton = require('./../buttons/WaitlistButton');

    var WaitlistButtonsContainer = React.createClass({

        render: function () {
            return (
                <div className="waitlist-buttons">
                    <WaitlistButton buttonType="add"/>
                    <WaitlistButton buttonType="remove"/>
                    <WaitlistButton buttonType="seat"/>
                </div>
            );
        }
    });
    return WaitlistButtonsContainer;
});