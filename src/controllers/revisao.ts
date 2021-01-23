import type { Request, Response } from 'express'
import Veiculo from '../models/veiculo'

async function create(req: Request, res: Response) {
  try {
    const veiculo = await Veiculo.findOne({ placa: req.params.placa })
  
    if (!veiculo) {
      throw new Error(`Veículo com a placa ${req.params.placa} não encontrado!`);
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

async function total_gasto(req: Request, res: Response) {
  try {
    const veiculo = await Veiculo.findOne({ placa: req.params.placa })
  
    if (!veiculo) {
      throw new Error(`Veículo com a placa ${req.params.placa} não encontrado!`);
    }

    // TODO: calcular total gasto
  } catch (e) {
    res.json({ success: false, error: e.message })
  }
}

async function total_gasto_marca(req: Request, res: Response) {
  try {
    const veiculos = await Veiculo.find({ marca: req.params.marca })
  
    if (!veiculos) {
      throw new Error(`Nenhum veículo com a marca ${req.params.marca} foi encontrado!`);
    }

    // TODO: calcular total gasto
  } catch (e) {
    res.json({ success: false, error: e.message })
  }
}

export default {
  create,
  total_gasto,
  total_gasto_marca
}