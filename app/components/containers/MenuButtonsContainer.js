define(function() {
    'use strict';

    var React = require('react');

    var MenuButtonsContainer = React.createClass({
        getInitialState: function() {
            return {
                selectedButton: 'drinks'
            };
        },

        getDrinksButton: function() {
            var classname = "menu-button drinks";
            if(this.state.selectedButton === 'drinks') {
                classname += " selected";
            }
            return (
                <div className={classname} onClick={this.selectDrinksButton}>DRINKS</div>
            );
        },

        selectDrinksButton: function() {
            this.setState({
                selectedButton: 'drinks'
            });
        },

        getFoodButton: function() {
            var classname = "menu-button food";
            if(this.state.selectedButton === 'food') {
                classname += " selected";
            }
            return (
                <div className={classname} onClick={this.selectFoodButton}>FOOD</div>
            );
        },

        selectFoodButton: function() {
            this.setState({
                selectedButton: 'food'
            });
        },

        render: function() {
            return (
                <div className="menu-buttons">
                    {this.getDrinksButton()}
                    {this.getFoodButton()}
                </div>
            );
        }
    });

    return MenuButtonsContainer;
});