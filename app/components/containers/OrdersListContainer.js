define(function() {
    'use strict';

    var React = require('react');
    var OrdersList = require('./../lists/OrdersList');

    var OrdersListContainer = React.createClass({
        render: function() {
            return (
                <div className="orders-list-container">
                    <OrdersList />
                </div>
            );
        }
    });
    return OrdersListContainer;
});