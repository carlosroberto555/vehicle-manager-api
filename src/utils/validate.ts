import type { Request, Response } from 'express'

function placa(req: Request, res: Response, next: Function) {
  const placa = req.params.placa

  if (placa && /\w{3}\d{4}/.test(placa)) {
    // Coloca em uppercase
    req.params.placa = placa.toUpperCase()

    // Vai para o próximo midleware
    next()
  } else {
    res.status(400)
    res.json({ success: false, error: `A placa \`${placa}\` não é válida!` })
  }
}

export default {
  placa
}