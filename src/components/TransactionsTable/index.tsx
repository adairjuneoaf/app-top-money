import { useEffect } from "react";
import { Container } from "../TransactionsTable/styles";

export function TransactionsTable() {
  useEffect(() => {
    fetch("http://localhost:3000/api/transactions")
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Desenvolvimento de Website</td>
            <td className="input">R$ 12.000,00</td>
            <td>Desenvolvimento</td>
            <td>12/09/2021</td>
          </tr>

          <tr>
            <td>Aluguel de apartamento</td>
            <td className="output">- R$ 1.200,00</td>
            <td>Aluguel</td>
            <td>12/09/2021</td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
}
