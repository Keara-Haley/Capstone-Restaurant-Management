define(function() {
    'use strict';
    var React = require('react');

    var WaitlistButton = React.createClass({
        PropTypes: {
            buttonType: React.PropTypes.string.isRequired
        },

        render: function () {
            var classes,
                buttonText;
            switch (this.props.buttonType) {
                case 'add':
                    classes = 'add-waitlist-button';
                    buttonText = 'ADD WAITLIST';
                    break;
                case 'remove':
                    classes = 'remove-waitlist-button';
                    buttonText = 'REMOVE WAITLIST';
                    break;
                case 'seat':
                    classes = 'seat-waitlist-button';
                    buttonText = 'SEAT WAITLIST';
                    break;
            }
            return (
                <div className={classes}>
                    <button>{buttonText}</button>
                </div>
            );
        }
    });
    return WaitlistButton;
});