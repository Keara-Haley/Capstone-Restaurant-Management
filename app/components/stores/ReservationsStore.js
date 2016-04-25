var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var ReservationDataDefinition = require('./../../utils/definitions/reservationDataDefinitions');
var _ = require('lodash');

var createID = function() {
    return Date.now();
};

var getDateTime = function(date, time) {
    //2011-10-10T14:48:00
    //date: mm/dd/yyyy - string
    //time: H:MM or HH:MM - string
    var dateTimeString = date.substring(6) + "-"
                       + date.substring(0, 2) + "-"
                       + date.substring(3, 5) + "T"
                       + (parseInt(time) + 12) + ":"
                       + time.substring(time.indexOf(":") + 1) + ":00";
    return new Date(dateTimeString);
};

var ReservationsStore = assign({}, EventEmitter.prototype, {
    reservationData: ReservationDataDefinition.reservationsData,

    get: function() {
        return this.reservationData;
    },

    getIndividual: function(reservationId) {
        return this.reservationData[reservationId];
    },

    createReservation: function(data) {
        var id = createID();
        var reservation = {
            reservationId: id,
            name: data[0],
            dateTime: getDateTime(data[2], data[3]),
            numberInParty: data[1],
            phoneNumber: data[4],
            specialInstructions: data[5],
            selected: false,
            tableId: null,
            display: true
        };
        this.reservationData[id] = reservation;
        this.emitChange();
    },

    setReservationData: function(reservationId, data) {
        this.reservationData[reservationId] = data;
        this.emitChange();
    },
    
    deleteReservation: function(reservationId) {
        _.unset(this.reservationData, reservationId);
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