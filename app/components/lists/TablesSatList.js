define(function() {
    'use strict';

    var React = require('react');

    var TableSat = require('./../rows/TableSat');

    var TablesSatList = React.createClass({
        render: function() {
            return (
                <TableSat />
            );
        }
    });

    return TablesSatList;
});