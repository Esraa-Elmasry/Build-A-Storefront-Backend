"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middleware_1 = __importDefault(require("./middleware"));
const store = new users_1.UsersStore();
const index = async (_req, res) => {
    const users = await store.index();
    res.json(users);
};
const show = async (req, res) => {
    const user = await store.show(req.body.id);
    res.json(user);
};
const create = async (req, res) => {
    try {
        const user = {
            email: req.body.email,
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
        };
        console.log(user, "user");
        const newUser = await store.create(user);
        const token = jsonwebtoken_1.default.sign({ user: newUser }, "secret");
        res.json({ user: newUser, token: token });
    }
    catch (err) {
        res.status(400);
        console.log(err);
        res.json(err);
    }
};
const login = async (req, res) => {
    const user = {
        username: req.body.username,
        password: req.body.password,
    };
    try {
        const u = await store.authenticate(user.username, user.password);
        const token = jsonwebtoken_1.default.sign({ user: u }, "secret");
        res.json(token);
    }
    catch (error) {
        res.status(401);
        res.json({ error });
    }
};
const UsersRoutes = (app) => {
    app.get('/users', middleware_1.default, index);
    app.get('/users/:id', middleware_1.default, show);
    app.post('/register', create);
    app.post('/login', login);
};
exports.default = UsersRoutes;
