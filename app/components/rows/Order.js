define(function() {
    'use strict';

    var React = require('react');
    var _ = require('lodash');
    var MenuItemDefinitions = require('./../../utils/definitions/MenuItemDefinitions');

    var Order = React.createClass({
        propTypes: {
            order: React.PropTypes.object.isRequired
        },
        
        orderUp: function() {
                
        },

        getSeatMarkup: function(seat) {
            var orderTextMarkup = [];
            _.map(seat.food, function(foodItem) {
                var specInstr = foodItem.specInstr ? " - " + foodItem.specInstr : "";
                orderTextMarkup.push(<span>{MenuItemDefinitions.menuItems.food[foodItem.menuItem].name + specInstr}</span>)
            });
            return orderTextMarkup;
        },
        
        getOrderText: function() {
            var orderText = [];
            var self = this;
            _.map(this.props.order.seats, function(seat) {
                orderText.push(self.getSeatMarkup(seat));
            });
            return orderText;
        },

        render: function() {
            return (
                <div className="order">
                    <h1>{this.props.order.orderID}</h1>
                    <div className="order-text">
                        {this.getOrderText()}
                    </div>
                    <div className="order-up">
                        <button onClick={this.orderUp}>ORDER UP</button>
                    </div>
                </div>
            );
        }
    });

    return Order;
});