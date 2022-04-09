import express, { Request, Response } from 'express'
import { createClient } from 'redis'

const app = express()

const port: number = 3008

app.get('/', async (req: Request, res: Response) => {

  const date = new Date().toISOString()

  const redisClient = createClient()
  redisClient.on('error', err => {
    console.log(`[Redis Error]:`, err)
  })

  await redisClient.connect()

  await redisClient.set('foo', 'bar')

  const foo = await redisClient.get('foo')

  res.send(`Welcome!!!! ${date}, ${process.env.TZ}, this is from redis: foo = ${foo}`)

})

app.listen(port, () => {
  console.log(`[listen on port ${port}]`)
})