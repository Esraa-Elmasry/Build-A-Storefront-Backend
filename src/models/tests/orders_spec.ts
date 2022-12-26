import { Order, OrdersStore} from '../orders'

const store = new OrdersStore()


describe("Order", () => {
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