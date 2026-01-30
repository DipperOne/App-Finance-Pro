import { useState } from 'react';
import { useFinance } from '../contexts/FinanceContext';

const categories = [
  'Moradia',
  'Alimentação',
  'Transporte',
  'Saúde',
  'Educação',
  'Lazer',
  'Outros',
];

const ExpenseForm = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const { addExpense } = useFinance();

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = parseFloat(amount);
    if (!description || isNaN(value) || value <= 0) {
      // Basic validation feedback could be added here
      return;
    }
    addExpense({ description, amount: value, category });
    setDescription('');
    setAmount('');
  };

  const inputStyles = "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500";

  return (
    <div className="bg-white shadow-sm rounded-xl p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Adicionar Nova Despesa</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrição (ex: Supermercado)"
            className={inputStyles}
            required
          />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Valor (ex: 250.50)"
            className={inputStyles}
            required
          />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={inputStyles}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Adicionar Despesa
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
