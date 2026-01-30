import './App.css';
import IncomeInput from './components/IncomeInput';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Dashboard from './components/Dashboard';
import { useFinance } from './contexts/FinanceContext';

function App() {
  const { income } = useFinance();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="container mx-auto flex flex-col items-center gap-2 px-4 py-6 text-center sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Planejamento pessoal
          </span>
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Nexo Financeiro
          </h1>
          <p className="max-w-2xl text-sm text-slate-500 sm:text-base">
            Visualize renda, despesas e metas em um painel elegante para organizar sua vida financeira.
          </p>
        </div>
      </header>
      <main className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-8">
          {income === 0 ? (
            <IncomeInput />
          ) : (
            <>
              <Dashboard />
              <ExpenseForm />
              <ExpenseList />
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
