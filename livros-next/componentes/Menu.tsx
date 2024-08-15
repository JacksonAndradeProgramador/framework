// components/Menu.tsx
import React from 'react';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Menu: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      
      <button 
        className="navbar-toggler" 
        type="button" 
        data-toggle="collapse" 
        data-target="#navbarNav" 
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link href="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link href="api/livros" className="nav-link">
              Catalogo
            </Link>
          </li>
          <li className="nav-item">
            {/* Link para página de detalhes - ajuste conforme a estrutura */}
            <Link href="/livros/1" className="nav-link">
              Novo
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
