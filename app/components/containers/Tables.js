define(function() {
    'use strict';
    var React = require('react');
    var Table = require('./../buttons/Table');
    var TablesStore = require('./../stores/TablesStore');
    var _ = require('lodash');

    var Tables = React.createClass({
        propTypes: {
            numCustomers: React.PropTypes.number
        },

        getInitialState: function() {
            return {
                sections: [
                    {
                        sectionId: 1,
                        lastSatOrder: 1
                    },
                    {
                        sectionId: 2,
                        lastSatOrder: 3
                    },
                    {
                        sectionId: 3,
                        lastSatOrder: 2
                    }
                ],
                tables: null
            };
        },

        componentWillMount: function() {
            //_.forEach(tables, function(table) {
            //    TablesStore.setTableData(table.tableId, table);
            //});
            this.state.tables = TablesStore.get();
            TablesStore.addChangeListener(this.updateTables);
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
            }
            if(table.rotate) {
                classname = classname + 'rotate ';
            }
            if(table.selected) {
                classname = classname + 'selected';
            }

            return(
                <div key={table.tableId} className={classname} onClick={this.selectTable.bind(this, table.tableId)} style={style}/>
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