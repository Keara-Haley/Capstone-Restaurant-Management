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
                var dates = _.split(reservation.dateTime, '/');
                dates[3] = dates[2].substring(5);
                dates[2] = dates[2].substring(0, 4);

                var today = new Date();
                var todayYear = today.getFullYear();
                var todayMonth = today.getMonth() + 1;
                var todayDay = today.getDate();

                if((todayYear === parseInt(dates[2])) && (todayMonth === parseInt(dates[0])) && (todayDay === parseInt(dates[1]))) {
                    reservations.push(self.getReservationMarkup(reservation));
                }
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