var React = require('react');

var Main = React.createClass({
    render: function() {
        return (
            <div id="restaurant-app">
                <nav className="navbar navbar-default" role="navigation">
                    <div className="col-sm-7" style={{marginTop: 15}}>
                        RESTAURANT SOLUTIONS
                    </div>
                </nav>
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        )
    }
});

module.exports = Main;