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
        this.getProduct(this.props.params.inventoryId);
    },

    componentWillReceiveProps(props) {
        this.getProduct(props.params.inventoryId);
    },

    getProduct(id) {
        let supermarket_id = cookie.load('supermarket_id');
        InventoryService.findById(id, supermarket_id).then(inventory => this.setState({inventory}));
    },

    deleteHandler() {
        InventoryService.deleteItem(this.state.inventory.id).then(() => window.location.hash = "salesman");
    },

    render() {
        let isAuto = this.state.inventory.auto_stock == 0 ? "false": "true";
        return (
            <div>
                <RecordHeader type="Product"
                              icon="orders"
                              title={this.state.inventory.product_name}
                              onEdit={this.editHandler}
                              onDelete={this.deleteHandler}>
                    <HeaderField label="Inventory Amount" value={this.state.inventory.inventory_sum}/>
                    <HeaderField label="Inventory Threshold" value={this.state.inventory.threshold}/>
                    <HeaderField label="Shelf Amount" value={this.state.inventory.amount} onClick={this.goToMap}/>
                    <HeaderField label="Auto Stock" value={isAuto}/>
                </RecordHeader>

                {React.cloneElement(this.props.children, {inventory: this.state.inventory})}
            </div>
        );
    }
});
