define(function() {
    'use strict';

    var React = require('react');
    var TablesSatList = require('./../lists/TablesSatList');

    var TablesSatContainer = React.createClass({
        render:function() {
            return (
                <div className="tables-sat-container">
                    <TablesSatList />
                </div>
            );
        }
    });

    return TablesSatContainer;
});