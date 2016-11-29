import React from 'react';
import DataGrid from './components/DataGrid';

export default React.createClass({

    render() {
        return (
            <DataGrid data={this.props.data}>
                <div header="Id" field="id" />
                <div header="Supplier Name" field="supplier_name"/>
                <div header="Product Name" field="product_name"/>
                <div header="amount" field="amount"/>
            </DataGrid>
        );
    }

});
