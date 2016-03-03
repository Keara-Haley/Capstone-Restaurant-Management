define(function() {
    var React = require('react');
    var TablesContainer = require('./../containers/TablesContainer');
    var ListsContainer = require('./../containers/ListsContainer');
    var OrdersListContainer = require('./../containers/OrdersListContainer');
    var TablesSatContainer = require('./../containers/TablesSatContainer');

    var Station = React.createClass({

        getInitialState: function() {
            this.stationType = this.props.params.stationType;
            return {
                stationData: null
            };
        },

        getStationMarkup: function() {
            var serverStation = (
                <div className="host-station">

                </div>
            );

            var hostStation = (
                <div className="server-station">
                    <TablesContainer />
                    <ListsContainer />
                </div>
            );

            var kitchenStation = (
                <div className="kitchen-station">
                    <OrdersListContainer />
                    <TablesSatContainer />
                </div>
            );

            switch(this.stationType) {
                case "host":
                    return hostStation;
                case "server":
                    return serverStation;
                case "kitchen":
                    return kitchenStation;
            }
        },

        render: function () {
            return (
                <div className="station" >
                    {this.getStationMarkup()}
                </div>
            );
        }
    });
    return Station;
});