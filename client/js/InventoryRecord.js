import React from 'react';
import moment from 'moment';
import cookie from 'react-cookie'
import * as InventoryService from './services/InventoryService';
import * as LoginUtils from './utils/LoginUtils';
import * as Config from './utils/config';
import {RecordHeader, HeaderField} from './components/PageHeader';

export default React.createClass({

    getInitialState() {
        if(!LoginUtils.checkIfAccessable(Config.STOCKMAN_PAGE)){
            history.pushState(null, '/error');
        }
        return {inventory:{}};
    },

    componentDidMount() {
        console.log(this.props.params);
        this.getProduct(this.props.params.inventoryId);
    },

    componentWillReceiveProps(props) {
        this.getProduct(props.params.inventoryId);
    },

    getProduct(id) {
        let supermarket_id = cookie.load('supermarket_id');
        ProductService.findById(id, supermarket_id).then(product => this.setState({product}));
    },

    deleteHandler() {
        ProductService.deleteItem(this.state.product.id).then(() => window.location.hash = "salesman");
    },

    editHandler() {
        window.location.hash = "#salesman/" + this.state.product.id + "/edit";
    },

    render() {
        return (
            <div>
                <RecordHeader type="Product"
                              icon="orders"
                              title={this.state.product.product_name}
                              onEdit={this.editHandler}
                              onDelete={this.deleteHandler}>
                    <HeaderField label="Sale Price" value={this.state.product.sale_price}/>
                    <HeaderField label="Cost Price" value={this.state.product.cost_price}/>
                </RecordHeader>

                {React.cloneElement(this.props.children, {product: this.state.product})}
            </div>
        );
    }
});
