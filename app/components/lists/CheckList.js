define(function() {
    'use strict';

    var React = require('react');
    var CheckItem = require('./../rows/CheckItem');
    var OrderData = require('./../../utils/definitions/OrderDataDefinitions');
    var MenuItems = require('./../../utils/definitions/MenuItemDefinitions');
    var TablesStore = require('./../stores/TablesStore');
    var OrdersStore = require('./../stores/OrdersStore');
    var _ = require('lodash');

    var exampleCheck = OrderData.orderData[4];
    var drinkItems = MenuItems.menuItems.drinks;
    var foodItems = MenuItems.menuItems.food;

    var CheckList = React.createClass({
        propsTypes: {
            selectedButton: React.PropTypes.string.isRequired
        },
        
        getInitialState: function() {
            return {
                tables: null,
                orders: null
            };
        },

        componentWillMount: function() {
            this.setState({
                tables: TablesStore.get(),
                orders: OrdersStore.get()
            });
            TablesStore.addChangeListener(this.updateTables);
            OrdersStore.addChangeListener(this.updateOrders);
        },
        
        updateTables: function() {
            this.setState({
                tables: TablesStore.get()    
            });  
        },

        updateOrders: function() {
            this.setState({
                orders: OrdersStore.get()
            });
        },

        removeItem: function(itemID) {
            //TODO figure out how to do the store for order data
            //TODO figure out how to remove the items from said store
        },

        getCheckItemsMarkup: function() {
            var selectedTable = _.find(this.state.tables, ['selected', true]);
            if(this.props.selectedButton === 'check' && selectedTable) {
                var markup = [], drink, food, counter = 0;
                var self = this;

                var order = this.state.orders[selectedTable.orderID];
                _.map(order.drinks, function (drink) {
                    var drinkID = drink.itemID;
                    //drink = drinkItems[drinkID];
                    markup.push(
                        <div key={"drink " + drinkID + Math.random()} className={"check-item" + ((counter % 2) ? " odds" : "")}>
                            <span className="name">{drink.name}</span>
                            <span className="price">{drink.price.toFixed(2)}<i className="fa fa-times-circle" onClick={self.removeItem.bind(self, drinkID)}/></span>
                        </div>
                    );
                    counter++;
                });
                _.map(order.food, function (foodItem) {
                    var foodItemID = foodItem.itemID;
                    //food = foodItems[foodItemID];
                    markup.push(
                        <div key={"food " + foodItemID + Math.random()}
                             className={"check-item" + ((counter % 2 === 1) ? " odds" : "")}>
                            <span className="name">{foodItem.name}</span>
                            <span className="price">{foodItem.price.toFixed(2)}<i className="fa fa-times-circle" onClick={self.removeItem.bind(self, foodItemID)}/></span>
                        </div>
                    );
                    counter++;
                });
                return markup;
            }
            return null;
        },

        getTotalCost: function() {
            var selectedTable = _.find(this.state.tables, ['selected', true]);
            var totalCost = 0.00, drink, food, foodItemID;
            if(this.props.selectedButton === 'check' && selectedTable) {
                var order = this.state.orders[selectedTable.orderID];
                _.map(order.drinks, function (drink) {
                    //drink = drinkItems[drinkID];
                    totalCost += parseFloat(drink.price);
                });
                _.map(order.food, function (foodItem) {
                    //foodItemID = foodItem.menuItem;
                    //food = foodItems[foodItemID];
                    totalCost += parseFloat(foodItem.price);
                });
            }

            if(this.props.selectedButton === 'check') {
                return (
                    <div className="total-cost">
                        <span className="label">TOTAL</span>
                        <span className="cost">${totalCost.toFixed(2)}</span>
                    </div>
                );
            }
            return null;
        },
        
        payCash: function() {
            
        },
        
        payCredit: function() {
            
        },

        getPaymentButtonsMarkup: function() {
            if(this.props.selectedButton == 'payment') {
                return (
                    <div className="payment-buttons">
                        <button className="cash-button" onClick={this.payCash}>CASH</button>
                        <button className="credit-button" onClick={this.payCredit}>CREDIT</button>
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
                        {this.getPaymentButtonsMarkup()}
                    </div>
                </div>
            );
        }
    });

    return CheckList;
});