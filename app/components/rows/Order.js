define(function() {
    'use strict';

    var React = require('react');

    var Order = React.createClass({
        render:function() {
            return (
                <div className="order" >
                    <span>Cesar Salad, Side Fries</span>
                </div>
            );
        }
    });

    return Order;
});