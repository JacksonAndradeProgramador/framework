// components/LivroDados.tsx
import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Menu } from '../componentes/Menu';
import { ControleEditora } from '../controle/ControleEditora';
import styles from '../styles/Home.module.css';
import { Livro } from '../classes/modelo/Livro';


const controleEditora = new ControleEditora();
const baseURL = 'http://localhost:3000/api/livros';

const incluirLivro = async (livro: Livro): Promise<boolean> => {
  const response = await fetch(baseURL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(livro),
  });
  const result = await response.json();
  return result.ok;
};

export const LivroDados: React.FC = () => {
  const opcoes = controleEditora.getEditoras().map((editora) => ({
    value: editora.codEditora,
    text: editora.nome,
  }));

  const [titulo, setTitulo] = useState<string>('');
  const [resumo, setResumo] = useState<string>('');
  const [autores, setAutores] = useState<string>('');
  const [codEditora, setCodEditora] = useState<number>(opcoes[0]?.value || 0);
  const router = useRouter();

  const tratarCombo = (evento: React.ChangeEvent<HTMLSelectElement>) => {
    setCodEditora(Number(evento.target.value));
  };

  const incluir = async (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    const livro: Livro = {
      codigo: 0,
      titulo,
      resumo,
      autores: autores.split('\n'),
      codEditora,
    };

    const sucesso = await incluirLivro(livro);
    if (sucesso) {
      router.push('/livros');
    } else {
      console.error('Falha ao incluir o livro');
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Dados do Livro</title>
        <meta name="description" content="Formulário para incluir um novo livro" />
      </Head>

      <Menu />

      <main className={styles.main}>
        <h1 className={styles.title}>Dados do Livro</h1>
        <form onSubmit={incluir}>
          <div className="form-group">
            <label htmlFor="titulo">Título:</label>
            <input
              type="text"
              id="titulo"
              className="form-control"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="resumo">Resumo:</label>
            <textarea
              id="resumo"
              className="form-control"
              value={resumo}
              onChange={(e) => setResumo(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="autores">Autores (um por linha):</label>
            <textarea
              id="autores"
              className="form-control"
              value={autores}
              onChange={(e) => setAutores(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="editora">Editora:</label>
            <select
              id="editora"
              className="form-control"
              value={codEditora}
              onChange={tratarCombo}
            >
              {opcoes.map((editora) => (
                <option key={editora.value} value={editora.value}>
                  {editora.text}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary mt-3">
            Salvar
          </button>
        </form>
      </main>
    </div>
  );
};
