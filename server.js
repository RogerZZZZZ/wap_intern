var express = require('express'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    user = require('./server/user'),
    products = require('./server/products'),
    inventory = require('./server/inventory'),
    supplier = require('./server/supplier'),
    command = require('./server/command'),
    shelf = require('./server/shelf'),
    stockhistory = require('./server/stockhistory'),
    sales = require('./server/sales'),
    producttype = require('./server/producttype'),
    sqlinit = require('./server/sqlinit'),
    app = express();

app.set('port', process.env.PORT || 5000);

app.use(bodyParser.json());
app.use(compression());

app.use('/', express.static(__dirname + '/www'));

//interfaces that server provides
app.post('/user', user.signIn);

app.get('/products', products.findAll);
app.get('/products/:id', products.findById);
app.post('/products', products.createItem);
app.put('/products', products.updateItem);
app.delete('/products/:id', products.deleteItem);

app.get('/inventory', inventory.findAll);
app.get('/inventory/:id', inventory.findById);
app.post('/inventory', inventory.createItem);
app.put('/inventory', inventory.updateItem);
app.delete('/inventory/:id', inventory.deleteItem);

app.get('/supplier', supplier.findAll);

app.get('/producttype', producttype.findAll);

app.get('/command', command.findAll);
app.put('/command', command.updateItem);
app.get('/command/:id', command.handlerTask);
app.post('/command', command.createItem);

app.get('/shelf', shelf.findExpiredProduct);
app.post('/shelf', shelf.checkInventoryStatus);
app.put('/shelf', shelf.checkShelfStatus);
app.get('/shelf/:id', shelf.getProducts);

app.get('/sales', sales.findSales);
app.get('/sales/:id', sales.makeSale);
// app.get('/sales/:id', sales.findById);
//
app.get('/stockhistory', stockhistory.findAll);
app.get('/stockhistory/:id', stockhistory.doStock);

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send(err);
});

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
