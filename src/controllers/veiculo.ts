import type { Request, Response } from 'express'
import Veiculo from '../models/veiculo'

// GET /v1/veiculos
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

// POST /v1/veiculos
async function create(req: Request, res: Response) {
  try {
    const veiculo = new Veiculo(req.body)
  
    res.json({
      success: true,
      data: await veiculo.save()
    })
  } catch (e) {
    // Se for uma placa duplicada
    if (e.code === 11000) {
      res.status(400)
      res.json({ success: false, error: `Já existe um veículo com a placa \`${req.body.placa}\`` })
    } else {
      res.json({ success: false, error: e.message })
    }
  }
}

// GET /v1/veiculos/:placa
async function read(req: Request, res: Response) {
  try {
    const placa = req.params.placa
    const veiculo = await Veiculo.findOne({ placa })
  
    if (!veiculo) {
      res.status(404)
      throw new Error(`Veículo com a placa \`${placa}\` não encontrado!`);
    }

    res.json({ success: true, data: veiculo })
  } catch (e) {
    res.json({ success: false, error: e.message })
  }
}

// PUT /v1/veiculos/:placa
async function update(req: Request, res: Response) {
  try {
    // A placa não pode ser atualizada
    if (req.body.placa) {
      delete req.body.placa
    }

    const placa = req.params.placa
    const veiculo = await Veiculo.findOneAndUpdate({ placa }, req.body, { new: true })

    if (!veiculo) {
      res.status(404)
      throw new Error(`Veículo com a placa \`${placa}\` não encontrado!`);
    }

    res.json({ success: true, data: veiculo })
  } catch (e) {
    res.json({ success: false, error: e.message })
  }
}

// DELETE /v1/veiculos/:placa
async function remove(req: Request, res: Response) {
  try {
    const placa = req.params.placa
    await Veiculo.deleteOne({ placa }, req.body)

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