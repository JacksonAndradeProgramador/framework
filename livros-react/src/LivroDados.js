//LivroDados.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { controleLivros } from './controle/ControleLivros';
import { controleEditora } from './controle/ControleEditora';

const LivroDados = () => {
  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [autores, setAutores] = useState('');
  const [codEditora, setCodEditora] = useState(1);

  const navigate = useNavigate();

  const tratarCombo = (event) => {
    setCodEditora(Number(event.target.value));
  };

  const incluir = (event) => {
    event.preventDefault();
    const novoLivro = {
      codigo: 0,
      titulo,
      resumo,
      codEditora,
      autores: autores.split('\n')
    };
    controleLivros.incluir(novoLivro);
    navigate('/'); // Navegar para a página de listagem
  };

  const opcoes = controleEditora.getEditoras().map(editora => ({
    value: editora.codEditora,
    text: editora.nome
  }));

  return (
    <main>
      <h1>Cadastro de Livro</h1>
      <form onSubmit={incluir}>
        <div className="mb-3">
          <label htmlFor="titulo" className="form-label">Título</label>
          <input
            type="text"
            className="form-control"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="resumo" className="form-label">Resumo</label>
          <textarea
            className="form-control"
            id="resumo"
            value={resumo}
            onChange={(e) => setResumo(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="editora" className="form-label">Editora</label>
          <select
            className="form-select"
            id="editora"
            value={codEditora}
            onChange={tratarCombo}
            required
          >
            {opcoes.map(opcao => (
              <option key={opcao.value} value={opcao.value}>
                {opcao.text}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="autores" className="form-label">Autores (1 por linha)</label>
          <textarea
            className="form-control"
            id="autores"
            value={autores}
            onChange={(e) => setAutores(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Salvar Dados</button>
      </form>
    </main>
  );
};

export default LivroDados;
