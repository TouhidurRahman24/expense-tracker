import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';

const ExpenseForm = ({ onSubmit, editingExpense, categories }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);
      setAmount(editingExpense.amount.toString());
      setCategory(editingExpense.category);
      setDate(new Date(editingExpense.date));
    } else {
      resetForm();
    }
  }, [editingExpense]);

  const resetForm = () => {
    setTitle('');
    setAmount('');
    setCategory(categories[0]);
    setDate(new Date());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, amount: parseFloat(amount), category, date });
    if (!editingExpense) resetForm();
  };

return (
  <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
    <h2 className="text-xl font-semibold mb-4 text-gray-900">{editingExpense ? 'Edit Expense' : 'Add Expense'}</h2>
    
    <div className="mb-4">
      <label className="block mb-1 text-gray-700 font-medium">Title</label>
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
        required 
        minLength={3}
      />
    </div>
    
    <div className="mb-4">
      <label className="block mb-1 text-gray-700 font-medium">Amount</label>
      <input 
        type="number" 
        value={amount} 
        onChange={(e) => setAmount(e.target.value)} 
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
        required 
        min={0.01}
        step="0.01"
      />
    </div>
    
    <div className="mb-4">
      <label className="block mb-1 text-gray-700 font-medium">Category</label>
      <select 
        value={category} 
        onChange={(e) => setCategory(e.target.value)} 
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
        required
      >
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
    
    <div className="mb-4">
      <label className="block mb-1 text-gray-700 font-medium">Date</label>
      <DatePicker 
        selected={date} 
        onChange={(date) => setDate(date)} 
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
        required
      />
    </div>
    
    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
      {editingExpense ? 'Update' : 'Add'}
    </button>
  </form>
);
};

export default ExpenseForm;