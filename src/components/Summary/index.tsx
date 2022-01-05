import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import totalImg from "../../assets/total.svg";
import { useTransactions } from "../../hooks/useTransactions";

import { Container } from "../Summary/styles";

export function Summary() {
  const { transactions } = useTransactions();

  const totalInputs = transactions.reduce((acc, transaction) => {
    if (transaction.type === "input") {
      return acc + transaction.amount;
    }

    return acc;
  }, 0);

  const totalOutputs = transactions.reduce((acc, transaction) => {
    if (transaction.type === "output") {
      return acc + transaction.amount;
    }

    return acc;
  }, 0);

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "input") {
        acc.inputs += transaction.amount;
        acc.total += transaction.amount;
      } else {
        acc.outputs += transaction.amount;
        acc.total -= transaction.amount;
      }

      return acc;
    },
    { inputs: 0, outputs: 0, total: 0 }
  );

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="income-img" />
        </header>
        <strong>{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(summary.inputs)}</strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="outcome-img" />
        </header>
        <strong>- {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(summary.outputs)}</strong>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="total-img" />
        </header>
        <strong>{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(summary.total)}</strong>
      </div>
    </Container>
  );
}
