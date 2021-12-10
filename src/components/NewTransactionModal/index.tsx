import Modal from "react-modal";
import { Container, RadioBox, TransactionTypeContent } from "../NewTransactionModal/styles";

import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { FormEvent, useContext, useState } from "react";
import { useTransactions } from "../../hooks/useTransactions";

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();

  const [description, setDescription] = useState("");
  const [amount, setValue] = useState(0);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("input");

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      description,
      amount,
      category,
      type,
    });

    setDescription("");
    setValue(0);
    setCategory("");
    setType("input");

    onRequestClose();
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} overlayClassName="react-modal-overlay" className="react-modal-content">
      <button type="button" onClick={onRequestClose} className="react-modal-close">
        <img src={closeImg} alt="close-img" />
      </button>
      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Cadastrar novo lançamento</h2>
        <input type="text" placeholder="Descrição" value={description} onChange={(event) => setDescription(event.target.value)} />
        <input type="number" placeholder="Valor" value={amount} onChange={(event) => setValue(Number(event.target.value))} />

        <TransactionTypeContent>
          <RadioBox
            type="button"
            isActive={type === "input"}
            activeColor="green"
            onClick={() => {
              setType("input");
            }}
          >
            <img src={incomeImg} alt="income-icon" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            isActive={type === "output"}
            activeColor="red"
            onClick={() => {
              setType("output");
            }}
          >
            <img src={outcomeImg} alt="outcome-icon" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContent>

        <input type="text" placeholder="Categoria" value={category} onChange={(event) => setCategory(event.target.value)} />
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
}
