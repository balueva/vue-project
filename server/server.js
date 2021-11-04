const express = require('express');
const fs = require('fs');
const app = express();

const CATALOG_FILE_URL = './server/db/products.json';
const CART_FILE_URL = './server/db/cart.json';

app.use(express.json());
app.use('/', express.static('./public')); // 
app.use(express.static('./server/db/img/')); // файлы с изображениями товаров


// API Catalog
app.get('/api/products', (req, res) => {
    //console.log('get all products');
    fs.readFile(CATALOG_FILE_URL, 'utf-8', (err, data) => {
        if (err)
            res.send({
                result: 0,
                err,
            });
        else
            res.send(data);
    });
});

// данные по конкретному товару
app.get('/api/products/:id', (req, res) => {
    //console.log('product = ' + req.params.id);
    fs.readFile(CATALOG_FILE_URL, 'utf-8', (err, data) => {
        if (err)
            res.send({
                result: 0,
                err,
            });
        else {
            const products = JSON.parse(data);
            const find = products.find(item => item.id === +req.params.id);
            //console.log(find);

            if (!find)
                res.send({
                    result: 0,
                    err: 'Product not found'
                });
            else
                res.send(find);
        }
    });
});


// API Cart
app.get('/api/cart', (req, res) => {
    fs.readFile(CART_FILE_URL, 'utf-8', (err, data) => {
        if (err)
            res.send({
                result: 0,
                err,
            });
        else
            res.send(data);
    });
});

app.post('/api/cart', (req, res) => {
    fs.readFile(CART_FILE_URL, 'utf-8', (err, data) => {
        if (err)
            res.send({
                result: 0,
                err,
            });
        else {
            const cart = JSON.parse(data);
            cart.push(req.body);

            fs.writeFile(CART_FILE_URL, JSON.stringify(cart, null, 2), { encoding: "utf-8" }, (err) => {
                if (err) {
                    res.send({
                        result: 0,
                        err,
                    });
                } else
                    res.send({ result: 1 })
            });
        }
    });
});

app.put('/api/cart/:id', (req, res) => {
    fs.readFile(CART_FILE_URL, 'utf-8', (err, data) => {
        if (err)
            res.send({
                result: 0,
                err,
            });
        else {
            const cart = JSON.parse(data);
            const find = cart.find(item => item.id === +req.params.id);

            find.quantity += req.body.quantity; // - N или +N

            fs.writeFile(CART_FILE_URL, JSON.stringify(cart, null, 2), { encoding: "utf-8" }, (err) => {
                if (err) {
                    res.send({
                        result: 0,
                        err,
                    });
                } else
                    res.send({ result: 1 });
            });
        }
    });
});

app.delete('/api/cart/:id', (req, res) => {
    fs.readFile(CART_FILE_URL, 'utf-8', (err, data) => {
        if (err)
            res.send({ result: 0, err })
        else {
            const cart = JSON.parse(data);
            const find = cart.find(item => item.id === +req.params.id);
            cart.splice(cart.indexOf(find), 1);

            fs.writeFile(CART_FILE_URL, JSON.stringify(cart, null, 2), 'utf-8', (err) => {
                if (err)
                    res.send({ result: 0, err })
                else
                    res.send({ result: 1 });
            })
        }
    })
});

// очистка корзины
app.delete('/api/cart', (req, res) => {
    const cart = [];

    fs.writeFile(CART_FILE_URL, JSON.stringify(cart, null, 2), 'utf-8', (err) => {
        if (err)
            res.send({ result: 0, err })
        else
            res.send({ result: 1 });
    })
    /*
    fs.readFile(CART_FILE_URL, 'utf-8', (err, data) => {
        if (err)
            res.send({ result: 0, err })
        else {
            const cart = [];

            fs.writeFile(CART_FILE_URL, JSON.stringify(cart, null, 2), 'utf-8', (err) => {
                if (err)
                    res.send({ result: 0, err })
                else
                    res.send({ result: 1 });
            })
        }
    })
    */
});

app.listen(5555, () => {
    console.log('Server started!');
});