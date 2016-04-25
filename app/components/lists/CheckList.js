define(function() {
    'use strict';

    var React = require('react');
    var CheckItem = require('./../rows/CheckItem');
    var OrderData = require('./../../utils/definitions/OrderDataDefinitions');
    var MenuItems = require('./../../utils/definitions/MenuItemDefinitions');
    var _ = require('lodash');

    var exampleCheck = OrderData.orderData[4];
    var drinkItems = MenuItems.menuItems.drinks;
    var foodItems = MenuItems.menuItems.food;

    var CheckList = React.createClass({
        propsTypes: {
            selectedButton: React.PropTypes.string.isRequired
        },

        removeItem: function(itemID) {
            //TODO figure out how to do the store for order data
            //TODO figure out how to remove the items from said store
            console.log(itemID);
        },

        getCheckItemsMarkup: function() {
            if(this.props.selectedButton === 'check') {
                var markup = [], drink, food, counter = 0;
                var self = this;

                _.map(exampleCheck.drinks, function (drinkID) {
                    drink = drinkItems[drinkID];
                    markup.push(
                        <div key={"drink " + drinkID} className={"check-item" + ((counter % 2) ? " odds" : "")}>
                            <span className="name">{drink.name}</span>
                            <span className="price">{drink.price.toFixed(2)}<i className="fa fa-times-circle" onClick={self.removeItem.bind(self, drinkID)}/></span>
                        </div>
                    );
                    counter++;
                });
                _.map(exampleCheck.food, function (foodItem) {
                    var foodItemID = foodItem.menuItem;
                    food = foodItems[foodItemID];
                    markup.push(
                        <div key={"food " + foodItemID}
                             className={"check-item" + ((counter % 2 === 1) ? " odds" : "")}>
                            <span className="name">{food.name}</span>
                            <span className="price">{food.price.toFixed(2)}<i className="fa fa-times-circle" onClick={self.removeItem.bind(self, foodItemID)}/></span>
                        </div>
                    );
                    counter++;
                });
                return markup;
            }
            return null;
        },

        getTotalCost: function() {
            if(this.props.selectedButton === 'check') {
                var totalCost = 0, drink, food, foodItemID;
                _.map(exampleCheck.drinks, function (drinkID) {
                    drink = drinkItems[drinkID];
                    totalCost += parseFloat(drink.price);
                });
                _.map(exampleCheck.food, function (foodItem) {
                    foodItemID = foodItem.menuItem;
                    food = foodItems[foodItemID];
                    totalCost += parseFloat(food.price);
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

        getPaymentMarkup: function() {
            if(this.props.selectedButton == 'payment') {
                return (
                    <div className="payment-buttons">
                        <button className="cash-button">CASH</button>
                        <button className="credit-button">CREDIT</button>
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
                    <div className="payment">
                        {this.getPaymentMarkup()}
                    </div>
                </div>
            );
        }
    });

    return CheckList;
});