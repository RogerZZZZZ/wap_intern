import React from 'react';

import Spinner from './components/Spinner';
import Toast from './components/Toast';
import {Icon} from './components/Icons';
import StudentSearchBox from './StudentSearchBox';
import * as LoginUtils from './utils/LoginUtils';
import * as Config from './utils/config';
import { createHashHistory } from 'history'

const history = createHashHistory()
export default React.createClass({

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

    render() {
        return (
            <div>
                <Spinner/>
                <Toast/>
                <header className="menu" style={{backgroundColor:"#01344E", verticalAlign:"middle"}}>
                    <ul className="slds-list--horizontal">
                        <li className="menu-title-name">Supermarket Management System</li>
                        <li className="slds-list__item"><a href={this.getHomeRoute()}><Icon name="lead" theme={null}/>Home</a></li>
                        {LoginUtils.isLogin()?
                            <li className="menu-logout" onClick={this.logout}>Logout</li>
                            :
                            <li className="menu-logout" onClick={this.logout}>Login</li>
                        }
                    </ul>
                </header>
                {this.props.children}
            </div>
        );
    }
});
