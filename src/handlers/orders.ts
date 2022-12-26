import express, { Request, Response } from 'express'
import { Order, OrdersStore} from '../models/orders'
import verifyAuthToken from './middleware'


const store = new OrdersStore()

const index = async (_req:Request, res: Response) =>  {
    const orders = await store.index()
    res.json(orders)
}

const show = async (req:Request, res:Response) => {
    const order = await store.show(req.body.id)
    res.json(order)
}

const create = async (req:Request, res:Response) => {
    try {
        const order: Order = {
            status: "active",
            user_id: req.body.user_id,
        }
        const newOrder = await store.create(order)
        res.json(newOrder)
    }catch(err) {
        res.status(400)
        res.json(err)
    }
}
    const addProduct = async (_req: Request, res: Response) => {
  const orderId: string = _req.params.orderId
  const productId: string = _req.body.productId
  const quantity: number = parseInt(_req.body.quantity)
console.log(_req)
  try {
    const addedProduct = await store.addProduct(quantity, orderId, productId)
    res.json(addedProduct)
  } catch(err) {
    res.status(400)
    res.json(err)
  }
} 


const OrdersRoutes = (app: express.Application) => {
    app.get('/orders', index)
    app.get('/orders/:id', show)
    app.post('/createorder', verifyAuthToken, create)
    app.post('/orders/:orderId/products', addProduct)
}

export default OrdersRoutes;
