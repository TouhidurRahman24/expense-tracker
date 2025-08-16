import { format } from 'date-fns';

const ExpenseList = ({ expenses, onEdit, onDelete, categories }) => {
  const getCategoryColor = (category) => {
    switch (category) {
      case 'Food': return 'bg-green-200 text-green-800';
      case 'Transport': return 'bg-blue-200 text-blue-800';
      case 'Shopping': return 'bg-purple-200 text-purple-800';
      case 'Others': return 'bg-gray-200 text-gray-800';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">Amount</th>
            <th className="p-2 text-left">Category</th>
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length === 0 ? (
            <tr><td colSpan="5" className="p-2 text-center">No expenses found</td></tr>
          ) : (
            expenses.map(exp => (
              <tr key={exp._id} className="border-b">
                <td className="p-2">{exp.title}</td>
                <td className="p-2">${exp.amount.toFixed(2)}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded ${getCategoryColor(exp.category)}`}>
                    {exp.category}
                  </span>
                </td>
                <td className="p-2">{format(new Date(exp.date), 'yyyy-MM-dd')}</td>
                <td className="p-2">
                  <button onClick={() => onEdit(exp)} className="text-blue-500 mr-2">Edit</button>
                  <button onClick={() => onDelete(exp._id)} className="text-red-500">Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;