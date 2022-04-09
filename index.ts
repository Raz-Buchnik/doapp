import express, { Request, Response } from 'express'

const app = express()

const port: number = 3008

app.get('/', (req: Request, res: Response) => {

  const date = new Date().toISOString()

  console.log(req.headers)
  console.log(req.ip)

  console.log(`[process.env.global]:`, process.env.global)
  console.log(`[process.env.foo]:`, process.env.foo)

  res.send(`Welcome!!!! ${date}, ${process.env.TZ}`)

})

app.listen(port, () => {
  console.log(`[listen on port ${port}]`)
})