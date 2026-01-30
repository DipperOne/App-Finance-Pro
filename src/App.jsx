import './App.css';
import IncomeInput from './components/IncomeInput';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Dashboard from './components/Dashboard';
import { useFinance } from './contexts/FinanceContext';

function App() {
  const { income } = useFinance();

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100">
      <div className="pointer-events-none absolute -top-24 right-10 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 -translate-x-1/2 translate-y-1/3 rounded-full bg-sky-500/20 blur-3xl" />
      <header className="relative border-b border-white/10 bg-white/10 shadow-lg backdrop-blur">
        <div className="container mx-auto flex flex-col items-center gap-2 px-4 py-6 text-center sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-200/80">
            Planejamento pessoal
          </span>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">
            Nexo Financeiro
          </h1>
          <p className="max-w-2xl text-sm text-slate-200/80 sm:text-base">
            Visualize renda, despesas e metas em um painel elegante para organizar sua vida financeira.
          </p>
        </div>
      </header>
      <main className="container relative mx-auto px-4 py-10 sm:px-6 lg:px-8">
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
