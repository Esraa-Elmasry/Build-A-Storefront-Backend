import client from '../database'

export type Order = {
    id?: Number;
    status: string;
    user_id: number | string;
}

export class OrdersStore {
    async index():Promise<Order[]> {
        try {
        const conn = await client.connect()
        const sql = 'SELECT * FROM orders'
        const result = await conn.query(sql)
        conn.release()
        return result.rows
    }catch (err) {
        throw new Error (`cannot get order ${err}`)

    }
}

async show(id: string): Promise<Order> {
    try {
    const sql = 'SELECT * FROM orders WHERE id=($1)'
    const conn = await client.connect()
    const result = await conn.query(sql, [id])
    conn.release()
    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find order ${id}. Error: ${err}`)
    }
}
async create(o: Order): Promise<Order> {
    try {
   const sql = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *'
   const conn = await client.connect()
   const result = await conn.query(sql, [o.status, o.user_id])
   const order = result.rows[0]
   conn.release()

   return order 
     } catch (err) {
        throw new Error(`Could not create order ${o}: ${err}`)
     }
 }

 async addProduct(quantity: Number, orderId: string, productId: string): Promise<Order> {
    try {
        const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
        const conn = await client.connect()
        const result = await conn.query(sql, [quantity, orderId, productId])
        const order = result.rows[0]
        conn.release()

        return order
 }catch(err) {
    throw new Error (`Could not add product ${productId} to order ${orderId}: ${err}`)
 }

}
}