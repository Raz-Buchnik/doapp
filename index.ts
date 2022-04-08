import express, { Request, Response } from 'express'

const app = express()

const port: number = 3008

app.get('/', (req: Request, res: Response) => {

  const date = new Date().toISOString()

  res.send(`Welcome!!!! ${date}`)

})

app.listen(port, () => {
  console.log(`[listen on port ${port}]`)
})