define(function() {
    'use strict';
    var React = require('react');
    var Table = require('./../buttons/Table');

    var Tables = React.createClass({

        render: function () {
            return (
                <div className="tables">
                    <div className="table">
                        <img className="blank-table" src="./../app/assets/images/longTableBlank.svg" height="100"
                             width="50"/>
                    </div>
                </div>
            );
        }
    });
    return Tables;
});