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
    <div className="bg-white shadow-sm rounded-xl p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Defina sua Renda Mensal</h2>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <input
          type="number"
          value={localIncome}
          onChange={(e) => setLocalIncome(e.target.value)}
          placeholder="Ex: 3500.50"
          className="w-full flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              handleSave();
            }
          }}
        />
        <button
          onClick={handleSave}
          className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          Salvar
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-2">Este é o ponto de partida para seu planejamento.</p>
    </div>
  );
};

export default IncomeInput;

