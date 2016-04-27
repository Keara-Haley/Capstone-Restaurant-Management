var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var OrderDataDefinition = require('./../../utils/definitions/OrderDataDefinitions');
var _ = require('lodash');

var createID = function() {
    return parseInt(Date.now().toString().substring(4));
};

var OrdersStore = assign({}, EventEmitter.prototype, {
    orderData: {}, //OrderDataDefinition.orderData,
    
    get: function() {
        return this.orderData;    
    },

    create: function(tableID, restaurantHalf) {
        var id = createID();
        this.orderData[id] = {
            orderID: id,
            food: [],
            drinks: [],
            tableID: tableID,
            restaurantHalf: restaurantHalf,
            completed: false
        };
        this.emitChange();
        return id;
    },
    
    removeOrder: function(orderID) {
        var order = this.orderData[orderID];
        order.completed = true;
        this.orderData[orderID] = order;
        this.emitChange();
    },
    
    setOrder: function(orderID, foodData, drinkData) {
        console.log(drinkData);
        this.orderData[orderID].food = _.concat(this.orderData[orderID].food, foodData);
        this.orderData[orderID].drinks = _.concat(this.orderData[orderID].drinks, drinkData);
        this.emitChange();
        console.log(this.orderData[orderID]);
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