import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import ProductsRoutes from './handlers/products'
import UsersRoutes from './handlers/users'
import OrdersRoutes from './handlers/orders'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"


app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

ProductsRoutes(app)
 UsersRoutes(app)
OrdersRoutes(app)


// app.get('/products', (_req: Request, res: Response) => {
//     try {
//         res.send('this is the product INDEX route')
//     } catch (err) {
//         res.status(400)
//         res.json(err)
//     }
// })

// app.get('/products/:id', (_req: Request, res: Response) => {
//     try {
//        res.send('this is the product SHOW route')
//     } catch (err) {
//        res.status(400)
//        res.json(err)
//     }
// })
// app.post ('products', )
// app.get('/users', (_req: Request, res: Response) => {
//     try {
//         res.send('this is the user INDEX route')
//     } catch (err) {
//         res.status(400)
//         res.json(err)
//     }
// })

// app.get('/users/:id', (_req: Request, res: Response) => {
//     try {
//        res.send('this is the user SHOW route')
//     } catch (err) {
//        res.status(400)
//        res.json(err)
//     }
// })


app.get('/test-cors', function (req, res, next){
    res.json({msg: 'This is CORS-enabled with a middle ware'})
})
app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
