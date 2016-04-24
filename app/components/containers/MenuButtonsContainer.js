define(function() {
    'use strict';

    var React = require('react');

    var MenuButtonsContainer = React.createClass({
        propTypes: {
            selectedButton: React.PropTypes.string.isRequired,
            selectDrinksButton: React.PropTypes.func.isRequired,
            selectFoodButton: React.PropTypes.func.isRequired
        },
        
        getDrinksButton: function() {
            var classname = "menu-button drinks";
            if(this.props.selectedButton === 'drinks') {
                classname += " selected";
            }
            return (
                <div className={classname} onClick={this.props.selectDrinksButton}>DRINKS</div>
            );
        },

        getFoodButton: function() {
            var classname = "menu-button food";
            if(this.props.selectedButton === 'food') {
                classname += " selected";
            }
            return (
                <div className={classname} onClick={this.props.selectFoodButton}>FOOD</div>
            );
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