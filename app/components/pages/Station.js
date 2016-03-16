define(function() {
    var React = require('react');
    var TablesContainer = require('./../containers/TablesContainer');
    var ListsContainer = require('./../containers/ListsContainer');
    var OrdersListContainer = require('./../containers/OrdersListContainer');
    var TablesSatContainer = require('./../containers/TablesSatContainer');
    var MenuContainer = require('./../containers/MenuContainer');
    var CheckContainer = require('./../containers/CheckContainer');
    var Tables = require('./../containers/Tables');

    var Station = React.createClass({

        getInitialState: function() {
            this.stationType = this.props.params.stationType;
            return {
                stationData: null
            };
        },

        getStationMarkup: function() {
            var serverStation = (
                <div className="server-station">
                    <Tables />
                    <div className="menu-check">
                        <MenuContainer />
                        <CheckContainer />
                    </div>
                </div>
            );

            var hostStation = (
                <div className="host-station">
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