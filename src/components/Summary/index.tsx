import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import totalImg from "../../assets/total.svg";

import { Container } from "../Summary/styles";

export function Summary() {
  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="income-img" />
        </header>
        <strong>R$ 1.000,00</strong>
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="outcome-img" />
        </header>
        <strong>- R$ 550,00</strong>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="total-img" />
        </header>
        <strong>R$ 450,00</strong>
      </div>
    </Container>
  );
}
