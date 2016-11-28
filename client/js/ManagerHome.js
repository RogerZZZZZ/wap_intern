import React from 'react';
import CommandList from './CommandList';
import * as LoginUtils from './utils/LoginUtils';
import * as Config from './utils/config';
import * as CommandService from './services/CommandService';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

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
        return {command: [], showMap: 0}
    },

    showMap(){
        if(this.state.showMap === 1){
            this.setState({showMap: 0});
        }else{
            this.setState({showMap: 1});
        }
    },

    componentDidMount() {
        if(!LoginUtils.isLogin()) return '#login';
        if(this.state.showMap === 1) this.loadMap(this.state.mapType);
    },

    loadMap(type){
        var indoorMap = IndoorMap(map2DParams);
        var testjson;
        var loader = new IndoorMapLoader(indoorMap.is3d);
        loader.load('../../assets/supermarket.json', function(mall){
            testjson = mall.jsonData;
            indoorMap.parse(testjson);
            indoorMap.showFloor(1);
            indoorMap.showPubPoints(true);
            indoorMap.setSelectable(true);
            indoorMap.setSelectionListener(function(res){
                console.log(res);
            })
            indoorMap.selectById(1);
        });
    },

    getNotification() {
        let position = LoginUtils.whoIsOnline();
        CommandService.findAll(position).then(command => this.setState({command}));
    },

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
            <div className="manager_wrap">
            {this.state.showMap==1 ?
                <div className="map_container" >
                    <div id="map" className="map"></div>
                    <div id="indoor3d" className="map-3d" ></div>
                </div>:null
            }
            <div className="button-group">
                <RaisedButton className="login-button" onClick={this.showMap} label="Toggle Map" primary={true}/>
                <RaisedButton className="login-button" label="Check" primary={true}/>
            </div>
            </div>
            </MuiThemeProvider>


        );
    }

});
