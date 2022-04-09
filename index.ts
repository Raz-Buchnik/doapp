import express, { Request, Response } from 'express'
import { createClient } from 'redis'

const redisClient = createClient({
  url: process.env.DATABASE_URL
})
redisClient.on('error', err => {
  console.log(`[Redis Error]:`, err)
})

const app = express()

const port: number = 3008

app.get('/', async (req: Request, res: Response) => {

  const date = new Date().toISOString()

  await redisClient.connect()

  await redisClient.set('foo', 'bar')

  const foo = await redisClient.get('foo')

  res.send(`Welcome!!!! ${date}, ${process.env.TZ}, this is from redis: foo = ${foo}`)

})

app.listen(port, () => {
  console.log(`[listen on port ${port}]`)
})