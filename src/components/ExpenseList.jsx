import { useFinance } from '../contexts/FinanceContext';

const ExpenseList = () => {
  const { expenses } = useFinance();

  if (expenses.length === 0) {
    return (
      <div className="bg-white shadow-sm rounded-xl p-6 text-center text-gray-500">
        <p>Nenhuma despesa adicionada ainda.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-xl">
      <h2 className="text-xl font-semibold text-gray-900 p-6">Histórico de Despesas</h2>
      <ul className="divide-y divide-gray-200">
        {expenses.map((expense) => (
          <li key={expense.id} className="flex justify-between items-center px-6 py-4 hover:bg-gray-50 transition-colors duration-150">
            <div>
              <p className="font-medium text-gray-800">{expense.description}</p>
              <p className="text-sm text-gray-500">{expense.category}</p>
            </div>
            <p className="font-semibold text-rose-600">
              - {expense.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
