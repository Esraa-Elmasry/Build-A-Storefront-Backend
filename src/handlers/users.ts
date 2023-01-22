import express, { Request, Response } from 'express'
import { User, UsersStore} from '../models/users'
import jwt from 'jsonwebtoken'
import verifyAuthToken from './middleware'

const store = new UsersStore()

const index = async (_req:Request, res: Response) =>  {
    try {const users = await store.index()
        res.json(users)
        
    } catch (error) {
        res.status(400)
        res.json(error)
        
    }
    
}

const show = async (req:Request, res:Response) => {
    try {  const user = await store.show(req.params.id)
        res.json(user)
        
    } catch (error) {
        res.status(400)
        res.json(error)
    }
  
}

const create = async (req:Request, res:Response) => {
    try {
        
        const user: User = {
            email: req.body.email,
            username: req.body.username,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password,
        }
        console.log(user, "user")
        const newUser = await store.create(user)
        const token = jwt.sign({ user: newUser }, "secret");
        res.json({user:newUser, token:token})
    }catch(err) {
        res.status(400)
    console.log(err)
        res.json(err)
    }

    }
    const login= async (req: Request, res: Response) => {
        const user: User = {
          username: req.body.username,
          password: req.body.password,
        }
        try {
            const u = await store.authenticate(user.username, user.password)
            const token = jwt.sign({ user: u }, "secret");
            res.json(token)
        } catch(error) {
            res.status(401)
            res.json({ error })
        }
      }


const UsersRoutes = (app: express.Application) => {
    app.get('/users',verifyAuthToken, index)
    app.get('/users/:id', verifyAuthToken, show)
    app.post('/register', create)
    app.post('/login', login)
}

export default UsersRoutes;
