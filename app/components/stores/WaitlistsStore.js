var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var WaitlistDataDefinition = require('./../../utils/definitions/waitlistDataDefinitions');
var _ = require('lodash');

var WaitlistsStore = assign({}, EventEmitter.prototype, {
    waitlistData: WaitlistDataDefinition.waitlistData,

    get: function() {
        return this.waitlistData;
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