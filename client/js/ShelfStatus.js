import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {deepOrange500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as CommandService from './services/CommandService';
import Snackbar from 'material-ui/Snackbar';

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
        return {muiTheme: getMuiTheme(), open: false};
    },

    handleTouchTap() {
        this.setState({
          open: true,
        });
    },

    handleRequestClose(){
        this.setState({
          open: false,
        });
    },

    sendMisstion(){
        this.handleTouchTap();
        let item = this.props.data;
        let command = {
            from_id: 1,
            to_id: 3,
            content: "Product on the shelf is not enough",
            type_id: 1,
            product_id: this.props.data.product_id
        }
        CommandService.createItem(command);
    },

    render() {
        let item = this.props.data;
        let subtitleStr = "Product on the shelf is not enough";
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
            <div>
            <Card>
                <CardHeader
                  title="Mission"
                  subtitle={subtitleStr}
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
                        Threshold: {item.threshold}
                    </div>
                    <div className="cardDetail">
                        Shelf No. : {item.position_id}
                    </div>
                </CardText>
                <CardActions>
                  <FlatButton label="Assign Task" onClick={this.sendMisstion}/>
                </CardActions>
            </Card>
            <Snackbar
              open={this.state.open}
              message="Task has been successfully assigned."
              autoHideDuration={4000}
              onRequestClose={this.handleRequestClose}
            />
            </div>
            </MuiThemeProvider>
        );
    }

});
