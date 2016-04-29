define(function() {
    'use strict';

    var React = require('react');
    var tableSatData = require('./../../utils/definitions/TableSatDataDefinitions');
    var TableSat = require('./../rows/TableSat');
    var TablesStore = require('./../stores/TablesStore');
    var _ = require('lodash');

    var TablesSatList = React.createClass({
        getInitialState: function() {
            return {
                tables: null,
                tablesSeated: []
            };
        },

        componentWillMount: function() {
            this.setState({
                tables: TablesStore.get()
            });
            TablesStore.addChangeListener(this.updateTables);
        },

        updateTables: function() {
            this.setState({
                tables: TablesStore.get()
            });
        },

        getTablesSat: function() {
            var seatedTables = [];
            var markup = [];
            var self = this;
            _.map(this.state.tables, function(table) {
                if(table.party) {
                    if(self.state.tablesSeated.indexOf(table.tableId) < 0) {
                        seatedTables.push(table.tableId);
                        markup.push(<TableSat key={table.tableId} entry={{tableSatID: table.tableId, numberInParty: table.party.numberInParty, section: table.section}}/>);
                    }
                }
            });
            return _.reverse(_.reverse(markup));
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