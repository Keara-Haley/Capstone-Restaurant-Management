define(function() {
    'use strict';

    var React = require('react');

    var CheckItem = require('./../rows/CheckItem');

    var CheckList = React.createClass({
        render: function() {
            return (
                <CheckItem />
            );
        }
    });

    return CheckList;
});