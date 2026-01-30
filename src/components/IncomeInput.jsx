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
    <div className="rounded-2xl border border-white/10 bg-white/10 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur">
      <h2 className="mb-2 text-xl font-semibold text-white">Defina sua Renda Mensal</h2>
      <p className="mb-6 text-sm text-slate-200/80">
        Configure o valor base para acompanhar seus objetivos com clareza.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <input
          type="number"
          value={localIncome}
          onChange={(e) => setLocalIncome(e.target.value)}
          placeholder="Ex: 3500.50"
          className="w-full flex-grow rounded-xl border border-white/10 bg-white/10 p-3 text-white placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              handleSave();
            }
          }}
        />
        <button
          onClick={handleSave}
          className="w-full rounded-xl bg-gradient-to-r from-indigo-500 via-sky-500 to-cyan-400 px-6 py-3 font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:from-indigo-400 hover:via-sky-400 hover:to-cyan-300 focus:outline-none focus:ring-2 focus:ring-sky-400 sm:w-auto"
        >
          Salvar
        </button>
      </div>
      <p className="mt-3 text-xs text-slate-300">Este é o ponto de partida para seu planejamento.</p>
    </div>
  );
};

export default IncomeInput;
