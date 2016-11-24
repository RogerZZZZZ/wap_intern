import React from 'react';
import cookie from 'react-cookie'


export default React.createClass({

    getInitialState() {
        return {};
    },

    render() {
        return (
            <div className="error-wrap">
                You are not allowed to accss to this page.
            </div>
        );
    }

});
