const express = require('express');
const Funcionario = require('../models/Funcionario');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const funcionarios = await Funcionario.find();
    res.json(funcionarios);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const funcionario = await Funcionario.findById(req.params.id);
    if (!funcionario)
      return res.status(404).json({ message: 'Funcionario não encontrado' });
    res.json(funcionario);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  const funcionario = new Funcionario({
    Nome: req.body.Nome,
    Cargo: req.body.Cargo,
    Departamento: req.body.Departamento,
    Salario: req.body.Salario,
  });
  try {
    const newFuncionario = await funcionario.save();
    res.status(201).json(newFuncionario);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedFuncionario = await Funcionario.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!updatedFuncionario)
      return res.status(404).json({ message: 'Funcionario não encontrado' });
    res.json(updatedFuncionario);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedFuncionario = await Funcionario.findByIdAndDelete(req.params.id);
    if (!deletedFuncionario)
      return res.status(404).json({ message: 'Funcionario não encontrado' });
    res.json({ message: 'Funcionario deletado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
