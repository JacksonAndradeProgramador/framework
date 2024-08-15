import React, { useState, useEffect, useCallback } from 'react';
import { controleLivros } from './controle/ControleLivros';
import { ControleEditora } from './controle/ControleEditora';

const controleEditora = new ControleEditora();

const LinhaLivro = (props) => {
  const { livro, excluir } = props;
  const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

  return (
    <tr>
      <td>
        {livro.titulo}
        <br/>
        <button onClick={() => excluir(livro.codigo)}>Excluir</button>
      </td>
      <td>{livro.resumo}</td>
      <td>{nomeEditora}</td>
      <td>
        <ul>
          {livro.autores.map((autor, index) => (
            <li key={index}>{autor}</li>
          ))}
        </ul>
      </td>
    </tr>
  );
};

const LivroLista = () => {
  const [livros, setLivros] = useState([]);

  // Função para atualizar a lista de livros
  const atualizarLivros = useCallback(() => {
    const livrosAtualizados = controleLivros.obterLivros();
    setLivros(livrosAtualizados);
  }, []);

  useEffect(() => {
    atualizarLivros(); // Carregar a lista inicial

    // Retorna uma função de limpeza para efeitos colaterais, se necessário
    return () => {};
  }, [atualizarLivros]);

  const excluir = (codigo) => {
    controleLivros.excluir(codigo);
    atualizarLivros(); // Atualiza a lista após exclusão
  };

  if (livros.length === 0) {
    return <p>Nenhum livro encontrado.</p>;
  }

  return (
    <main>
      <h1>Catálogo de Livros</h1>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Resumo</th>
            <th>Editora</th>
            <th>Autores</th>
          </tr>
        </thead>
        <tbody>
          {livros.map((livro) => (
            <LinhaLivro
              key={livro.codigo}
              livro={livro}
              excluir={excluir}
            />
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default LivroLista;
