import React from 'react';

import InventoryForm from './InventoryForm';

export default React.createClass({

    saveHandler() {
        this.refs.form.save();
    },

    savedHandler() {
        window.location.hash = "#stockman/" + this.props.inventory.id;
    },

    render() {
        return (
            <div className="slds-m-around--medium">
                <InventoryForm ref="form" inventory={this.props.inventory} onSaved={this.savedHandler}/>
                <button className="slds-button slds-button--neutral slds-button--brand slds-m-around--small" onClick={this.saveHandler}>Save</button>
            </div>
        );
    }

});
