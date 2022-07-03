import { useState } from "react";
import { Dashboard } from "./components/Dashboard";
import Modal from 'react-modal'
import { Header } from "./components/Header";
import { NewTransacrionModal } from "./components/NewTransactionModal";
import { GlobalStyle } from "./styles/global";


Modal.setAppElement('#root');


export function App() {
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen ] = useState(false);

  function handleOpenNewTransactionModal (){
    setIsNewTransactionModalOpen(true);
  }

  function handleCloseNewTransactionModal (){
    setIsNewTransactionModalOpen(false);
  }


  return (
    <>
        <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
        <Dashboard />
        <NewTransacrionModal 
        isOpen={isNewTransactionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
        />


        <GlobalStyle />
    </>
  );
}
