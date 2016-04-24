define(function() {
    'use strict';

    var React = require('react');

    var MenuButtonsContainer = require('./MenuButtonsContainer');
    var MenuList = require('./../lists/MenuList');

    var MenuContainer = React.createClass({
        getInitialState: function() {
            return {
                selectedButton: 'drinks'
            };
        },

        selectDrinksButton: function() {
            this.setState({
                selectedButton: 'drinks'
            });
        },

        selectFoodButton: function() {
            this.setState({
                selectedButton: 'food'
            });
        },

        render: function() {
            return (
                <div className="menu-container">
                    <MenuButtonsContainer
                        selectedButton={this.state.selectedButton}
                        selectDrinksButton={this.selectDrinksButton}
                        selectFoodButton={this.selectFoodButton} />
                    <MenuList selectedButton={this.state.selectedButton}/>
                </div>
            );
        }
    });

    return MenuContainer;
});