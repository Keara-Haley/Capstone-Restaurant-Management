define(function() {
    'use strict';
    var React = require('react');
    var WaitlistEntry = require('./../rows/WaitlistEntry');
    var WaitlistsStore = require('./../stores/WaitlistsStore');

    var WaitlistsList = React.createClass({
        getInitialState: function() {
            return {
                waitlists: null
            };
        },

        componentWillMount: function() {
            this.setState({
                waitlists: WaitlistsStore.get()
            });
            WaitlistsStore.addChangeListener(this.updateWaitlists);
        },

        updateWaitlists: function() {
            this.setState({
                waitlists: WaitlistsStore.get()
            });
        },

        selectWaitlist: function(waitlistId) {
            var alreadySelectedWaitlist = _.find(this.state.waitlists, ['selected', true]);
            var selectedWaitlist;
            if(alreadySelectedWaitlist) {
                if(alreadySelectedWaitlist.waitlistId !== waitlistId) {
                    selectedWaitlist = this.state.waitlists[waitlistId];
                    selectedWaitlist.selected = true;
                    WaitlistsStore.setWaitlistData(waitlistId, selectedWaitlist);
                }
                alreadySelectedWaitlist.selected = false;
                WaitlistsStore.setWaitlistData(alreadySelectedWaitlist.waitlistId, alreadySelectedWaitlist);
            }
            else {
                selectedWaitlist = this.state.waitlists[waitlistId];
                selectedWaitlist.selected = true;
                WaitlistsStore.setWaitlistData(waitlistId, selectedWaitlist);
            }
        },

        getWaitlistMarkup: function(waitlist) {
            if(!waitlist.display){
                return null;
            }
            var classname = "waitlist ";
            if(waitlist.selected) {
                classname = classname + "selected";
            }
            return(
                <WaitlistEntry key={waitlist.waitlistId} classname={classname} entry={waitlist} onClick={this.selectWaitlist}/>
            );
        },

        getWaitlistsMarkup: function() {
            var waitlists = [];
            var self = this;
            _.forEach(this.state.waitlists, function(waitlist) {
                waitlists.push(self.getWaitlistMarkup(waitlist));
            });
            return waitlists;
        },

        render: function () {
            //TODO figure out how to display in order by time
            return (
                <div className="waitlist-list">
                    <h1 className="waitlist-header">WAITLISTS</h1>
                    {this.getWaitlistsMarkup()}
                </div>
            );
        }
    });
    return WaitlistsList;
});