const express = require('express');
const Expense = require('../models/Expense');
const router = express.Router();
router.post('/', async (req, res) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();

    res.status(201).send(expense);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.send(expenses);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!expense) return res.status(404).send({ error: 'Expense not found' });
    res.send(expense);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) return res.status(404).send({ error: 'Expense not found' });
    res.send({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;