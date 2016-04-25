define(function() {
    'use strict';

    var React = require('react');
    var _ = require('lodash');
    var MenuItemDefinitions = require('./../../utils/definitions/MenuItemDefinitions');
    var OrdersStore = require('./../stores/OrdersStore');

    var Order = React.createClass({
        propTypes: {
            order: React.PropTypes.object.isRequired
        },
        
        orderUp: function() {
            OrdersStore.removeOrder(this.props.order.orderID);
        },
        
        getOrderText: function() {
            var orderText = [];
            _.map(this.props.order.food, function(foodItem) {
                var specInstr = foodItem.specInstr ? " - " + foodItem.specInstr : "";
                orderText.push(<span>{MenuItemDefinitions.menuItems.food[foodItem.menuItem].name + specInstr}</span>);
            });
            return orderText;
        },

        render: function() {
            return (
                <div className="order">
                    <div className="order-text">
                        {this.getOrderText()}
                    </div>
                    <div className="number-button">
                        <div className="order-number">
                            <span>#: {this.props.order.orderID}</span>
                        </div>
                        <div className="order-up">
                            <button onClick={this.orderUp}>ORDER UP</button>
                        </div>
                    </div>
                </div>
            );
        }
    });

    return Order;
});