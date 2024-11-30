import React from 'react';
import logo from './logo.svg';
import './App.css';
import { TicketRaiser } from './componts/Chat';

function App() {
  const clientId = 123;
  const apiEndpoint = 'http://localhost:3010/api/tickets/createFmsTicket'
  return (
    <>
      <TicketRaiser
        appClientId={clientId}
        apiEndpoint={apiEndpoint}
      />
    </>
  );
}

export default App;
