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
import ShelfList from './ShelfList';

const map2DParams = {
    mapDiv: 'map',
    dim:"2d"
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
        if(!LoginUtils.checkIfAccessable(Config.STOCKMAN_PAGE)){
            history.pushState(null, '/error');
        }
        //mapType: 0-2D, 1-3D
        return {products: []}
    },

    loadData(){
        ShelfService.getProducts(this.props.params.shelfId).then(products => this.setState({products}));
    },

    componentDidMount() {
        if(!LoginUtils.isLogin()) return '#login';
        this.loadMap();
        this.loadData();
    },

    loadMap(){
        var indoorMap = IndoorMap(map2DParams);
        var testjson;
        var loader = new IndoorMapLoader(indoorMap.is3d);
        let self = this;
        loader.load('../../assets/supermarket.json', function(mall){
            testjson = mall.jsonData;
            indoorMap.parse(testjson);
            indoorMap.showFloor(1);
            indoorMap.showPubPoints(true);
            indoorMap.setSelectable(true);
            indoorMap.selectById(self.props.params.shelfId);
        });
    },

    switchMap(){
        window.location.hash = "#shelfView3D/" + this.props.params.shelfId;
    },

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
            <div className="manager_wrap">
                <ShelfList products={this.state.products} />
                <RaisedButton className="login-button" label="Switch to 3D Map" primary={true} onClick={this.switchMap}/>
                <div className="map_container" >
                    <div id="map" className="map"></div>
                    <div id="indoor3d" className="map-3d" ></div>
                </div>
            </div>
            </MuiThemeProvider>
        );
    }

});
