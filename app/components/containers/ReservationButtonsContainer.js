define(function() {
    'use strict';
    var React = require('react');
    var ReservationButton = require('./../buttons/ReservationButton');
    var ReservationsStore = require('./../stores/ReservationsStore');

    var ReservationButtonsContainer = React.createClass({
        getInitialState: function() {
            return {
                modalOpen: false,
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

        toggleModal: function() {
            var notModalState = !this.state.modalOpen;
            this.setState({
                modalOpen: notModalState
            });
        },

        saveReservation: function() {
            var name = document.getElementById('name').value;
            var numInParty = document.getElementById('num-in-party').value;
            var date = document.getElementById('date').value;
            var time = document.getElementById('time').value;
            var phoneNumber = document.getElementById('phone-number').value;
            var specialInstructions = document.getElementById('special-instructions').value;
            var data = [name, numInParty, date, time, phoneNumber, specialInstructions];
            ReservationsStore.createReservation(data);
            this.toggleModal();
        },

        getModalMarkup: function() {
            if(!this.state.modalOpen) {
                return null;
            }

            return (
                <div className="add-form-modal">
                    <form className="add-form">
                        <div className="name">
                            <label className="name-label w3-validate">NAME</label>
                            <input id="name" className="name-input" type="text" required/>
                        </div>
                        <div className="num-in-party">
                            <label className="num-in-party-label w3-validate">NUMBER IN PARTY</label>
                            <input id="num-in-party" className="num-in-party-input" type="number" min="1" placeholder="1" required/>
                        </div>
                        <div className="date">
                            <label className="date-label w3-validate">DATE</label>
                            <input id="date" className="date-input" type="datetime" placeholder="MM/DD/YYYY" required/>
                        </div>
                        <div className="time">
                            <label className="time-label w3-validate">TIME</label>
                            <input id="time" className="time-input" type="datetime" placeholder="H:MM" required/>
                        </div>
                        <div className="phone-number">
                            <label className="phone-number-label w3-validate">PHONE NUMBER</label>
                            <input id="phone-number" className="phone-number-input" type="text" placeholder="XXXXXXXXXX" required/>
                        </div>
                        <div className="special-instructions">
                            <label className="special-instructions-label w3-validate">SPECIAL INSTRUCTIONS</label>
                            <input id="special-instructions" className="special-instructions-input" type="text"/>
                        </div>
                    </form>
                    <button className="save-button" onClick={this.saveReservation}>SAVE</button>
                    <button className="cancel-button" onClick={this.toggleModal}>CANCEL</button>
                </div>
            );
        },
        
        render: function () {
            return (
                <div className="reservation-buttons">
                    {this.getModalMarkup()}
                    <ReservationButton key="take" buttonType="take" toggleModal={this.toggleModal} modalOpen={this.state.modalOpen}/>
                    <ReservationButton key="remove" buttonType="remove" modalOpen={this.state.modalOpen}/>
                    <ReservationButton key="seat" buttonType="seat" modalOpen={this.state.modalOpen}/>
                </div>
            );
        }
    });
    return ReservationButtonsContainer;
});