"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsStore = void 0;
const database_1 = __importDefault(require("../database"));
class ProductsStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`cannot get product ${err}`);
        }
    }
    async update(price, id) {
        try {
            const sql = 'UPDATE products SET price=($1) WHERE id=($2)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [price, parseInt(id)]);
            console.log(result, 'llll');
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not find product ${id}. Error: ${error}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`);
        }
    }
    async create(p) {
        try {
            const sql = 'INSERT INTO products (name, author, price, category) VALUES($1, $2, $3, $4) RETURNING *';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [p.name, p.author, p.price, p.category]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (err) {
            throw new Error(`Could not add new product ${p}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM products WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`);
        }
    }
}
exports.ProductsStore = ProductsStore;
