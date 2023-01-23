import { Order, OrdersStore} from '../orders'
import supertest from 'supertest';
import app from 'express'

const request = supertest(app);
describe('Test get all orders', () => {
    it('should get all orders', () => {
        request.get('/orders').then((response) => { expect(response.status).toBe(200);}) 
       
    }
)});

describe('Test create specific order', () => {
  it('should create a specific order', () => {
      request.post('/createorder').then((response) => { expect(response.status).toBe(200);}) 
     
  }
)});

describe('Test show an order', () => {
  it('should show an order', () => {
      request.get('/orders/:id').then((response) => { expect(response.status).toBe(200);}) 
     
  }
)});

describe('Test add product to current order', () => {
  it('should add product to current order', () => {
      request.post('/orders/:orderId/products').then((response) => { expect(response.status).toBe(200);}) 
     
  }
)});




const store = new OrdersStore()


describe("order", () => {
    it('should have an index method', () => {
      expect(store.index).toBeDefined();
    });
  
    it('should have a show method', () => {
      expect(store.show).toBeDefined();
    });
  
    it('should have a create method', () => {
      expect(store.create).toBeDefined();
    });
  
    it('create method should add a order', async () => {
      const result = await store.create({
        status:'active',
        user_id: '1',
      });
      expect(result).toBeDefined()
       
    })
    it('index method should return a list of orders', async () => {
      const result = await store.index();
      expect(result.length).toBeGreaterThanOrEqual(0)
      
    });
  
    it('show method should return the correct order', async () => {
      const result = await store.show("1");
      expect(result).toEqual({
        id: 1,
        status:'active',
        user_id: '1',
      });
    });

  

    it('addProduct method should add a product to an order', async () => {
      const result = await store.addProduct(3, '1', '2')
      expect(result).toBeDefined();
    });
  })