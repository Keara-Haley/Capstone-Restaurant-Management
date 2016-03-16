define(function() {
    'use strict';

    var React = require('react');

    var Order = require('./../rows/Order');

    var OrdersList = React.createClass({
        render:function() {
            return (
                <div className="orders-list">
                    <h1>ORDER LIST</h1>
                    <div className="order-columns">
                        <div className="order-column-1">
                            <Order orderNumber={1} orderText={["Cesar Salad, Side Fries", "Cheeseburger no onions"]}/>
                        </div>
                        <div className="order-column-2">
                            <Order orderNumber={2} orderText={["Burger, Side Fries", "Mac and Cheese"]}/>
                        </div>
                    </div>
                </div>
            );
        }
    });

    return OrdersList;
});