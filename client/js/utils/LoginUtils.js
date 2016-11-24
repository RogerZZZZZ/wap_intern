import cookie from 'react-cookie'

function loginStatus(type, supermarket_id){
    // if(isOnline) return;
    cookie.save('onlineStatus', 'online', { path: '/' });
    cookie.save('positionType', type, {path: '/'});
    cookie.save('supermarket_id', supermarket_id, {path: '/'});
}

function online(){
    if(isOnline){
        return cookie.load('positionType');
    }
    return null;
}

function clearLogin(){
    cookie.remove('onlineStatus', {path: '/'});
    cookie.remove('positionType', {path: '/'});
    cookie.remove('supermarket_id', {path: '/'});
}

function isOnline(){
    var res = cookie.load('onlineStatus');
    var res2 = cookie.load('positionType');
    return (res === null ? false: true) || (res2 === null ? false: true);
}

function checkAccessable(targetPage){
    var currentUser = cookie.load('positionType');
    if(targetPage === currentUser){
        return true;
    }
    return false;
}


export let setLoginStatus = (type, supermarket_id) => loginStatus(type, supermarket_id);

export let clearLoginStatus = () => clearLogin();

export let whoIsOnline = () => online();

export let isLogin = () => isOnline();

export let checkIfAccessable = (targetPage) => checkAccessable(targetPage);
