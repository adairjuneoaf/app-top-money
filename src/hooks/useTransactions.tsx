import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

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

// Maneiras diferentes de TIPAR as informações que serão repassadas pelo modal.
// Podemos criar uma nova interface com apenas a informação que recebemos, OU
//                                                                          ↓
// interface TransactionInput {                                             ↓
//   description: string;                                                   ↓
//   amount: number;                                                        ↓
//   type: string;                                                          ↓
//   category: string;                                                      ↓
// }                                                                        ↓
//                                                                          ↓
// Podemos utilizar uma TIPAGEM do TS para isso, no caso utilizando funções como OMIT ou PICK.
//

type TransactionInput = Omit<Transaction, "id" | "createAt">;

export const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactionsProvider({ children }: TransacrionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get("/transactions").then((response) => setTransactions(response.data.transactions));
  }, []);

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post("/transactions", { ...transactionInput, createAt: new Date() });
    const { transaction } = response.data;

    console.log({ transaction, transactions });

    setTransactions([...transactions, transaction]);
  }

  return <TransactionsContext.Provider value={{ transactions, createTransaction }}>{children}</TransactionsContext.Provider>;
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}
