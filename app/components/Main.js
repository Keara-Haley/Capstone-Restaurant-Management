var React = require('react');

var Main = React.createClass({
    render: function() {
        return (
            <div className="restaurant-app">
                <div className="navbar">
                    <div className="name-logo">
                        RESTAURANT SOLUTIONS
                    </div>
                </div>
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        )
    }
});

module.exports = Main;