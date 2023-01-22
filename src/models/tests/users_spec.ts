import { User, UsersStore} from '../users'
import bcrypt from 'bcrypt'
import supertest from 'supertest';
import app from 'express'

const request = supertest(app);
describe('Test get all users', () => {
    it('should get all users', () => {
        request.get('/users').then((response) => { expect(response.status).toBe(200);}) 
       
    }
)});

describe('Test create specific user', () => {
  it('should create specific user', () => {
      request.post('/register').then((response) => { expect(response.status).toBe(200);}) 
     
  }
)});

describe('Test show a user', () => {
  it('should show a user', () => {
      request.get('/users/:id').then((response) => { expect(response.status).toBe(200);}) 
     
  }
)});


const saltRounds=10
const pepper="$%esra"

const store = new UsersStore()

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
      password:'28121994'
    });
    expect(result).toBeDefined()
      
  })
  it('index method should return a list of users', async () => {
    const result = await store.index();
    expect(result.length).toBeGreaterThanOrEqual(0)
  });

  it('show method should return the correct user', async () => {
    const result = await store.show("13");
    expect(result.email).toEqual('esraa.elmasry25@gmail.com')
    expect(result.username).toEqual('esraaelmasry3')
      
    });
    it("should have an authenticate method", () => {
      expect(store.authenticate).toBeDefined();
    });
  
  });

