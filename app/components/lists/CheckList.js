define(function() {
    'use strict';

    var React = require('react');
    var CheckItem = require('./../rows/CheckItem');
    var OrderData = require('./../../utils/definitions/OrderDataDefinitions');
    var MenuItems = require('./../../utils/definitions/MenuItemDefinitions');
    var _ = require('lodash');

    var exampleCheck = OrderData.orderData[4].seats;
    var drinkItems = MenuItems.menuItems.drinks;
    var foodItems = MenuItems.menuItems.food;

    var CheckList = React.createClass({
        propsTypes: {
            selectedButton: React.PropTypes.string.isRequired
        },

        getCheckItemsMarkup: function() {
            if(this.props.selectedButton === 'check') {
                var markup = [], drink, food, counter = 0;

                _.map(exampleCheck, function (seat) {
                    _.map(seat.drinks, function (drinkID) {
                        drink = drinkItems[drinkID];
                        markup.push(
                            <div key={"drink " + drinkID} className={"check-item" + ((counter % 2) ? " odds" : "")}>
                                <span key={"drink name" + drinkID} className="name">{drink.name}</span>
                                <span key={"drink price" + drinkID} className="price">{drink.price.toFixed(2)}</span>
                            </div>
                        );
                        counter++;
                    });
                    _.map(seat.food, function (foodItem) {
                        var foodItemID = foodItem.menuItem;
                        food = foodItems[foodItemID];
                        markup.push(
                            <div key={"food " + foodItemID}
                                 className={"check-item" + ((counter % 2 === 1) ? " odds" : "")}>
                                <span key={"food name" + foodItemID} className="name">{food.name}</span>
                                <span key={"food price" + foodItemID} className="price">{food.price.toFixed(2)}</span>
                            </div>
                        );
                        counter++;
                    });
                });
                return markup;
            }
            return null;
        },

        getTotalCost: function() {
            if(this.props.selectedButton === 'check') {
                var totalCost = 0, drink, food, foodItemID;
                _.map(exampleCheck, function (seat) {
                    _.map(seat.drinks, function (drinkID) {
                        drink = drinkItems[drinkID];
                        totalCost += parseFloat(drink.price);
                    });
                    _.map(seat.food, function (foodItem) {
                        foodItemID = foodItem.menuItem;
                        food = foodItems[foodItemID];
                        totalCost += parseFloat(food.price);
                    });
                });
                totalCost = totalCost.toFixed(2);

                return (
                    <div className="total-cost">
                        <span className="label">TOTAL</span>
                        <span className="cost">{totalCost}</span>
                    </div>
                );
            }
            return null;
        },

        render: function() {
            return (
                <div className="check-list">
                    <div className="check-items">
                        {this.getCheckItemsMarkup()}
                    </div>
                    {this.getTotalCost()}
                </div>
            );
        }
    });

    return CheckList;
});