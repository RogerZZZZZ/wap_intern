import React from 'react';

import * as InventoryService from './services/InventoryService';
import * as SupplierService from './services/SupplierService';

import ComboBox from './components/ComboBox';

export default React.createClass({

    getInitialState() {
        return {inventory:{}, supplier:[]};
    },

    componentWillReceiveProps(props) {
        let inventory = props.inventory;
        this.setState({inventory});
    },

    componentDidMount() {
        SupplierService.findAll().then(supplier => this.setState({supplier}));
    },

    nameChangeHandler(event) {
        let inventory = this.state.inventory;
        inventory.product_name = event.target.value;
        this.setState({inventory});
    },

    supplierChangeHandler(index, value, label) {
        let inventory = this.state.inventory;
        inventory.supplier_id = value;
        this.setState({inventory});
    },

    inventoryChangeHandler(index, value, label) {
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
                            <ComboBox data={this.state.supplier} value={inventory.supplier_id} onChange={this.supplierChangeHandler}/>
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
                </div>
            </div>
        );
    }

});
