var AppDispatcher = require('./../dispatcher/AppDispatcher');
var mysql = require("mysql");

var storeID = 12;

var TablesActions = {
    get: function() {
        var tables = null;
        var con = mysql.createConnection({
            host: "localhost",
            user: "keara",
            password: "mysqlpassword",
            database: 'restaurant_data',
            port: 3306
        });

        con.connect(function(err){
            if(err){
                console.log('Error connecting to Db');
                console.log(err);
                return;
            }
            console.log('Connection established');
        });

        con.query('SELECT * FROM TABLES', function(err, rows) {
            if(err) throw err;
            tables = rows;
            console.log('Data received from Db:\n');
        });

        con.end(function(err) {
            // The connection is terminated gracefully
            // Ensures all previously enqueued queries are still
            // before sending a COM_QUIT packet to the MySQL server.
        });

        return tables;
    },

    create: function(table) {
        var con = mysql.createConnection({
            host: "localhost",
            user: "keara",
            password: "mysqlpassword",
            database: 'restaurant_data',
            port: 3306
        });

        con.connect(function(err){
            if(err){
                console.log('Error connecting to Db');
                console.log(err);
                return;
            }
            console.log('Connection established');
        });

        var tableValues = `(${table.tableId}, ${table.x}, ${table.y}, ${table.capacity}, ${table.section}, ${storeID}, ${table.occupied}, ${table.rotate}`;
        var query = 'INSERT INTO TABLES (Table_Number, X_Coor, Y_Coor, Number_Of_Seats, Section, Store_Id, Occupied, Rotate)' +
                    'VALUES ' + tableValues;
        con.query(query, function(err, rows) {
            if(err) throw err;
            console.log('Data received from Db:\n');
        });

        con.end(function(err) {
            // The connection is terminated gracefully
            // Ensures all previously enqueued queries are still
            // before sending a COM_QUIT packet to the MySQL server.
        });
    }
};

module.exports = TablesActions;