import React from 'react';
import DataGrid from './components/DataGrid';

export default React.createClass({

    linkHandler(inventory) {
        window.location.hash = "#stockman/" + inventory.id;
    },

    actionHandler(data, value, label) {
        if (label === "Delete") {
            this.props.onDelete(data);
        } else if (label === "Edit") {
            this.props.onEdit(data);
        }
    },

    render() {
        return (
            <DataGrid data={this.props.inventory}>
                <div header="Name" field="product_name" onLink={this.linkHandler}/>
                <div header="Supplier Name" field="supplier_name"/>
                <div header="Inventory" field="inventory_sum"/>
            </DataGrid>
        );
    }

});
