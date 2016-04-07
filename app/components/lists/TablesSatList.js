define(function() {
    'use strict';

    var React = require('react');
    var tableSatData = require('./../../utils/definitions/TableSatDataDefinitions');
    var TableSat = require('./../rows/TableSat');
    var _ = require('lodash');

    var TablesSatList = React.createClass({
        getTablesSat: function() {
            var markup = [];
            _.map(tableSatData, function(tableSat) {
                markup.push(<TableSat key={tableSat.tableSatID} entry={tableSat}/>);
            });
            return markup;
        },

        render: function() {
            return (
                <div className="tables-sat-list">
                    <h1>TABLES</h1>
                    {this.getTablesSat()}
                </div>
            );
        }
    });

    return TablesSatList;
});