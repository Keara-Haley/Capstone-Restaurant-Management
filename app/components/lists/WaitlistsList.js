define(function() {
    'use strict';
    var React = require('react');
    var WaitlistEntry = require('./../rows/WaitlistEntry');
    var WaitlistsStore = require('./../stores/WaitlistsStore');

    var WaitlistsList = React.createClass({
        getInitialState: function() {
            return {
                waitlists: null
            };
        },

        componentWillMount: function() {
            this.setState({
                waitlists: WaitlistsStore.get()
            });
            WaitlistsStore.addChangeListener(this.updateWaitlists);
        },

        updateWaitlists: function() {
            this.setState({
                waitlists: WaitlistsStore.get()
            });
        },

        selectWaitlist: function(waitlistId) {
            var alreadySelectedWaitlist = _.find(this.state.waitlists, ['selected', true]);
            var selectedWaitlist;
            if(alreadySelectedWaitlist) {
                if(alreadySelectedWaitlist.waitlistId !== waitlistId) {
                    selectedWaitlist = this.state.waitlists[waitlistId];
                    selectedWaitlist.selected = true;
                    WaitlistsStore.setWaitlistData(waitlistId, selectedWaitlist);
                }
                alreadySelectedWaitlist.selected = false;
                WaitlistsStore.setWaitlistData(alreadySelectedWaitlist.waitlistId, alreadySelectedWaitlist);
            }
            else {
                selectedWaitlist = this.state.waitlists[waitlistId];
                selectedWaitlist.selected = true;
                WaitlistsStore.setWaitlistData(waitlistId, selectedWaitlist);
            }
        },

        getReservationMarkup: function(reservation) {
            if(!reservation.display){
                return null;
            }
            var classname = "reservation ";
            if(reservation.selected) {
                classname = classname + "selected";
            }
            return(
                <ReservationEntry key={reservation.reservationId} classname={classname} entry={reservation} onClick={this.selectReservation}/>
            );
        },

        getReservationsMarkup: function() {
            var reservations = [];
            var self = this;
            _.forEach(this.state.reservations, function(reservation) {
                reservations.push(self.getReservationMarkup(reservation));
            });
            return reservations;
        },

        render: function () {
            return (
                <div className="waitlist-list">
                    <h1 className="waitlist-header">WAITLISTS</h1>
                    <WaitlistEntry entry={{name: 'Bob Johnson', numInParty: 2}}/>
                </div>
            );
        }
    });
    return WaitlistsList;
});