import React from 'react';
import SalesChart from './components/SalesChart';

export default React.createClass({

    getInitialState(){
        return {product: this.props.product}
    },

    componentWillReceiveProps(nextProps) {
        this.setState({product: nextProps});
    },

    render() {
        let product = this.props.product;
        return (
        <div className="slds-m-around--medium">
            <div className="slds-grid slds-wrap slds-m-bottom--large">
                <div className="slds-col--padded slds-size--1-of-1 slds-medium-size--1-of-2 slds-m-top--medium">
                    <dl className="page-header--rec-home__detail-item">
                        <dt>
                            <p className="slds-text-heading--label slds-truncate" title="Field 1">Product</p>
                        </dt>
                        <dd>
                            <p className="slds-text-body--regular slds-truncate" title="">{product.product_name}</p>
                        </dd>
                    </dl>
                </div>
            </div>
            <SalesChart product={product} />
        </div>
        );
    }
});
