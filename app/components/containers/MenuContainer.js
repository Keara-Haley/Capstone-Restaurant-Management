define(function() {
    'use strict';

    var React = require('react');

    var MenuButtonsContainer = require('./MenuButtonsContainer');
    var MenuList = require('./../lists/MenuList');

    var MenuContainer = React.createClass({
        render: function() {
            return (
                <div>
                    <MenuButtonsContainer />
                    <MenuList />
                </div>
            );
        }
    });

    return MenuContainer;
});