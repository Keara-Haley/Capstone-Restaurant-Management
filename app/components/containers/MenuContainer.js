define(function() {
    'use strict';

    var React = require('react');

    var MenuButtonsContainer = require('./MenuButtonsContainer');
    var MenuList = require('./../lists/MenuList');

    var MenuContainer = React.createClass({
        render: function() {
            return (
                <div className="menu-container">
                    <MenuButtonsContainer />
                    <MenuList />
                </div>
            );
        }
    });

    return MenuContainer;
});