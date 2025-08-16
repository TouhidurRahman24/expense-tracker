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
        <tr className="bg-gray-100 text-gray-800">
          <th className="p-3 text-left font-medium">Title</th>
          <th className="p-3 text-left font-medium">Amount</th>
          <th className="p-3 text-left font-medium">Category</th>
          <th className="p-3 text-left font-medium">Date</th>
          <th className="p-3 text-left font-medium">Actions</th>
        </tr>
      </thead>
      <tbody>
        {expenses.length === 0 ? (
          <tr><td colSpan="5" className="p-3 text-center text-gray-600">No expenses found</td></tr>
        ) : (
          expenses.map((exp, index) => (
            <tr key={exp._id} className={`border-b hover:bg-gray-50 transition duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
              <td className="p-3 text-gray-900">{exp.title}</td>
              <td className="p-3 text-gray-900">${exp.amount.toFixed(2)}</td>
              <td className="p-3">
                <span className={`px-2 py-1 rounded text-sm font-medium ${getCategoryColor(exp.category)}`}>
                  {exp.category}
                </span>
              </td>
              <td className="p-3 text-gray-900">{format(new Date(exp.date), 'yyyy-MM-dd')}</td>
              <td className="p-3">
                <button onClick={() => onEdit(exp)} className="text-blue-600 hover:text-blue-800 mr-3 font-medium">Edit</button>
                <button onClick={() => onDelete(exp._id)} className="text-red-600 hover:text-red-800 font-medium">Delete</button>
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