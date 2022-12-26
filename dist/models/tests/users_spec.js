"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../users");
const saltRounds = 10;
const pepper = "$%esra";
const store = new users_1.UsersStore();
describe("User", () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('create method should add a user', async () => {
        const result = await store.create({
            username: 'esraaelmasry',
            firstname: 'esraa',
            lastname: 'elmasry',
            password: '28121994'
        });
        expect(result).toBeDefined();
    });
    it('index method should return a list of users', async () => {
        const result = await store.index();
        expect(result.length).toBeGreaterThanOrEqual(0);
    });
    it('show method should return the correct user', async () => {
        const result = await store.show("13");
        expect(result.email).toEqual('esraa.elmasry25@gmail.com');
        expect(result.username).toEqual('esraaelmasry3');
    });
    it("should have an authenticate method", () => {
        expect(store.authenticate).toBeDefined();
    });
});
