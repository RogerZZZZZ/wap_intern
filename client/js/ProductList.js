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
                <div header="Sale Price" field="sale_price"/>
                <div header="Cost Price" field="cost_price"/>
            </DataGrid>
        );
    }

});
