define(function() {
    'use strict';

    var React = require('react');

    var CheckButtonsContainer = React.createClass({
        propTypes: {
            selectedButton: React.PropTypes.string.isRequired,
            selectCheckButton: React.PropTypes.func.isRequired,
            selectCheckPaymentButton: React.PropTypes.func.isRequired
        },

        getCheckButton: function() {
            var classname = "check-button check";
            if(this.props.selectedButton === 'check') {
                classname += " selected";
            }

            return(
                <div className={classname} onClick={this.props.selectCheckButton}>CHECK</div>
            );
        },

        getCheckPaymentButton: function() {
            var classname = "check-button payment";
            if(this.props.selectedButton === 'payment') {
                classname += " selected";
            }

            return (
                <div className={classname} onClick={this.props.selectCheckPaymentButton}>PAYMENT</div>
            );
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