"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../models/orders");
const middleware_1 = __importDefault(require("./middleware"));
const store = new orders_1.OrdersStore();
const index = async (_req, res) => {
    const orders = await store.index();
    res.json(orders);
};
const show = async (req, res) => {
    const order = await store.show(req.body.id);
    res.json(order);
};
const create = async (req, res) => {
    try {
        const order = {
            status: "active",
            user_id: req.body.user_id,
        };
        const newOrder = await store.create(order);
        res.json(newOrder);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const addProduct = async (_req, res) => {
    const orderId = _req.params.orderId;
    const productId = _req.body.productId;
    const quantity = parseInt(_req.body.quantity);
    console.log(_req);
    try {
        const addedProduct = await store.addProduct(quantity, orderId, productId);
        res.json(addedProduct);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const OrdersRoutes = (app) => {
    app.get('/orders', index);
    app.get('/orders/:id', show);
    app.post('/createorder', middleware_1.default, create);
    app.post('/orders/:orderId/products', addProduct);
};
exports.default = OrdersRoutes;
