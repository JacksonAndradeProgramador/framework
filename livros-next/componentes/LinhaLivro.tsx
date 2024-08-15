// components/LinhaLivro.tsx
import React from 'react';
import { Livro } from '../classes/modelo/Livro';
import ControleEditora  from '../classes/controle/ControleEditora';

// Definindo a instância de ControleEditora
const controleEditora = new ControleEditora(); // Certifique-se de que esta linha está correta

interface LinhaLivroProps {
  livro: Livro;
  excluir: (codigo: number) => void;
}

export const LinhaLivro: React.FC<LinhaLivroProps> = (props) => {
  const { livro, excluir } = props;
  const nomeEditora = controleEditora.getNomeEditora(livro.codEditora);

  return (
    <tr>
      <td>
        {livro.titulo}
        <br />
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
