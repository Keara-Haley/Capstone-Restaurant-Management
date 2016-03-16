define(function() {
    'use strict';

    var React = require('react');

    var MenuItem = require('./../rows/MenuItem');

    var MenuList = React.createClass({
        render:function() {
            return (
                <MenuItem />
            );
        }
    });

    return MenuList;
});