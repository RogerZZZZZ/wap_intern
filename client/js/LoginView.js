import React from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TextField from 'material-ui/TextField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {deepOrange500} from 'material-ui/styles/colors';
import * as UserService from './services/UserService';
import * as LoginUtils from './utils/LoginUtils';
import { createHashHistory } from 'history'

const history = createHashHistory()
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

    loginFunction() {
        var user = {};
        let self = this;
        user.username = document.getElementById('usernameInput').value;
        user.password = document.getElementById('passwordInput').value;
        UserService.signIn(user).then( type => {
            if(type.length > 0){
                //login
                let positionType = type[0].position_type;
                let supermarket_id = type[0].supermarket_id;
                LoginUtils.setLoginStatus(positionType, supermarket_id);
                if(positionType == 1){
                    //manager
                    self.forwardTo('/managers');
                }else if(positionType === 2){
                    //salesman
                    self.forwardTo('/salesmen')
                }else if(positionType === 3){
                    //stockman
                    self.forwardTo('/stockmen')
                }
            }else{

            }
        });
    },

    forwardTo(location) {
      history.pushState(null, location);
    },

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
            <div className="login">
                <div className="login-title">Login</div>
                <TextField id="usernameInput" className="login-input" hintText="Username" floatingLabelText="Input you username" floatingLabelFixed={true}/><br/>
                <TextField id="passwordInput" className="login-input" hintText="Password" floatingLabelText="Password" type="password"/><br/>
                <RaisedButton className="login-button" label="Login" primary={true} onClick={this.loginFunction}/>
            </div>
            </MuiThemeProvider>
        );
    }
});
