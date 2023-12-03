import {errorHandler, jwtMiddleware} from './';
import Cors from 'cors'

// Initializing the cors middleware
const cors = Cors({
    methods: ['GET', 'HEAD'],
})

function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
      fn(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result)
        }
  
        return resolve(result)
      })
    })
  }
  

export { apiHandler };

function apiHandler(handler) {
    return async (req, res) => {
        try {
            // global middleware
            // await runMiddleware(req, res, cors)
            await jwtMiddleware(req, res);
            // route handler
            await handler(req, res);
            res.json({ message: 'Hello Everyone!' })
        } catch (err) {
            // global error handler
            errorHandler(err, res);
        }
    }
}