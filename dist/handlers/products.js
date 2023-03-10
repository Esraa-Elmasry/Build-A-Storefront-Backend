"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../models/products");
const middleware_1 = __importDefault(require("./middleware"));
const store = new products_1.ProductsStore();
const index = async (_req, res) => {
    try {
        const products = await store.index();
        res.json(products);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const update = async (req, res) => {
    try {
        const product = await store.update(req.body.price, req.params.id);
        res.json('product updated');
    }
    catch (error) {
        res.status(400);
        res.json(error);
        console.log(error);
    }
};
const show = async (req, res) => {
    try {
        const product = await store.show(req.params.id);
        res.json(product);
    }
    catch (error) {
        res.status(400);
        res.json(error);
    }
};
const create = async (req, res) => {
    try {
        const product = {
            name: req.body.name,
            author: req.body.author,
            price: req.body.price,
            category: req.body.category,
        };
        const newProduct = await store.create(product);
        res.json(newProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const destroy = async (req, res) => {
    try {
        const deleted = await store.delete(req.body.id);
        res.json(deleted);
    }
    catch (error) {
        res.status(404);
        res.json(error);
    }
};
const ProductsRoutes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/createproduct', middleware_1.default, create);
    app.delete('/deleteproduct/:id', destroy);
    app.patch('/updateproduct/:id', update);
};
exports.default = ProductsRoutes;
