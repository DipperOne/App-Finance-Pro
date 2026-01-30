import { createContext, useState, useContext, useEffect } from 'react';

const FinanceContext = createContext();

export const useFinance = () => {
  return useContext(FinanceContext);
};

export const FinanceProvider = ({ children }) => {
  // Initialize state from localStorage or with default values
  const [income, setIncome] = useState(() => {
    const savedIncome = localStorage.getItem('finance-income');
    return savedIncome ? JSON.parse(savedIncome) : 0;
  });
  
  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem('finance-expenses');
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  // Effect to save income to localStorage
  useEffect(() => {
    localStorage.setItem('finance-income', JSON.stringify(income));
  }, [income]);

  // Effect to save expenses to localStorage
  useEffect(() => {
    localStorage.setItem('finance-expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses((prevExpenses) => [...prevExpenses, { ...expense, id: Date.now() }]);
  };
  
  // The context value that will be provided to consuming components
  const value = {
    income,
    setIncome,
    expenses,
    addExpense,
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};
