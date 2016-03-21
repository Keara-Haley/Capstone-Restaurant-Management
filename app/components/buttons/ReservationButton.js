define(function() {
    'use strict';
    var React = require('react');
    var TablesStore = require('./../stores/TablesStore');
    var ReservationsStore = require('./../stores/ReservationsStore');
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
                tables: null,
                reservations: null
            };
        },

        componentWillMount: function() {
            this.setState({
                tables: TablesStore.get(),
                reservations: ReservationsStore.get()
            });
            //this.state.tables = TablesStore.get();
            TablesStore.addChangeListener(this.updateTables);
            //this.state.reservations = ReservationsStore.get();
            ReservationsStore.addChangeListener(this.updateReservations);
        },

        updateTables: function() {
            this.setState({
                tables: TablesStore.get()
            });
        },

        updateReservations: function() {
            this.setState({
                reservations: ReservationsStore.get()
            });
        },

        takeReservation: function() {
            // TODO put in modal
        },

        removeReservation: function() {

        },

        seatReservation: function() {
            var selectedTable = _.find(this.state.tables, ['selected', true]);
            var selectedReservation = _.find(this.state.reservations, ['selected', true])
            if(!selectedTable || !selectedReservation) {
                alert("Please select a table and reservation");
            }
            else {
                if(selectedReservation.numberInParty > selectedTable.capacity) {
                    var seat = confirm("The number in the selected party is \ngreater than the selected table capacity.\nContinue?");

                    if (seat) {
                        // connect reservation to table
                        selectedReservation.tableId = selectedTable.tableId;
                        selectedReservation.selected = false;
                        selectedReservation.display = false;
                        selectedTable.party = selectedReservation;
                        selectedTable.selected = false;
                        selectedTable.occupied = true;
                        TablesStore.setTableData(selectedTable.tableId, selectedTable);
                        ReservationsStore.setReservationData(selectedReservation.reservationId, selectedReservation);
                    }
                }
                else {
                    selectedReservation.tableId = selectedTable.tableId;
                    selectedReservation.selected = false;
                    selectedReservation.display = false;
                    selectedTable.party = selectedReservation;
                    selectedTable.selected = false;
                    selectedTable.occupied = true;
                    TablesStore.setTableData(selectedTable.tableId, selectedTable);
                    ReservationsStore.setReservationData(selectedReservation.reservationId, selectedReservation);
                }
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