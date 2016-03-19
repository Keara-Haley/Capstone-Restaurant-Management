var AppDispatcher = require('./../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var tableDataDefinition = require('./../../utils/definitions/tableDataDefinitions');
var _ = require('lodash');

var TablesStore = assign({}, EventEmitter.prototype, {
    tableData: tableDataDefinition.tableData,

    get: function() {
        console.log('get');
        console.log(this.tableData);
        return this.tableData;
    },

    setTableData: function(tableId, data) {
        this.tableData[tableId] = data;
        this.emitChange();
    },

    emitChange: function() {
        this.emit('change');
    },

    addChangeListener: function(callback) {
        this.on('change', callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener('change', callback);
    }
});

module.exports = TablesStore;