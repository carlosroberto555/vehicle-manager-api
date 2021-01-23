// import type { Request, Response } from 'express'
import mongoose from 'mongoose';

// export default (req: Request, res: Response, next: Function) => {
  const user = process.env.DB_USER
  const pass = process.env.DB_PASS
  const host = process.env.DB_HOST
  const name = process.env.DB_NAME

  mongoose.connect(`mongodb+srv://${user}:${pass}@${host}/${name}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true 
  });

  mongoose.connection.on('error', console.error.bind(console, 'Falha ao conectar-se ao banco de dados'))

  mongoose.connection.once('open', () => {
    console.log('Sucesso ao conectar-se ao banco de dados')
    // next()
  })
// }