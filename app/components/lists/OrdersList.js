define(function() {
    'use strict';

    var React = require('react');

    var Order = require('./../rows/Order');

    var OrdersList = React.createClass({
        render:function() {
            return (
                <Order />
            );
        }
    });

    return OrdersList;
});