var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var OrderDataDefinition = require('./../../utils/definitions/OrderDataDefinitions');
var _ = require('lodash');

var OrdersStore = assign({}, EventEmitter.prototype, {
    orderData: OrderDataDefinition.orderData,
    
    get: function() {
        return this.orderData;    
    },
    
    removeOrder: function(orderID) {
        _.unset(this.orderData, orderID);
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

module.exports = OrdersStore;