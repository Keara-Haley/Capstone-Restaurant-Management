define(function() {
    'use strict';

    var React = require('react');

    var TableSat = React.createClass({
        propTypes: {
            entry: React.PropTypes.object.isRequired
        },

        render: function() {
            var tableSatText = `${this.props.entry.numberInParty} top in section ${this.props.entry.section}`;
            return(
                <div className="table-sat">{tableSatText}</div>
            );
        }
    });

    return TableSat;
});