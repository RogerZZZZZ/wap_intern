import React from 'react';

import * as ProductService from './services/ProductService';

export default React.createClass({

    getInitialState() {
        return {product:{}};
    },

    componentWillReceiveProps(props) {
        let product = props.product;
        this.setState({product});
    },

    componentDidMount() {
        // PeriodService.findAll().then(periods => this.setState({periods}));
        // TeacherService.findAll().then(teachers => this.setState({teachers}));
    },

    nameChangeHandler(event) {
        let product = this.state.product;
        product.product_name = event.target.value;
        this.setState({product});
    },

    salePriceChangeHandler(event) {
        let product = this.state.product;
        product.sale_price = event.target.value;
        this.setState({product});
    },

    costPriceChangeHandler(event) {
        let product = this.state.product;
        product.cost_price = event.target.value;
        this.setState({product});
    },

    save() {
        let saveItem = this.state.product.id ? ProductService.updateItem : ProductService.createItem;
        saveItem(this.state.product).then(savedProduct => {
            if (this.props.onSaved) this.props.onSaved(savedProduct);
        });
    },

    render() {
        let product = this.state.product;
        return (
            <div className="slds-form--stacked slds-grid slds-wrap">
                <div className="slds-col--padded slds-size--1-of-1 slds-medium-size--1-of-2">
                    <div className="slds-form-element">
                        <label className="slds-form-element__label" htmlFor="sample1">Product Name</label>
                        <div className="slds-form-element__control">
                            <input className="slds-input" type="text" value={product.product_name} onChange={this.nameChangeHandler}/>
                        </div>
                    </div>
                    <div className="slds-form-element">
                        <label className="slds-form-element__label" htmlFor="sample1">Sale Price</label>
                        <div className="slds-form-element__control">
                            <input className="slds-input" type="text" value={product.sale_price} onChange={this.salePriceChangeHandler}/>
                        </div>
                    </div>
                    <div className="slds-form-element">
                        <label className="slds-form-element__label" htmlFor="sample1">Cost Price</label>
                        <div className="slds-form-element__control">
                            <input className="slds-input" type="text" value={product.cost_price} onChange={this.costPriceChangeHandler}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

});
