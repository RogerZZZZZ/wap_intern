import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {deepOrange500} from 'material-ui/styles/colors';
import * as SalesService from './services/SalesService';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

export default React.createClass({
    childContextTypes:{
        muiTheme: React.PropTypes.object.isRequired,
    },

    getChildContext() {
        return {muiTheme: getMuiTheme()};
    },

    makeSale(){
        SalesService.makeSale(this.props.inventory.product_id, this.props.inventory.supplier_id, this.props.inventory.threshold).then(res => console.log(res));
    },

    checkRecord(){
        window.location.hash = "#history/" ;
    },

    goToMap(){
        window.location.hash = "#shelfView/" + this.props.inventory.position_id;
    },

    render() {
        let inventory = this.props.inventory;
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
            <div>
        <div className="slds-m-around--medium">
            <div className="slds-grid slds-wrap slds-m-bottom--large">
                <div className="slds-col--padded slds-size--1-of-1 slds-medium-size--1-of-2 slds-m-top--medium">
                    <dl className="page-header--rec-home__detail-item">
                        <dt>
                            <p className="slds-text-heading--label slds-truncate" title="Field 1">Product in Inventory</p>
                        </dt>
                        <dd>
                            <p className="slds-text-body--regular slds-truncate" title="">{inventory.product_name}</p>
                        </dd>
                    </dl>
                </div>
            </div>
            <RaisedButton className="login-button" label="Buy 20" primary={true} onClick={this.makeSale}/>
        </div>
        <RaisedButton className="login-button" label="Check Records" primary={true} onClick={this.checkRecord}/>
        <RaisedButton className="login-button" label="Go to Map" primary={true} onClick={this.goToMap}/>
        </div>
        </MuiThemeProvider>
        );
    }
});
