var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var WaitlistDataDefinition = require('./../../utils/definitions/waitlistDataDefinitions');
var _ = require('lodash');

var createID = function() {
    return Date.now();
};

var WaitlistsStore = assign({}, EventEmitter.prototype, {
    waitlistData: {},   //WaitlistDataDefinition.waitlistData,

    get: function() {
        return this.waitlistData;
    },
    
    createWaitlist: function(data) {
        var id = createID();
        var waitlist = {
            waitlistId: id,
            name: data[0],
            dateTime: id,
            numberInParty: data[1],
            phoneNumber: data[2],
            specialInstructions: data[3],
            selected: false,
            tableId: null,
            display: true
        };
        this.waitlistData[id] = waitlist;
        this.emitChange();
    },

    setWaitlistData: function(waitlistId, data) {
        this.waitlistData[waitlistId] = data;
        this.emitChange();
    },

    deleteWaitlist: function(waitlistId) {
        _.unset(this.waitlistData, waitlistId);
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

module.exports = WaitlistsStore;