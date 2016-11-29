import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {deepOrange500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as CommandService from './services/CommandService';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});
export default React.createClass({
    childContextTypes:{
        muiTheme: React.PropTypes.object.isRequired,
    },

    getInitialState(){
        return {muiTheme: getMuiTheme()};
    },

    goToMap(){
        window.location.hash = "#shelfView/" + this.props.data.position_id;
    },

    completeMission(){
        let item = this.props.data;
        CommandService.handlerTask(item.id, item.product_id, item.type_id, Math.abs(item.amount-item.threshold)).then(() => {
            window.location.reload();
        });
        if(item.type_id === 2){
            
        }
    },

    render() {
        let item = this.props.data;
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
            <Card>
                <CardHeader
                  title="Mission"
                  subtitle={item.content}
                  actAsExpander={true}
                />
                <CardText>
                    <div className="cardDetail">
                        Product Name: {item.product_name}
                    </div>
                    <div className="cardDetail">
                        Left on shelf: {item.amount}
                    </div>
                    <div className="cardDetail">
                        Left in warehouse: {item.inventory_sum}
                    </div>
                    <div className="cardDetail">
                        Shelf No. : {item.position_id}
                    </div>
                </CardText>
                <CardActions>
                  <FlatButton label="Handler It!" onClick={this.completeMission}/>
                  <FlatButton label="Map" onClick={this.goToMap}/>
                </CardActions>
            </Card>
            </MuiThemeProvider>
        );
    }

});
