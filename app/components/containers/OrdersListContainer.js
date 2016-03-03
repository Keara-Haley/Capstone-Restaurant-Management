define(function() {
    'use strict';

    var React = require('react');
    var OrdersList = require('./../lists/OrdersList');

    var OrdersListContainer = React.createClass({
        render: function() {
            return (
                <OrdersList />
            );
        }
    });
    return OrdersListContainer;
});