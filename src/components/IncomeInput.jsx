import { useState } from 'react';
import { useFinance } from '../contexts/FinanceContext';

const IncomeInput = () => {
  const [localIncome, setLocalIncome] = useState('');
  const { setIncome } = useFinance();

  const handleSave = () => {
    const value = parseFloat(localIncome);
    if (!isNaN(value) && value > 0) {
      setIncome(value);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-2 text-xl font-semibold text-slate-900">Defina sua Renda Mensal</h2>
      <p className="mb-6 text-sm text-slate-500">
        Configure o valor base para acompanhar seus objetivos com clareza.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <input
          type="number"
          value={localIncome}
          onChange={(e) => setLocalIncome(e.target.value)}
          placeholder="Ex: 3500.50"
          className="w-full flex-grow rounded-xl border border-slate-300 bg-white p-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              handleSave();
            }
          }}
        />
        <button
          onClick={handleSave}
          className="w-full rounded-xl bg-teal-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 sm:w-auto"
        >
          Salvar
        </button>
      </div>
      <p className="mt-3 text-xs text-slate-400">Este é o ponto de partida para seu planejamento.</p>
    </div>
  );
};

export default IncomeInput;
