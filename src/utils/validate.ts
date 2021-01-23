function placa(value: string) {
  if (!value || !/\w{3}\d{4}/.test(value)) {
    throw new Error(`A placa \`${value}\` não é válida!`);
  }
}

export default {
  placa
}