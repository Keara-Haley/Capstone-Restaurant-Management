define(function() {
    'use strict';

    var React = require('react');
    var MenuItemDefinition = require('./../../utils/definitions/MenuItemDefinitions');

    var foodCategories = MenuItemDefinition.menuItems.foodCategories;
    var foodItems = MenuItemDefinition.menuItems.food;
    var drinkCategories = MenuItemDefinition.menuItems.drinksCategories;
    var drinkItems = MenuItemDefinition.menuItems.drinks;

    var MenuList = React.createClass({
        render:function() {
            return (
                <div/>
            );
        }
    });

    return MenuList;
});