define(function() {
    'use strict';

    var React = require('react');

    var MenuDrinksButton = require('./../buttons/MenuDrinksButton');
    var MenuFoodButton = require('./../buttons/MenuFoodButton');

    var MenuButtonsContainer = React.createClass({
        render: function() {
            return (
                <div>
                    <MenuDrinksButton />
                    <MenuFoodButton />
                </div>
            );
        }
    });

    return MenuButtonsContainer;
});