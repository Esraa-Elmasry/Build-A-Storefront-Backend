import express, { Request, Response } from 'express'
import { Product, ProductsStore} from '../models/products'
import jwt from 'jsonwebtoken'
import verifyAuthToken from './middleware'
const store = new ProductsStore()

const index = async (_req:Request, res: Response) =>  {
    try{
    const products = await store.index()
    res.json(products)
} catch(err) {
    res.status(400)
    res.json(err)
}

}
const update = async (req: Request, res: Response) => {
    try {
        const product = await store.update(req.body.price, req.params.id)
        res.json('product updated')   
    } catch (error) {
        res.status(400)
            res.json(error)
            console.log(error)
        
    }
}
const show = async (req:Request, res:Response) => {
    try {const product = await store.show(req.params.id)
        res.json(product)
        
    } catch (error) {
        res.status(400)
    res.json(error)
    }
    
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
    try {const deleted = await store.delete(req.body.id)
        res.json(deleted)
        
    } catch (error) {
        res.status(404)
        res.json(error)
    }
  
}


const ProductsRoutes = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/createproduct', verifyAuthToken, create)
    app.delete('/deleteproduct/:id', destroy)
    app.patch('/updateproduct/:id', update)
}

export default ProductsRoutes;
