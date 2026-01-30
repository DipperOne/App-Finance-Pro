import { useFinance } from '../contexts/FinanceContext';

const ExpenseList = () => {
  const { expenses } = useFinance();

  if (expenses.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/10 p-6 text-center text-slate-200 shadow-2xl shadow-slate-950/40 backdrop-blur">
        <p>Nenhuma despesa adicionada ainda.</p>
        <p className="mt-2 text-sm text-slate-300">
          Comece registrando seus gastos para ver seu histórico aqui.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/10 shadow-2xl shadow-slate-950/40 backdrop-blur">
      <div className="border-b border-white/10 p-6">
        <h2 className="text-xl font-semibold text-white">Histórico de Despesas</h2>
        <p className="mt-1 text-sm text-slate-200/80">
          Acompanhe cada gasto para manter o controle em dia.
        </p>
      </div>
      <ul className="divide-y divide-white/10">
        {expenses.map((expense) => (
          <li
            key={expense.id}
            className="flex flex-col gap-2 px-6 py-4 transition duration-150 hover:bg-white/5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-medium text-white">{expense.description}</p>
              <p className="text-sm text-slate-300">{expense.category}</p>
            </div>
            <p className="font-semibold text-rose-300">
              - {expense.amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
