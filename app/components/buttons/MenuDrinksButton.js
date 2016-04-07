define(function() {
    'use strict';

    var React = require('react');

    var MenuDrinksButton = React.createClass({
        getInitialState: function() {
            return {
                selectedButton
            }
        },
        
        selectButton: function() {
            
        },
        
        render: function() {
            return (
                <div className="menu-drinks-button" onClick={}>DRINKS</div>
            );
        }
    });

    return MenuDrinksButton;
});