import client from '../database'

export type Product = {
    id?: Number;
    name: string;
    author: string;
    price: number;
    category: string;
}

export class ProductsStore {
    async index():Promise<Product[]> {
        try {
        const conn = await client.connect()
        const sql = 'SELECT * FROM products'
        const result = await conn.query(sql)
        conn.release()
        return result.rows
    }catch (err) {
        throw new Error (`cannot get product ${err}`)

    }
}

async update(price: number, id: string) : Promise<Product> {
  try {
    const sql = 'UPDATE products SET price=($1) WHERE id=($2)'
    const conn = await client.connect()
    const result = await conn.query(sql,[price,parseInt(id)])
    console.log(result, 'llll')
    conn.release()
    return result.rows[0]
    
  } catch (error) {
    throw new Error(`Could not find product ${id}. Error: ${error}`)
    
  }
}

 async show(id: string): Promise<Product> {
    try {
    const sql = 'SELECT * FROM products WHERE id=($1)'
    const conn = await client.connect()
    const result = await conn.query(sql, [id])
    conn.release()
    return result.rows[0]
    } catch (err) {
        throw new Error(`Could not find product ${id}. Error: ${err}`)
    }
}

  async create(p: Product): Promise<Product> {
     try {
    const sql = 'INSERT INTO products (name, author, price, category) VALUES($1, $2, $3, $4) RETURNING *'
    const conn = await client.connect()
    const result = await conn.query(sql, [p.name, p.author, p.price, p.category])
    const product = result.rows[0]
    conn.release()

    return product 
      } catch (err) {
         throw new Error(`Could not add new product ${p}. Error: ${err}`)
      }
  }

  async delete (id:string): Promise<Product> {
    try{
    const sql = 'DELETE FROM products WHERE id=($1)'
    const conn = await client.connect()
    const result = await conn.query (sql, [id])
    const product = result.rows[0]

    conn.release()
    return product
  } catch (err) {
    throw new Error (`Could not delete product ${id}. Error: ${err}`)
  }

}
}
