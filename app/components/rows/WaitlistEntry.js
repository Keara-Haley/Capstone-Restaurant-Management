define(function() {
    'use strict';
    var React = require('react');

    var WaitlistEntry = React.createClass({
        PropTypes: {
            entry: React.PropTypes.object.isRequired
        },

        render: function () {
            var waitlistText = this.props.entry.name + ": " + this.props.entry.numInParty;
            return (
                <div className="waitlist-entry">{waitlistText}</div>
            );
        }
    });
    return WaitlistEntry;
});