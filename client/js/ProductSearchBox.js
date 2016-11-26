import React from 'react';

import * as ProductService from './services/ProductService';
import cookie from 'react-cookie'
import SearchBox from './components/SearchBox';

export default React.createClass({

    getInitialState() {
        return {products:[]}
    },

    keyChangeHandler(name) {
        let supermarket_id = cookie.load('supermarket_id');
        if (name) {
            ProductService.findByName(name, supermarket_id).then(products => this.setState({products}));
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
