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

  const inputStyles = "w-full rounded-xl border border-white/10 bg-white/10 p-3 text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-400";

  return (
    <div className="rounded-2xl border border-white/10 bg-white/10 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur">
      <h2 className="mb-2 text-xl font-semibold text-white">Adicionar Nova Despesa</h2>
      <p className="mb-6 text-sm text-slate-200/80">
        Registre cada gasto para visualizar tendências e ajustar seu orçamento.
      </p>
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
          className="w-full rounded-xl bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-400 px-6 py-3 font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:from-indigo-400 hover:via-sky-400 hover:to-cyan-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
        >
          Adicionar Despesa
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
