"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const products_1 = __importDefault(require("./handlers/products"));
const users_1 = __importDefault(require("./handlers/users"));
const orders_1 = __importDefault(require("./handlers/orders"));
const app = (0, express_1.default)();
const address = "0.0.0.0:3000";
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
(0, products_1.default)(app);
(0, users_1.default)(app);
(0, orders_1.default)(app);
// app.get('/products', (_req: Request, res: Response) => {
//     try {
//         res.send('this is the product INDEX route')
//     } catch (err) {
//         res.status(400)
//         res.json(err)
//     }
// })
// app.get('/products/:id', (_req: Request, res: Response) => {
//     try {
//        res.send('this is the product SHOW route')
//     } catch (err) {
//        res.status(400)
//        res.json(err)
//     }
// })
// app.post ('products', )
// app.get('/users', (_req: Request, res: Response) => {
//     try {
//         res.send('this is the user INDEX route')
//     } catch (err) {
//         res.status(400)
//         res.json(err)
//     }
// })
// app.get('/users/:id', (_req: Request, res: Response) => {
//     try {
//        res.send('this is the user SHOW route')
//     } catch (err) {
//        res.status(400)
//        res.json(err)
//     }
// })
app.get('/test-cors', function (req, res, next) {
    res.json({ msg: 'This is CORS-enabled with a middle ware' });
});
app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
