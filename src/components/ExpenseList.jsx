import { useFinance } from '../contexts/FinanceContext';

const ExpenseList = () => {
  const { expenses } = useFinance();

  if (expenses.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center text-slate-600 shadow-sm">
        <p>Nenhuma despesa adicionada ainda.</p>
        <p className="mt-2 text-sm text-slate-400">
          Comece registrando seus gastos para ver seu histórico aqui.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-6">
        <h2 className="text-xl font-semibold text-slate-900">Histórico de Despesas</h2>
        <p className="mt-1 text-sm text-slate-500">
          Acompanhe cada gasto para manter o controle em dia.
        </p>
      </div>
      <ul className="divide-y divide-slate-200">
        {expenses.map((expense) => (
          <li
            key={expense.id}
            className="flex flex-col gap-2 px-6 py-4 transition duration-150 hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-medium text-slate-900">{expense.description}</p>
              <p className="text-sm text-slate-500">{expense.category}</p>
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
