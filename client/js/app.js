import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute} from 'react-router';

import Shell from './Shell';
import LoginView from './LoginView';
import ManagerHome from './ManagerHome';
import SalesmanHome from './SalesmanHome';
import ProductRecord from './ProductRecord';
import ProductView from './ProductView';
import ProductFormWrapper from './ProductFormWrapper';
import StockmanHome from './StockmanHome';
import InventoryRecord from './InventoryRecord';
import InventoryView from './InventoryView';
import StockHistoryView from './StockHistoryView';
import InventoryFormWrapper from './InventoryFormWrapper';
import CommandHome from './CommandHome';
import ShelfView from './ShelfView';
import ShelfView3D from './ShelfView3D';
import ErrorPage from './ErrorPage';

render((
    //React-Router
    <Router >
        <Route path="/" component={Shell}>
            <IndexRoute component={LoginView}/>
            <Route path="login" component={LoginView}/>
            <Route path="managers" component={ManagerHome} />
            <Route path="salesmen" component={SalesmanHome} />
            <Route path="salesman" component={ProductRecord}>
                <Route path=":productId" component={ProductView} />
                <Route path=":productId/edit" component={ProductFormWrapper} />
            </Route>
            <Route path="stockmen" component={StockmanHome} />
            <Route path="stockman" component={InventoryRecord}>
                <Route path=":inventoryId" component={InventoryView} />
                <Route path=":inventoryId/edit" component={InventoryFormWrapper} />
            </Route>
            <Route path="command" component={CommandHome} />
            <Route path="error" component={ErrorPage} />
            <Route path="shelfView/:shelfId" component={ShelfView} />
            <Route path="shelfView3D/:shelfId" component={ShelfView3D} />
            <Route path="history" component={StockHistoryView} />
            <Route path="*" component={LoginView}/>
        </Route>
    </Router>
), document.body);
