import type { Request, Response } from 'express'
import Veiculo from '../models/veiculo'

// POST /v1/veiculos/:placa/revisoes
async function create(req: Request, res: Response) {
  try {
    const placa = req.params.placa
    const veiculo = await Veiculo.findOne({ placa })
  
    if (!veiculo) {
      res.status(404)
      throw new Error(`Veículo com a placa \`${placa}\` não encontrado!`);
    }

    // Adiciona a revisão ao veículo
    veiculo.revisoes.push(req.body)

    res.json({
      success: true,
      data: await veiculo.save()
    })
  } catch (e) {
    res.json({ success: false, error: e.message })
  }
}

// GET /v1/veiculos/:placa/total-gasto
async function total_gasto(req: Request, res: Response) {
  try {
    const placa = req.params.placa

    const [ data ] = await Veiculo.aggregate([
      { $match: { placa }},
      { $unwind: '$revisoes' },
      {
        $group: {
          _id: '$placa',
          total_gasto: { $sum: '$revisoes.valor' } 
        }
      }
    ])

    if (!data) {
      res.status(404)
      throw new Error(`A placa \`${placa}\` não possui nenhuma revisão cadastrada!`);
    }

    res.json({ success: true, data })
  } catch (e) {
    res.json({ success: false, error: e.message })
  }
}

// GET /v1/marca/:marca/total-gasto
async function total_gasto_marca(req: Request, res: Response) {
  try {
    const marca = req.params.marca

    const [ data ] = await Veiculo.aggregate([
      { $match: { marca: new RegExp(`^${marca}$`, 'i') }},
      { $unwind: '$revisoes' },
      {
        $group: {
          _id: '$marca',
          total_gasto: { $sum: '$revisoes.valor' } 
        }
      }
    ])

    if (!data) {
      res.status(404)
      throw new Error(`A marca \`${marca}\` não possui nenhuma revisão cadastrada!`);
    }

    res.json({ success: true, data })
  } catch (e) {
    res.json({ success: false, error: e.message })
  }
}

export default {
  create,
  total_gasto,
  total_gasto_marca
}