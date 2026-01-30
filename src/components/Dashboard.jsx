import { useMemo } from 'react';
import { useFinance } from '../contexts/FinanceContext';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowUpCircleIcon, ArrowDownCircleIcon, ScaleIcon } from '@heroicons/react/24/outline';
import colors from 'tailwindcss/colors';

const COLORS = [colors.indigo[500], colors.sky[500], colors.amber[500], colors.rose[500], colors.emerald[500], colors.violet[500], colors.slate[500]];

const SummaryCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className="flex items-center space-x-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
    <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${colorClass}`}>
      <Icon className="h-6 w-6 text-white" />
    </div>
    <div>
      <h3 className="text-sm font-medium text-slate-500">{title}</h3>
      <p className="text-2xl font-bold text-slate-900">
        {value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </p>
    </div>
  </div>
);

const Dashboard = () => {
  const { income, expenses } = useFinance();

  const { totalExpenses, balance, dataForChart } = useMemo(() => {
    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    const balance = income - totalExpenses;

    const groupedByCategory = expenses.reduce((acc, expense) => {
      const { category, amount } = expense;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += amount;
      return acc;
    }, {});

    const dataForChart = Object.keys(groupedByCategory).map(category => ({
      name: category,
      value: groupedByCategory[category],
    }));

    return { totalExpenses, balance, dataForChart };
  }, [income, expenses]);

  return (
    <div className="space-y-8">
      <div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
            <p className="text-sm text-slate-500">
              Uma visão geral do seu desempenho financeiro atual.
            </p>
          </div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Atualizado em tempo real
          </span>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard title="Renda Mensal" value={income} icon={ArrowUpCircleIcon} colorClass="bg-emerald-500" />
          <SummaryCard title="Total de Despesas" value={totalExpenses} icon={ArrowDownCircleIcon} colorClass="bg-rose-500" />
          <SummaryCard title="Saldo Restante" value={balance} icon={ScaleIcon} colorClass={balance >= 0 ? 'bg-teal-500' : 'bg-amber-500'} />
        </div>
      </div>

      {/* Chart */}
      {dataForChart.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-center text-lg font-semibold text-slate-900">Despesas por Categoria</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={dataForChart}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                >
                  {dataForChart.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
