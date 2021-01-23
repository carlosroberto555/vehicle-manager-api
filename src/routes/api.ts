import express from 'express'

import veiculo from '../controllers/veiculo'
import revisao from '../controllers/revisao'

const router = express.Router()

// Descrição da API
router.get('/', (req, res) => res.json({
  name: 'Vehicle Manager API',
  version: '1.0.0'
}))

// Endpoints de CRUD de veículos
router.get('/veiculos', veiculo.list)
router.post('/veiculos', veiculo.create)
router.get('/veiculos/:placa', veiculo.read)
router.put('/veiculos/:placa', veiculo.update)
router.delete('/veiculos/:placa', veiculo.remove)

// Endpoints das revisões
router.post('/veiculos/:placa/revisoes', revisao.create)
router.get('/veiculos/:placa/total-gasto', revisao.total_gasto)
router.get('/marca/:marca/total-gasto', revisao.total_gasto_marca)

export default router