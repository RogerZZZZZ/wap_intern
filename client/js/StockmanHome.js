import React from 'react';
import * as InventoryService from './services/InventoryService';
import cookie from 'react-cookie'
import {HomeHeaderWithoutButton} from './components/PageHeader';
import InventoryList from './InventoryList';
import InventoryFormWindow from './InventoryFormWindow';
import * as LoginUtils from './utils/LoginUtils';
import * as Config from './utils/config';
import { createHashHistory } from 'history'
const history = createHashHistory();
export default React.createClass({

    getInitialState() {
        if(!LoginUtils.checkIfAccessable(Config.STOCKMAN_PAGE)){
            history.pushState(null, '/error');
        }
        return {inventory: []};
    },

    componentDidMount() {
        let supermarket_id = cookie.load('supermarket_id');
        InventoryService.findAll(supermarket_id).then(inventory => this.setState({inventory}));
    },

    newHandler() {
        this.setState({addingStudent:true});
    },

    savedHandler(inventory) {
        this.setState({addingStudent: false});
        window.location.hash = "#stockman/" + inventory.id;
    },

    cancelHandler() {
        this.setState({addingStudent: false});
    },

    render() {
        return (
            <div>
                <HomeHeaderWithoutButton type="Inventory" isInventory={true}
                        newLabel="New Product"
                        onNew={this.newHandler}
                        itemCount={this.state.inventory.length}/>
                <InventoryList inventory={this.state.inventory}/>
                {this.state.addingStudent?<InventoryFormWindow onSaved={this.savedHandler} onCancel={this.cancelHandler}/>:null}
            </div>
        );
    }

});
