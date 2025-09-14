import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Plateforme E-commerce</h1>
        <p>
          Bienvenue sur notre plateforme e-commerce multi-vendeurs.
        </p>
        <div className="features">
          <h2>Fonctionnalités</h2>
          <ul>
            <li>🏪 Marketplace multi-vendeurs</li>
            <li>🛒 Panier intelligent</li>
            <li>💳 Paiements sécurisés (Stripe, PayPal)</li>
            <li>🤖 Chatbot IA 24/7</li>
            <li>📱 Interface responsive</li>
            <li>🔐 Sécurité renforcée</li>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;