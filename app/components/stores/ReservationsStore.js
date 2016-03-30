var AppDispatcher = require('./../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var ReservationDataDefinition = require('./../../utils/definitions/reservationDataDefinitions');
var _ = require('lodash');

var ReservationsStore = assign({}, EventEmitter.prototype, {
    reservationData: ReservationDataDefinition.reservationsData,

    get: function() {
        return this.reservationData;
    },

    getIndividual: function(reservationId) {
        return this.reservationData[reservationId];
    },

    createReservation: function(reservationId, data) {

    },

    setReservationData: function(reservationId, data) {
        this.reservationData[reservationId] = data;
        this.emitChange();
    },
    
    deleteReservation: function(reservationId) {
        _.unset(this.reservationData, reservationId);
        console.log(this.reservationData);
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

module.exports = ReservationsStore;