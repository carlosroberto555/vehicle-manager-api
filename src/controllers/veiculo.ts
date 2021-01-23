import type { Request, Response } from 'express'
import Veiculo from '../models/veiculo'

async function list(req: Request, res: Response) {
  const query: any = {}

  // Filtra a marca com regex caso tenha sido informada
  if (req.query.marca) {
    query.marca = new RegExp(`${req.query.marca}`, 'i')
  }

  // Filtra a cor com regex caso tenha sido informada
  if (req.query.cor) {
    query.cor = new RegExp(`${req.query.cor}`, 'i')
  }

  try {
    res.json({
      success: true,
      data: await Veiculo.find(query)
    })
  } catch (e) {
    res.json({ success: false, error: e.message })
  }
}

async function create(req: Request, res: Response) {
  try {
    const veiculo = new Veiculo(req.body)
  
    res.json({
      success: true,
      data: await veiculo.save()
    })
  } catch (e) {
    res.json({ success: false, error: e.message })
  }
}

async function read(req: Request, res: Response) {
  try {
    const veiculo = await Veiculo.findOne({ placa: req.params.placa })
  
    if (!veiculo) {
      throw new Error(`Veículo com a placa ${req.params.placa} não encontrado!`);
    }

    res.json({
      success: true,
      data: veiculo
    })
  } catch (e) {
    res.json({ success: false, error: e.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    const veiculo = await Veiculo.findOneAndUpdate({ placa: req.params.placa }, req.body, { new: true })

    if (!veiculo) {
      throw new Error(`Veículo com a placa ${req.params.placa} não encontrado!`);
    }

    res.json({
      success: true,
      data: veiculo
    })
  } catch (e) {
    res.json({ success: false, error: e.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    await Veiculo.deleteOne({ placa: req.params.placa }, req.body)
    res.json({ success: true })
  } catch (e) {
    res.json({ success: false, error: e.message })
  }
}

export default {
  list,
  create,
  read,
  update,
  remove
}