import React from 'react';
import DataGrid from './components/DataGrid';

export default React.createClass({

    linkHandler(product) {
        window.location.hash = "#salesman/" + product.id;
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
            <DataGrid data={this.props.products}>
                <div header="Name" field="product_name" onLink={this.linkHandler}/>
                <div header="Amount on Shelf" field="amount"/>
                <div header="Threshold" field="threshold"/>
                <div header="Inventory Sum" field="inventory_sum"/>
                <div header="Sale Price" field="sale_price"/>
                <div header="Cost Price" field="cost_price"/>
                <div header="Auto Stock" field="auto_stock"/>
            </DataGrid>
        );
    }

});
