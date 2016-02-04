var React = require('react');
var WaitlistEntry = require('./../rows/WaitlistEntry');

var WaitlistsList = React.createClass({
    render: function() {
        return (
            <div className="waitlist-list">
                <h1 className="waitlist-header">WAITLISTS</h1>
                <WaitlistEntry entry={{name: 'Bob Johnson', numInParty: 2}} />
            </div>
        );
    }
});

module.exports = WaitlistsList;