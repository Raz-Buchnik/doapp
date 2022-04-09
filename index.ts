import express, { Application, Request, Response } from 'express'
import { Server } from 'http'
import { createClient } from 'redis'

const redisClient = createClient({
  url: process.env.redisConnectionString
})
redisClient.on('error', err => {
  console.log(`[Redis Error]:`, err)
})
let app: Application
let server: Server

redisClient.connect().then(() => {

  app = express()

  const port: number = 3008
  
  app.get('/', async (req: Request, res: Response) => {
  
    const date = new Date().toISOString()
  
    await redisClient.set('foo', 'bar')
  
    const foo = await redisClient.get('foo')

    console.log(`[process.env.foo]:`, process.env.foo)
  
    res.send(`Welcome!!! ${date}, ${process.env.TZ}, this is from redis: foo = ${foo}`)

    await redisClient.disconnect()
  
  })
  
  server = app.listen(port, () => {
    console.log(`[listen on port ${port}]`)
  })

}).catch(err => {
  console.log(`[couldnt connect to redis err]`, err)
})

process.on('SIGTERM', async () => {
  // console.log(`[sigterm received]`)
  // await redisClient.disconnect()
  // console.log(`[disconnected from redis!]`)
  // server.close()
  // console.log(`[disconnected from express server as well]`)
  console.log(`[sigterm received]`)
})
