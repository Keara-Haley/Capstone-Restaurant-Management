var React = require('react');
var TablesContainer = require('./../containers/TablesContainer');
var ListsContainer = require('./../containers/ListsContainer');

var Station = React.createClass({

    render: function() {
        return (
            <div className="station">
                <TablesContainer />
                <ListsContainer />
            </div>
        );
    }
});

module.exports = Station;