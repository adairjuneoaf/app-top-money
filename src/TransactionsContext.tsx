import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "./services/api";

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: string;
  category: string;
  createAt: string;
}

interface TransacrionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

type TransactionInput = Omit<Transaction, "id" | "createAt">;

export const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactionsProvider({ children }: TransacrionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get("/transactions").then((response) => setTransactions(response.data.transactions));
  }, []);

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post("/transactions", transactionInput);
    const { transaction } = response.data;

    console.log({ transaction, transactions });

    setTransactions([...transactions, transaction]);
  }

  return <TransactionsContext.Provider value={{ transactions, createTransaction }}>{children}</TransactionsContext.Provider>;
}
