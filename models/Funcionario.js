const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FuncionarioSchema = new Schema({
  Nome: { type: String, required: true },
  Cargo: { type: String, required: true },
  Departamento: { type: String, required: true },
  Salario: { type: Number, required: true },
});

module.exports = mongoose.model('Funcionario', FuncionarioSchema);
