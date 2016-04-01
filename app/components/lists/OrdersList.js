define(function() {
    'use strict';

    var React = require('react');
    var OrdersStore = require('./../stores/OrdersStore');
    var Order = require('./../rows/Order');
    var _ = require('lodash');

    var OrdersList = React.createClass({
        getInitialState: function() {
            return {
                orderList: null
            };
        },
        
        componentWillMount: function() {
            this.setState({
                orderList: OrdersStore.get()    
            });
            OrdersStore.addChangeListener(this.updateOrders);
        },
        
        updateOrders: function() {
            this.setState({
                orderList: OrdersStore.get()
            });
        },
        
        getOrderMarkup: function(order) {
            return (
                <Order key={order.orderID} order={order}/>
            );
        },
        
        getColumnOne: function() {
            var columnOneOrders = _.filter(this.state.orderList, function(order) {
                return order.restaurantHalf === 1;    
            });
            var self = this;
            var columnOneMarkup = [];
            if(columnOneOrders) {
                _.map(columnOneOrders, function(order) {
                    columnOneMarkup.push(self.getOrderMarkup(order));
                });
                return columnOneMarkup;
            }
        },
        
        getColumnTwo: function() {
            var columnTwoOrders = _.filter(this.state.orderList, function(order) {
                return order.restaurantHalf === 2;
            });
            var self = this;
            var columnTwoMarkup = [];
            if(columnTwoOrders) {
                _.map(columnTwoOrders, function(order) {
                    columnTwoMarkup.push(self.getOrderMarkup(order));
                });
                return columnTwoMarkup;
            }            
        },
        
        render: function() {
            return (
                <div className="orders-list">
                    <h1>ORDER LIST</h1>
                    <div className="order-columns">
                        <div className="order-column-1">
                            {this.getColumnOne()}
                        </div>
                        <div className="order-column-2">
                            {this.getColumnTwo()}
                        </div>
                    </div>
                </div>
            );
        }
    });

    return OrdersList;
});