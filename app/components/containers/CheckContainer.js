define(function() {
    'use strict';

    var React = require('react');

    var CheckButtonsContainer = require('./CheckButtonsContainer');
    var CheckList = require('./../lists/CheckList');

    var CheckContainer = React.createClass({
        getInitialState: function() {
            return {
                selectedButton: 'check'
            };
        },

        selectCheckButton: function() {
            this.setState({
                selectedButton: 'check'
            });
        },

        selectCheckPaymentButton: function() {
            this.setState({
                selectedButton: 'payment'
            });
        },
        
        render:function() {
            return (
                <div className="check-container">
                    <CheckButtonsContainer 
                        selectedButton={this.state.selectedButton} 
                        selectCheckButton={this.selectCheckButton} 
                        selectCheckPaymentButton={this.selectCheckPaymentButton} />
                    <CheckList selectedButton={this.state.selectedButton}/>
                </div>
            );
        }
    });

    return CheckContainer;
});