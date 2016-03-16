define(function() {
    'use strict';

    var React = require('react');

    var CheckButton = require('./../buttons/CheckButton');
    var CheckPaymentButton = require('./../buttons/CheckPaymentButton');

    var CheckButtonsContainer = React.createClass({
        render:function() {
            return (
                <div>
                    <CheckButton />
                    <CheckPaymentButton />
                </div>
            );
        }
    });

    return CheckButtonsContainer;
});