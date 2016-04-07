define(function() {
    'use strict';
    var React = require('react');
    var ReservationEntry = require('./../rows/ReservationEntry');
    var ReservationsStore = require('./../stores/ReservationsStore');
    var _ = require('lodash');

    var ReservationsList = React.createClass({
        getInitialState: function() {
            return {
                reservations: null
            };
        },

        componentWillMount: function() {
            this.setState({
                reservations: ReservationsStore.get()
            });
            ReservationsStore.addChangeListener(this.updateReservations);
        },

        updateReservations: function() {
            this.setState({
                reservations: ReservationsStore.get()
            });
        },

        selectReservation: function(reservationId) {
            var alreadySelectedReservation = _.find(this.state.reservations, ['selected', true]);
            var selectedReservation;
            if(alreadySelectedReservation) {
                if(alreadySelectedReservation.reservationId !== reservationId) {
                    selectedReservation = this.state.reservations[reservationId];
                    selectedReservation.selected = true;
                    ReservationsStore.setReservationData(reservationId, selectedReservation);
                }
                alreadySelectedReservation.selected = false;
                ReservationsStore.setReservationData(alreadySelectedReservation.reservationId, alreadySelectedReservation);
            }
            else {
                selectedReservation = this.state.reservations[reservationId];
                selectedReservation.selected = true;
                ReservationsStore.setReservationData(reservationId, selectedReservation);
            }
        },

        getReservationMarkup: function(reservation) {
            console.log(reservation);
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
                <div className="reservation-list">
                    <h1 className="reservations-header">RESERVATIONS</h1>
                    {this.getReservationsMarkup()}
                </div>
            );
        }
    });
    return ReservationsList;
});