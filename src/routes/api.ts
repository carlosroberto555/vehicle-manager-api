import express from 'express'

import veiculo from '../controllers/veiculo'
import revisao from '../controllers/revisao'
import validate from '../utils/validate'

const router = express.Router()

// Descrição da API
router.get('/', (req, res) => res.json({
  name: 'Vehicle Manager API',
  version: '1.0.0',
  docs: req.protocol + '://' + req.get('host') + req.originalUrl + '/docs'
}))

// Endpoints de CRUD de veículos
router.get('/veiculos', veiculo.list)
router.post('/veiculos', veiculo.create)
router.get('/veiculos/:placa', validate.placa, veiculo.read)
router.put('/veiculos/:placa', validate.placa, veiculo.update)
router.delete('/veiculos/:placa', validate.placa, veiculo.remove)

// Endpoints das revisões
router.post('/veiculos/:placa/revisoes', validate.placa, revisao.create)
router.get('/veiculos/:placa/total-gasto', validate.placa, revisao.total_gasto)
router.get('/marca/:marca/total-gasto', revisao.total_gasto_marca)

export default router