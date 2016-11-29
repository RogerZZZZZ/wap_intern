import React from 'react';
import StockHistoryList from './StockHistoryList';
import * as LoginUtils from './utils/LoginUtils';
import * as Config from './utils/config';
import * as StockHistoryService from './services/StockHistoryService';
export default React.createClass({

    getInitialState() {
        return {history: []}
    },

    componentDidMount() {
        if(!LoginUtils.isLogin()) return '#login';
        this.getNotification();
    },

    getNotification() {
        StockHistoryService.findAll().then(history => this.setState({history}));
    },

    rowClick(data) {
        if (this.props.onRowClick) {
            this.props.onRowClick(data);
        }
    },

    render() {
        let rows;
        return (
            <div>
                <StockHistoryList data={this.state.history} />
            </div>

        );
    }

});
