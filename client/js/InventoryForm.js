import React from 'react';

import * as InventoryService from './services/InventoryService';
import * as SupplierService from './services/SupplierService';
import * as ProductTypeService from './services/ProductTypeService';
import cookie from 'react-cookie'
import ComboBox from './components/ComboBox';

export default React.createClass({

    getInitialState() {
        let supermarket_id = cookie.load('supermarket_id');
        return {inventory:{supermarket_id: supermarket_id}, supplier:[], product_type: []};
    },

    componentWillReceiveProps(props) {
        let inventory = props.inventory;
        this.setState({inventory});
    },

    componentDidMount() {
        SupplierService.findAll().then(supplier => this.setState({supplier}));
        ProductTypeService.findAll().then(product_type => this.setState({product_type}));
    },

    nameChangeHandler(event) {
        let inventory = this.state.inventory;
        inventory.product_name = event.target.value;
        this.setState({inventory});
    },

    costPriceChangeHandler(event){
        let inventory = this.state.inventory;
        inventory.cost_price = event.target.value;
        this.setState({inventory});
    },

    sellPriceChangeHandler(event) {
        let inventory = this.state.inventory;
        inventory.sell_price = event.target.value;
        this.setState({inventory});
    },

    supplierChangeHandler(index, value, label) {
        let inventory = this.state.inventory;
        inventory.supplier_id = value;
        this.setState({inventory});
    },

    typeChangeHandler(index, value, label) {
        let inventory = this.state.inventory;
        inventory.type_id = value;
        this.setState({inventory});
    },

    inventoryChangeHandler(event) {
        let inventory = this.state.inventory;
        inventory.inventory_sum = event.target.value;
        this.setState({inventory});
    },

    save() {
        let saveItem = this.state.inventory.id ? InventoryService.updateItem : InventoryService.createItem;
        saveItem(this.state.inventory).then(saveInventory => {
            if (this.props.onSaved) this.props.onSaved(saveInventory);
        });
    },

    render() {
        let inventory = this.state.inventory;
        return (
            <div className="slds-form--stacked slds-grid slds-wrap">
                <div className="slds-col--padded slds-size--1-of-1 slds-medium-size--1-of-2">
                    <div className="slds-form-element">
                        <label className="slds-form-element__label" htmlFor="sample1">Product Name</label>
                        <div className="slds-form-element__control">
                            <input className="slds-input" type="text" value={inventory.product_name} onChange={this.nameChangeHandler}/>
                        </div>
                    </div>
                    <div className="slds-form-element">
                        <label className="slds-form-element__label" htmlFor="sample1">Supplier</label>
                        <div className="slds-form-element__control">
                            <ComboBox data={this.state.supplier} value={inventory.supplier_id} onChange={this.supplierChangeHandler} labelField="supplier_name"/>
                        </div>
                    </div>
                    <div className="slds-form-element">
                        <label className="slds-form-element__label" htmlFor="sample1">Cost</label>
                        <div className="slds-form-element__control">
                            <input className="slds-input" type="text" value={inventory.cost_price} onChange={this.costPriceChangeHandler}/>
                        </div>
                    </div>
                </div>
                <div className="slds-col--padded slds-size--1-of-1 slds-medium-size--1-of-2">
                    <div className="slds-form-element">
                        <label className="slds-form-element__label" htmlFor="sample1">Inventory</label>
                        <div className="slds-form-element__control">
                            <input className="slds-input" type="text" value={inventory.inventory_sum} onChange={this.inventoryChangeHandler}/>
                        </div>
                    </div>
                    <div className="slds-form-element">
                        <label className="slds-form-element__label" htmlFor="sample1">Type of Product</label>
                        <div className="slds-form-element__control">
                            <ComboBox data={this.state.product_type} value={inventory.type_id} onChange={this.typeChangeHandler} labelField="type_name"/>
                        </div>
                    </div>
                    <div className="slds-form-element">
                        <label className="slds-form-element__label" htmlFor="sample1">Sell Price</label>
                        <div className="slds-form-element__control">
                            <input className="slds-input" type="text" value={inventory.sell_price} onChange={this.sellPriceChangeHandler}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

});
