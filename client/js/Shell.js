import React from 'react';

import Spinner from './components/Spinner';
import Toast from './components/Toast';
import {Icon} from './components/Icons';
import StudentSearchBox from './StudentSearchBox';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {deepOrange500} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import * as LoginUtils from './utils/LoginUtils';
import * as Config from './utils/config';
import { createHashHistory } from 'history';
import * as CommandService from './services/CommandService';

const history = createHashHistory();
const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

const badgeStyle = {
    padding: '6px',
}

const iconButtonStyle = {
    width: '24px',
    height: '24px'
}
const notificationStyle = {
    width: '16px',
    height: '16px'
}

export default React.createClass({
    childContextTypes:{
        muiTheme: React.PropTypes.object.isRequired,
    },

    getInitialState() {
        return {command: [], muiTheme: getMuiTheme()};
    },

    componentDidMount() {
        if(!LoginUtils.isLogin()) return '#login';
        this.getNotification();
    },

    getNotification() {
        let position = LoginUtils.whoIsOnline();
        CommandService.findAll(position).then(command => this.setState({command}));
    },

    selectHandler(index, value, label) {
        window.location.hash = "student/" + value;
    },

    getHomeRoute(){
        if(!LoginUtils.isLogin()) return '#login';
        let position = LoginUtils.whoIsOnline();
        if(position === Config.MANAGER_PAGE){
            return '#managers';
        }else if(position === Config.SALESMAN_PAGE){
            return '#salesmen';
        }else if(position === Config.STOCKMAN_PAGE){
            return '#stockmen';
        }
        return '#login';
    },

    logout(){
        LoginUtils.clearLoginStatus();
        history.pushState(null, 'login');
    },

    switchToCommand() {
        history.pushState(null, 'command');
    },

    render() {
        return (
            <div>
                <Spinner/>
                <Toast/>
                <MuiThemeProvider muiTheme={muiTheme}>
                <header className="menu" style={{backgroundColor:"#01344E", verticalAlign:"middle"}}>
                    <ul className="slds-list--horizontal">
                        <li className="menu-title-name">Supermarket Management System</li>
                        <li className="slds-list__item"><a href={this.getHomeRoute()}><Icon name="lead" theme={null}/>Home</a></li>
                        {LoginUtils.isLogin()?
                            <li className="menu-logout" onClick={this.logout}>Logout</li>
                            :
                            <li className="menu-logout" onClick={this.logout}>Login</li>
                        }
                        <li className="slds-list__item">
                            <Badge badgeContent={this.state.command.length} secondary={true} badgeStyle={{top: 6, left: 30}} style={badgeStyle} onClick={this.switchToCommand}>
                                <IconButton tooltip="Notifications" style={iconButtonStyle}>
                                    <NotificationsIcon style={notificationStyle}/>
                                </IconButton>
                            </Badge>
                        </li>
                    </ul>
                </header>
                </MuiThemeProvider>
                {this.props.children}
            </div>
        );
    }
});
