import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import closeImg from '../../assets/close.svg'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import { useTransactions } from '../../hooks/useTransactions';
import { Container, TransactionTypeContainer, TransactionBox } from './styles';


interface NewTransacrionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransacrionModal({ isOpen, onRequestClose}: NewTransacrionModalProps) {
const { createTransaction } = useTransactions();

const [type, setType] = useState('deposit');
const [title, setTitle] = useState('');
const [amount, setAmount] = useState(0);
const [category, setCategory] = useState('');

async function handleCreateNewTransaction(event: FormEvent){
  event.preventDefault();

  await createTransaction({
    title,
    amount,
    category,
    type,
  })

  setTitle('');
  setAmount(0);
  setCategory('');
  setType('deposit');
  onRequestClose();
}

return (
  <Modal 
  isOpen={isOpen} 
  onRequestClose={onRequestClose}
  overlayClassName= "react-modal-overlay"
  className="react-modal-content"
  >
    <button type='button' onClick={onRequestClose} className="react-modal-close">
      <img src={closeImg} alt="close modal" />
    </button>
    <Container onSubmit={handleCreateNewTransaction}>
     <h2>Cadastrar transação</h2>
    <input
      placeholder='Titulo'
      value={title}
      onChange= {event => setTitle(event.target.value)}
    />
    
    <input
     type="number"
     placeholder='Valor'
     value={amount}
     onChange= {event => setAmount(Number(event.target.value))}
    />


    <TransactionTypeContainer>
      <TransactionBox 
        type="button"
        onClick={() => {setType('deposit')}}
        isActive={type === 'deposit'}
        activeColor="green"
      >
       <img src={incomeImg} alt="income" />
       <span>Entrada</span>
      </TransactionBox>

      <TransactionBox 
        type="button"
        onClick={() => {setType('outcome')}}
        isActive={type === 'outcome'}
        activeColor="red"
      >
       <img src={outcomeImg} alt="outcome" />
       <span>Saida</span>
      </TransactionBox>
      
    </TransactionTypeContainer>

    <input
      placeholder='Categoria'
      value={category}
      onChange= {event => setCategory(event.target.value)}
    />


    <button type="submit">
      Cadastrar
    </button>

    </Container>
  </Modal>
  );  
}
