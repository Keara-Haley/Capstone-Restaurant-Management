define(function() {
    'use strict';
    var React = require('react');
    var WaitlistButton = require('./../buttons/WaitlistButton');
    var WaitlistsStore = require('./../stores/WaitlistsStore');

    var WaitlistButtonsContainer = React.createClass({
        getInitialState: function() {
            return {
                modalOpen: false,
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
        
        toggleModal: function() {
            var notModalState = !this.state.modalOpen;
            this.setState({
                modalOpen: notModalState
            });
        },

        saveWaitlist: function() {
            var name = document.getElementById('name').value;
            var numInParty = document.getElementById('num-in-party').value;
            var phoneNumber = document.getElementById('phone-number').value;
            var specialInstructions = document.getElementById('special-instructions').value;
            var data = [name, numInParty, phoneNumber, specialInstructions];
            WaitlistsStore.createWaitlist(data);
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
                        <div className="phone-number">
                            <label className="phone-number-label w3-validate">PHONE NUMBER</label>
                            <input id="phone-number" className="phone-number-input" type="text" placeholder="XXXXXXXXXX" required/>
                        </div>
                        <div className="special-instructions">
                            <label className="special-instructions-label w3-validate">SPECIAL INSTRUCTIONS</label>
                            <input id="special-instructions" className="special-instructions-input" type="text"/>
                        </div>
                    </form>
                    <button className="save-button" onClick={this.saveWaitlist}>SAVE</button>
                    <button className="cancel-button" onClick={this.toggleModal}>CANCEL</button>
                </div>
            );
        },

        render: function () {
            return (
                <div className="waitlist-buttons">
                    {this.getModalMarkup()}
                    <WaitlistButton key="add" buttonType="add" toggleModal={this.toggleModal} modalOpen={this.state.modalOpen}/>
                    <WaitlistButton key="remove" buttonType="remove" modalOpen={this.state.modalOpen}/>
                    <WaitlistButton key="seat" buttonType="seat" modalOpen={this.state.modalOpen}/>
                </div>
            );
        }
    });
    return WaitlistButtonsContainer;
});