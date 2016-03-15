define(function() {
    'use strict';

    var React = require('react');

    var Order = React.createClass({
        propTypes: {
            orderNumber: React.PropTypes.number.isRequired,
            orderText: React.PropTypes.array.isRequired
        },

        render:function() {
            return (
                <div className="order" >
                    <h1>{this.props.orderNumber}</h1>
                    <div className="order-text">
                        <span>{this.props.orderText[0]}</span>
                        <span>{this.props.orderText[1]}</span>
                    </div>
                    <div className="order-up">
                        <button>ORDER UP</button>
                    </div>
                </div>
            );
        }
    });

    return Order;
});