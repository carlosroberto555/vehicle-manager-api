import mongoose, { Schema, Document } from 'mongoose';

export interface Veiculo extends Document {
  placa: string
  marca: string
  modelo: string
  cor: string
  ano_fabricacao: string
  data_cadastro: Date
  revisoes: Revisao[]
}

export interface Revisao extends Document {
  valor: Number
  data_revisao: Date
  observacao: String
}

const veiculoSchema = new Schema({
  placa: {
    type: String,
    unique: true,
    dropDups: true,
    uppercase: true,
    required: true,
    validate: /\w{3}\d{4}/
  },
  marca: { type: String, required: true },
  modelo: { type: String, required: true },
  cor: { type: String, required: true },
  ano_fabricacao: { type: String, validate: /\d{4}/, required: true },
  data_cadastro: { type: Date, default: Date.now },
  revisoes: [{
    valor: { type: Number, required: true },
    data_revisao: { type: Date, default: Date.now, required: true },
    observacao: { type: String }
  }]
});

export default mongoose.model<Veiculo>('Veiculo', veiculoSchema)