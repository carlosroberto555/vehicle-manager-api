import express from 'express'
import logger from 'morgan'
import 'dotenv/config'
import './config/mongodb'

import apiRoute from './routes/api'

const app = express()

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rota da API versão 1.0
app.use('/v1', apiRoute)

// Listen on port 3000 or any other passed from argument
app.listen(process.env.PORT || 3000)