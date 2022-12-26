import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const verifyAuthToken = (req:Request, res:Response, next: Function) => {
    try {
        const authorizationHeader = req.headers.authorization as string
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, "secret")


        next()
    } catch (error) {
        res.status(401)
    }
}
export default verifyAuthToken;