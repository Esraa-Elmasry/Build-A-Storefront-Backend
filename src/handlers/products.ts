import express, { Request, Response } from 'express'
import { Product, ProductsStore} from '../models/products'
import jwt from 'jsonwebtoken'
import verifyAuthToken from './middleware'
const store = new ProductsStore()

const index = async (_req:Request, res: Response) =>  {
    const products = await store.index()
    res.json(products)
}

const show = async (req:Request, res:Response) => {
    const product = await store.show(req.body.id)
    res.json(product)
}

const create = async (req: Request, res: Response) => {
   
    try {
        const product: Product = {
            name: req.body.name,
            author: req.body.author,
            price: req.body.price,
            category: req.body.category,
        }

        const newProduct = await store.create(product)
        res.json(newProduct)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}


const ProductsRoutes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/createproduct', verifyAuthToken, create)
    app.delete('/deleteproduct/:id', destroy)
}

export default ProductsRoutes;
