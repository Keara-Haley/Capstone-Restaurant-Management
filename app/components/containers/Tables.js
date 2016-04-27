define(function() {
    'use strict';
    var React = require('react');
    var Table = require('./../buttons/Table');
    var TablesStore = require('./../stores/TablesStore');
    var OrdersStore = require('./../stores/OrdersStore');
    var _ = require('lodash');

    var Tables = React.createClass({
        propTypes: {
            numCustomers: React.PropTypes.number
        },

        getInitialState: function() {
            return {
                tables: null
            };
        },

        componentWillMount: function() {
            this.setState({
                tables: TablesStore.get()
            });
            TablesStore.addChangeListener(this.updateTables);
        },

        componentWillUnmount: function() {
            var selectedTable = _.find(this.state.tables, ['selected', true]);
            if(selectedTable) {
                selectedTable.selected = false;
                TablesStore.setTableData(selectedTable.tableId, selectedTable);
            }
        },

        updateTables: function() {
            this.setState({
                tables: TablesStore.get()
            });
        },

        calculateSeatProb: function() {
            _.forEach(this.state.tables, function(table) {
                
            });
        },

        getTableMarkup: function(table) {
            var style = {left: table.x, top: table.y};
            var classname = 'table ';
            var clickFunction = this.selectTable.bind(this, table.tableId);
            var title;

            switch(table.capacity) {
                case 2:
                    classname = classname + 'mini ';
                    break;
                case 4:
                    classname = classname + 'short ';
                    break;
                case 6:
                    classname = classname + 'long ';
                    break;
            }
            if(table.occupied) {
                classname = classname + 'occupied ';
                //clickFunction = this.selectOccupiedTable.bind(this, table);
                title = table.party.name + " " + table.party.numberInParty;
            }
            if(table.rotate) {
                classname = classname + 'rotate ';
            }
            if(table.selected) {
                classname = classname + 'selected';
            }

            return(
                <div key={table.tableId} title={title} className={classname} onClick={clickFunction} style={style}/>
            );
        },

        getTablesMarkup: function() {
            var tables = [];
            var self = this;
            _.forEach(this.state.tables, function(table) {
                tables.push(self.getTableMarkup(table));
            });
            return tables;
        },

        selectTable: function(tableId) {
            var table = this.state.tables[tableId];
            if(table.orderID === null) {
                table.orderID = OrdersStore.create(tableId, table.section);
                TablesStore.setTableData(tableId, table);
            }

            var alreadySelectedTable = _.find(this.state.tables, ['selected', true]);
            var selectedTable;
            if(alreadySelectedTable) {
                if(alreadySelectedTable.tableId !== tableId) {
                    selectedTable = this.state.tables[tableId];
                    selectedTable.selected = true;
                    TablesStore.setTableData(tableId, selectedTable);
                }
                alreadySelectedTable.selected = false;
                TablesStore.setTableData(alreadySelectedTable.tableId, alreadySelectedTable);
            }
            else {
                selectedTable = this.state.tables[tableId];
                selectedTable.selected = true;
                TablesStore.setTableData(tableId, selectedTable);
            }
        },

        render: function () {
            return (
                <div className="tables">
                    {this.getTablesMarkup()}
                </div>
            );
        }
    });
    return Tables;
});