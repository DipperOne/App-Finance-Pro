import { useMemo } from 'react';
import { useFinance } from '../contexts/FinanceContext';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowUpCircleIcon, ArrowDownCircleIcon, ScaleIcon } from '@heroicons/react/24/outline';
import colors from 'tailwindcss/colors';

const COLORS = [colors.indigo[500], colors.sky[500], colors.amber[500], colors.rose[500], colors.emerald[500], colors.violet[500], colors.slate[500]];

const SummaryCard = ({ title, value, icon: Icon, colorClass }) => (
  <div className="flex items-center space-x-4 rounded-2xl border border-white/10 bg-white/10 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur">
    <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${colorClass}`}>
      <Icon className="h-6 w-6 text-white" />
    </div>
    <div>
      <h3 className="text-sm font-medium text-slate-300">{title}</h3>
      <p className="text-2xl font-bold text-white">
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
            <h2 className="text-2xl font-bold text-white">Dashboard</h2>
            <p className="text-sm text-slate-200/80">
              Uma visão geral do seu desempenho financeiro atual.
            </p>
          </div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">
            Atualizado em tempo real
          </span>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard title="Renda Mensal" value={income} icon={ArrowUpCircleIcon} colorClass="bg-emerald-400/90" />
          <SummaryCard title="Total de Despesas" value={totalExpenses} icon={ArrowDownCircleIcon} colorClass="bg-rose-400/90" />
          <SummaryCard title="Saldo Restante" value={balance} icon={ScaleIcon} colorClass={balance >= 0 ? 'bg-indigo-400/90' : 'bg-amber-400/90'} />
        </div>
      </div>

      {/* Chart */}
      {dataForChart.length > 0 && (
        <div className="rounded-2xl border border-white/10 bg-white/10 p-6 shadow-2xl shadow-slate-950/40 backdrop-blur">
          <h3 className="mb-4 text-center text-lg font-semibold text-white">Despesas por Categoria</h3>
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
                <Tooltip
                  formatter={(value) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid rgba(148, 163, 184, 0.3)' }}
                  itemStyle={{ color: '#e2e8f0' }}
                  labelStyle={{ color: '#e2e8f0' }}
                />
                <Legend wrapperStyle={{ color: '#e2e8f0' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
