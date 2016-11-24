import React from 'react';

import ProductForm from './ProductForm';

export default React.createClass({

    saveHandler() {
        this.refs.form.save();
    },

    savedHandler() {
        window.location.hash = "#salesman/" + this.props.product.id;
    },

    render() {
        return (
            <div className="slds-m-around--medium">
                <ProductForm ref="form" product={this.props.product} onSaved={this.savedHandler}/>
                <button className="slds-button slds-button--neutral slds-button--brand slds-m-around--small" onClick={this.saveHandler}>Save</button>
            </div>
        );
    }

});
