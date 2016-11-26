import React from 'react';

import * as InventoryService from './services/InventoryService';
import cookie from 'react-cookie'
import SearchBox from './components/SearchBox';

export default React.createClass({

    getInitialState() {
        return {products:[]}
    },

    keyChangeHandler(name) {
        let supermarket_id = cookie.load('supermarket_id');
        if (name) {
            InventoryService.findByName(name, supermarket_id).then(products => this.setState({products}));
        }
    },

    render() {
        return (
            <SearchBox data={this.state.products}
                       placeholder={this.props.placeholder}
                       onKeyChange={this.keyChangeHandler}
                       onSelect={this.props.onSelect}/>
        );
    }

});
