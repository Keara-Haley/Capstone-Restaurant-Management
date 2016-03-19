define(function() {
    'use strict';
    var React = require('react');
    var TablesStore = require('./../stores/TablesStore');
    var _ = require('lodash');

    var ReservationButton = React.createClass({
        propTypes: {
            buttonType: React.PropTypes.string.isRequired
        },

        getInitialState: function() {
            return {
                sections: [
                    {
                        sectionId: 1,
                        lastSatOrder: 1
                    },
                    {
                        sectionId: 2,
                        lastSatOrder: 3
                    },
                    {
                        sectionId: 3,
                        lastSatOrder: 2
                    }
                ],
                tables: null
            };
        },

        componentWillMount: function() {
            this.state.tables = TablesStore.get();
            TablesStore.addChangeListener(this.updateTables);
        },

        updateTables: function() {
            this.state.tables = TablesStore.get();
        },

        takeReservation: function() {
            // TODO put in modal
        },

        removeReservation: function() {

        },

        seatReservation: function() {
            var alreadySelectedTable = _.find(this.state.tables, ['selected', true]);
            if(!alreadySelectedTable) {
                alert("Please select a table");
            }
            else {
                // connect reservation to table
                console.log(alreadySelectedTable.tableId);
            }
        },

        render: function () {
            var classes,
                buttonText,
                clickFunction;
            switch (this.props.buttonType) {
                case 'take':
                    classes = 'take-reservation-button';
                    buttonText = 'TAKE RESERVATION';
                    clickFunction = this.takeReservation;
                    break;
                case 'remove':
                    classes = 'remove-reservation-button';
                    buttonText = 'REMOVE RESERVATION';
                    clickFunction = this.removeReservation;
                    break;
                case 'seat':
                    classes = 'seat-reservation-button';
                    buttonText = 'SEAT RESERVATION';
                    clickFunction = this.seatReservation;
                    break;
            }
            return (
                <div className={classes}>
                    <button onClick={clickFunction}>{buttonText}</button>
                </div>
            );
        }
    });
    return ReservationButton;
});