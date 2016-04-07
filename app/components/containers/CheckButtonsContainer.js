define(function() {
    'use strict';

    var React = require('react');

    var CheckButtonsContainer = React.createClass({
        getInitialState: function() {
            return {
                selectedButton: 'check'
            };
        },

        getCheckButton: function() {
            var classname = "check-button check";
            if(this.state.selectedButton === 'check') {
                classname += " selected";
            }

            return(
                <div className={classname} onClick={this.selectCheckButton}>CHECK</div>
            );
        },

        selectCheckButton: function() {
            this.setState({
                selectedButton: 'check'
            });
        },

        getCheckPaymentButton: function() {
            var classname = "check-button payment";
            if(this.state.selectedButton === 'payment') {
                classname += " selected";
            }

            return (
                <div className={classname} onClick={this.selectCheckPaymentButton}>PAYMENT</div>
            );
        },

        selectCheckPaymentButton: function() {
            this.setState({
                selectedButton: 'payment'
            });
        },

        render:function() {
            return (
                <div className="check-buttons">
                    {this.getCheckButton()}
                    {this.getCheckPaymentButton()}
                </div>
            );
        }
    });

    return CheckButtonsContainer;
});