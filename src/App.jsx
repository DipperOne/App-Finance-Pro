import './App.css';
import IncomeInput from './components/IncomeInput';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Dashboard from './components/Dashboard';
import { useFinance } from './contexts/FinanceContext';

function App() {
  const { income } = useFinance();

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      <header className="bg-gray-800 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-center text-white">
            Nexo Financeiro
          </h1>
        </div>
      </header>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
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
