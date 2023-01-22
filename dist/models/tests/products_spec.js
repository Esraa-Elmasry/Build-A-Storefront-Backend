"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../products");
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const request = (0, supertest_1.default)(express_1.default);
describe('Test get all products', () => {
    it('should get all products', () => {
        request.get('/products').then((response) => { expect(response.status).toBe(200); });
    });
});
describe('Test create a product', () => {
    it('should create a specific product', () => {
        request.post('/createproduct').then((response) => { expect(response.status).toBe(200); });
    });
});
describe('Test show a product', () => {
    it('should showa product', () => {
        request.get('/product/:id').then((response) => { expect(response.status).toBe(200); });
    });
});
const store = new products_1.ProductsStore();
describe("Product", () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });
    it('create method should add a product', async () => {
        const result = await store.create({
            name: 'Geology',
            author: 'esraa',
            price: 50,
            category: 'Science',
        });
        expect(result).toBeDefined();
    });
    it('index method should return a list of products', async () => {
        const result = await store.index();
        expect(result.length).toBeGreaterThanOrEqual(0);
    });
    it('show method should return the correct product', async () => {
        const result = await store.show("2");
        expect(result).toEqual({
            id: 2,
            name: 'Geology',
            author: 'esraa',
            price: 50,
            category: 'Science',
        });
    });
});
