define(function() {
    'use strict';
    var React = require('react');
    var WaitlistButtonsContainer = require('./WaitlistButtonsContainer');
    var ReservationButtonsContainer = require('./ReservationButtonsContainer');
    var Tables = require('./Tables');

    var TablesContainer = React.createClass({

        render: function () {
            return (
                <div className="tables-container">
                    <ReservationButtonsContainer />
                    <Tables />
                    <WaitlistButtonsContainer />
                </div>
            );
        }
    });
    return TablesContainer;
});