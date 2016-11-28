import React from 'react';
import CommandList from './CommandList';
import * as LoginUtils from './utils/LoginUtils';
import * as Config from './utils/config';
import * as CommandService from './services/CommandService';

export default React.createClass({

    getInitialState() {
        if(!LoginUtils.checkIfAccessable(Config.MANAGER_PAGE)){
            history.pushState(null, '/error');
        }
        return {command: []}
    },

    componentDidMount() {
        if(!LoginUtils.isLogin()) return '#login';
        // this.getNotification();
        var params = {
           mapDiv:"indoor3d",
           dim:"3d"
        }
        var indoorMap = IndoorMap(params);

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

            var ul = IndoorMap.getUI(indoorMap);
            document.getElementById('map').appendChild(ul);
        });
        // requestAnimationFrame();
    },

    getNotification() {
        let position = LoginUtils.whoIsOnline();
        CommandService.findAll(position).then(command => this.setState({command}));
    },


    render() {
        return (
            <div>
                <div id="map" className="map">

                </div>
                <div id="indoor3d" className="3d-map" ></div>
                <div className="testButton">
                <ul>
            <li onclick="indoorMap.zoomIn(1.2)">Zoom In</li>
            <li onclick="indoorMap.zoomOut(0.8)">Zoom Out</li>
            <li onclick="indoorMap.setDefaultView()">Default View</li>
            </ul>
                </div>
            </div>


        );
    }

});
