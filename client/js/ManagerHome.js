import React from 'react';
import CommandList from './CommandList';
import * as LoginUtils from './utils/LoginUtils';
import * as Config from './utils/config';
import * as CommandService from './services/CommandService';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as ShelfService from './services/ShelfService';
import ExpiredList from './ExpiredList';
import ShelfStatus from './ShelfStatus';
import InventoryStatus from './InventoryStatus';

const map2DParams = {
    mapDiv: 'map',
    dim:"2d"
}

const map3DParams = {
    mapDiv: 'map',
    mapDiv:"indoor3d",
    dim: "2d"
}

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

export default React.createClass({
    childContextTypes:{
        muiTheme: React.PropTypes.object.isRequired,
    },

    getInitialState() {
        if(!LoginUtils.checkIfAccessable(Config.MANAGER_PAGE)){
            history.pushState(null, '/error');
        }
        //mapType: 0-2D, 1-3D
        return {expired: [], shelf: [], inventory: []}
    },

    getCommand(){
        let self = this;
        ShelfService.findExpiredProduct().then(expired => self.setState({expired}));
        ShelfService.checkShelfStatus().then(shelf => self.setState({shelf}));
        ShelfService.checkInventoryStatus().then(inventory => self.setState({inventory}));
    },

    componentDidMount() {
        if(!LoginUtils.isLogin()) return '#login';
        this.getCommand();
    },

    getNotification() {
        let position = LoginUtils.whoIsOnline();
        CommandService.findAll(position).then(command => this.setState({command}));
    },

    render() {
        let rows1, rows2, rows3;
        if (this.state.expired) {
            rows1 = this.state.expired.map(item => <ExpiredList data={item} />);
        }
        if (this.state.inventory) {
            rows2 = this.state.inventory.map(item => <InventoryStatus data={item} />);
        }
        if (this.state.shelf) {
            rows3 = this.state.shelf.map(item => <ShelfStatus data={item} />);
        }
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
            <div className="manager_wrap">
                <div>
                    {rows1}
                    {rows2}
                    {rows3}
                </div>
            </div>
            </MuiThemeProvider>
        );
    }

});
