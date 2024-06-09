const express = require('express');
const Funcionario = require('../models/Funcionario');
const router = express.Router();

/**
 * @swagger
 * /api/funcionarios:
 *   get:
 *     summary: Retorna todos os funcionários.
 *     tags: [Funcionários]
 *     responses:
 *       '200':
 *         description: Sucesso ao obter a lista de funcionários.
 *       '500':
 *         description: Erro ao obter a lista de funcionários.
 */

/**
 * @swagger
 * /api/funcionarios/{id}:
 *   get:
 *     summary: Retorna um funcionário por ID.
 *     tags: [Funcionários]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do funcionário a ser obtido.
 *     responses:
 *       '200':
 *         description: Sucesso ao obter o funcionário.
 *       '404':
 *         description: Funcionário não encontrado.
 *       '500':
 *         description: Erro ao obter o funcionário.
 */

/**
 * @swagger
 * /api/funcionarios:
 *   post:
 *     summary: Cria um novo funcionário.
 *     tags: [Funcionários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Funcionario'
 *     responses:
 *       '201':
 *         description: Funcionário criado com sucesso.
 *       '400':
 *         description: Erro ao criar o funcionário.
 *       '500':
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /api/funcionarios/{id}:
 *   put:
 *     summary: Atualiza um funcionário por ID.
 *     tags: [Funcionários]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do funcionário a ser atualizado.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Funcionario'
 *     responses:
 *       '200':
 *         description: Funcionário atualizado com sucesso.
 *       '400':
 *         description: Erro ao atualizar o funcionário.
 *       '404':
 *         description: Funcionário não encontrado.
 *       '500':
 *         description: Erro interno do servidor.
 */

/**
 * @swagger
 * /api/funcionarios/{id}:
 *   delete:
 *     summary: Exclui um funcionário por ID.
 *     tags: [Funcionários]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID do funcionário a ser excluído.
 *     responses:
 *       '200':
 *         description: Funcionário excluído com sucesso.
 *       '404':
 *         description: Funcionário não encontrado.
 *       '500':
 *         description: Erro interno do servidor.
 */


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


