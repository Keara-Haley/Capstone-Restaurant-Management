define(function() {
    'use strict';

    var React = require('react');

    var TableSat = require('./../rows/TableSat');

    var TablesSatList = React.createClass({
        render: function() {
            return (
                <div className="tables-sat-list">
                    <TableSat />
                </div>
            );
        }
    });

    return TablesSatList;
});