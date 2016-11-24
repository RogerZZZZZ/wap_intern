import React from 'react';
import cookie from 'react-cookie'
import * as ProductService from './services/ProductService';
import * as LoginUtils from './utils/LoginUtils';
import * as Config from './utils/config';
import {HomeHeaderWithoutButton} from './components/PageHeader';
import ProductList from './ProductList';
import { createHashHistory } from 'history'

const history = createHashHistory();

export default React.createClass({

    getInitialState() {
        if(!LoginUtils.checkIfAccessable(Config.SALESMAN_PAGE)){
            history.pushState(null, '/error');
        }
        return {products: []};
    },

    componentDidMount() {
        let supermarket_id = cookie.load('supermarket_id');
        ProductService.findAll(supermarket_id).then(products => this.setState({products}));
    },

    newHandler() {
        this.setState({addingStudent:true});
    },

    savedHandler(student) {
        this.setState({addingStudent: false});
        window.location.hash = "#student/" + student.id;
    },

    cancelHandler() {
        this.setState({addingStudent: false});
    },

    render() {
        return (
            <div>
                <HomeHeaderWithoutButton type="Products"
                            itemCount={this.state.products.length}/>
                <ProductList products={this.state.products}/>
                {/* {this.state.addingStudent?<StudentFormWindow onSaved={this.savedHandler} onCancel={this.cancelHandler}/>:null} */}
            </div>
        );
    }

});
