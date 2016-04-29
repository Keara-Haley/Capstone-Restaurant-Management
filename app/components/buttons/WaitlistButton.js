define(function() {
    'use strict';
    var React = require('react');
    var TablesStore = require('./../stores/TablesStore');
    var WaitlistsStore = require('./../stores/WaitlistsStore');

    var WaitlistButton = React.createClass({
        PropTypes: {
            buttonType: React.PropTypes.string.isRequired,
            toggleModal: React.PropTypes.func,
            modalOpen: React.PropTypes.bool.isRequired
        },

        getInitialState: function() {
            return {
                tables: null,
                waitlists: null
            };
        },

        componentWillMount: function() {
            this.setState({
                tables: TablesStore.get(),
                waitlists: WaitlistsStore.get()
            });
            //this.state.tables = TablesStore.get();
            TablesStore.addChangeListener(this.updateTables);
            //this.state.reservations = ReservationsStore.get();
            WaitlistsStore.addChangeListener(this.updateWaitlists);
        },

        updateTables: function() {
            this.setState({
                tables: TablesStore.get()
            });
        },

        updateWaitlists: function() {
            this.setState({
                waitlists: WaitlistsStore.get()
            });
        },

        takeWaitlist: function() {
            if(!this.props.modalOpen) {
                this.props.toggleModal();
            }
        },

        removeWaitlist: function() {
            if(!this.props.modalOpen) {
                var selectedWaitlist = _.find(this.state.waitlists, ['selected', true]);
                if (!selectedWaitlist) {
                    alert("Please select a waitlist entry.");
                }
                else {
                    var remove = confirm("Are you sure you want to remove this waitlist entry?");
                    if (remove) {
                        WaitlistsStore.deleteWaitlist(selectedWaitlist.waitlistId);
                    }
                }
            }
        },

        seatWaitlist: function() {
            if(!this.props.modalOpen) {
                var selectedTable = _.find(this.state.tables, ['selected', true]);
                var selectedWaitlist = _.find(this.state.waitlists, ['selected', true]);
                if (!selectedTable || !selectedWaitlist) {
                    alert("Please select a table and waitlist entry");
                }
                else {
                    if (selectedWaitlist.numberInParty > selectedTable.capacity) {
                        var seat = confirm("The number in the selected party is greater than the selected table capacity.\nContinue?");

                        if (seat) {
                            // connect reservation to table
                            selectedWaitlist.tableId = selectedTable.tableId;
                            selectedWaitlist.selected = false;
                            selectedWaitlist.display = false;
                            selectedTable.party = selectedWaitlist;
                            selectedTable.selected = false;
                            selectedTable.occupied = true;
                            TablesStore.setTableData(selectedTable.tableId, selectedTable);
                            WaitlistsStore.setWaitlistData(selectedWaitlist.reservationId, selectedWaitlist);
                        }
                    }
                    else {
                        selectedWaitlist.tableId = selectedTable.tableId;
                        selectedWaitlist.selected = false;
                        selectedWaitlist.display = false;
                        selectedTable.party = selectedWaitlist;
                        selectedTable.selected = false;
                        selectedTable.occupied = true;
                        TablesStore.setTableData(selectedTable.tableId, selectedTable);
                        WaitlistsStore.setWaitlistData(selectedWaitlist.reservationId, selectedWaitlist);
                    }
                }
            }
        },
        
        render: function () {
            var classes,
                buttonText,
                clickFunction;
            switch (this.props.buttonType) {
                case 'add':
                    classes = 'add-waitlist-button';
                    buttonText = 'ADD WAITLIST';
                    clickFunction = this.takeWaitlist;
                    break;
                case 'remove':
                    classes = 'remove-waitlist-button';
                    buttonText = 'REMOVE WAITLIST';
                    clickFunction = this.removeWaitlist;
                    break;
                case 'seat':
                    classes = 'seat-waitlist-button';
                    buttonText = 'SEAT WAITLIST';
                    clickFunction = this.seatWaitlist;
                    break;
            }
            return (
                <div className={classes}>
                    <button onClick={clickFunction}>{buttonText}</button>
                </div>
            );
        }
    });
    return WaitlistButton;
});