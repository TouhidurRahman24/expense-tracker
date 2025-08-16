'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseChart from './components/ExpenseChart';

export default function Home() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [filterCategory, setFilterCategory] = useState('');
  const categories = ['Food', 'Transport', 'Shopping', 'Others'];

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/expenses');
      setExpenses(res.data);
    } catch (err) {
      console.error('Error fetching expenses:', err);
    }
  };

  const addOrUpdateExpense = async (expense) => {
    try {
      if (editingExpense) {
        const res = await axios.patch(`http://localhost:5000/expenses/${editingExpense._id}`, expense);
        setExpenses(expenses.map(exp => exp._id === res.data._id ? res.data : exp));
        setEditingExpense(null);
      } else {
        const res = await axios.post('http://localhost:5000/expenses', expense);
        setExpenses([...expenses, res.data]);
      }
    } catch (err) {
      console.error('Error saving expense:', err);
    }
  };

  const deleteExpense = async (id) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      try {
        await axios.delete(`http://localhost:5000/expenses/${id}`);
        setExpenses(expenses.filter(exp => exp._id !== id));
      } catch (err) {
        console.error('Error deleting expense:', err);
      }
    }
  };

  const editExpense = (expense) => {
    setEditingExpense(expense);
  };

  const totalAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const filteredExpenses = filterCategory
    ? expenses.filter(exp => exp.category === filterCategory)
    : expenses;

  return (
    <div className="container mx-auto p-4 max-w-4xl bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">Personal Expense Tracker</h1>
      
      <div className="mb-8 shadow-md rounded-lg bg-white p-6 border border-gray-200">
        <ExpenseForm 
          onSubmit={addOrUpdateExpense} 
          editingExpense={editingExpense}
          categories={categories}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="shadow-md rounded-lg bg-white p-6 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Expenses Overview</h2>
          <p className="text-xl mb-4 text-gray-800">Total Expenses: ${totalAmount.toFixed(2)}</p>
          
          <div className="mb-4">
            <label className="block mb-2 text-gray-700 font-medium">Filter by Category:</label>
            <select 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            >
              <option value="">All</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <ExpenseList 
            expenses={filteredExpenses} 
            onEdit={editExpense} 
            onDelete={deleteExpense}
            categories={categories}
          />
        </div>
        
        <div className="shadow-md rounded-lg bg-white p-6 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900">Expenses by Category</h2>
          <ExpenseChart expenses={expenses} />
        </div>
      </div>
    </div>
  );
}