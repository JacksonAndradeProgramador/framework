
'use client';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Menu } from '../componentes/Menu';
import { LinhaLivro } from '../componentes/LinhaLivro';
import styles from '../styles/Home.module.css';
import { Livro } from '../classes/modelo/Livro';

const baseURL = 'http://localhost:3000/api/livros';

const obterLivros = async (): Promise<Livro[]> => {
  const response = await fetch(baseURL);
  return response.json();
};

const excluirLivro = async (codigo: number): Promise<boolean> => {
  const response = await fetch(`${baseURL}/${codigo}`, {
    method: 'DELETE',
  });
  const result = await response.json();
  return result.ok;
};

export const LivroLista: React.FC = () => {
  const [livros, setLivros] = useState<Array<Livro>>([]);
  const [carregado, setCarregado] = useState<boolean>(false);

  useEffect(() => {
    if (!carregado) {
      obterLivros().then((data) => {
        setLivros(data);
        setCarregado(true);
      });
    }
  }, [carregado]);

  const excluir = async (codigo: number) => {
    const sucesso = await excluirLivro(codigo);
    if (sucesso) {
      setLivros(livros.filter(livro => livro.codigo !== codigo));
    } else {
      console.error('Falha ao excluir o livro');
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Lista de Livros</title>
        <meta name="description" content="Lista de livros disponíveis" />
      </Head>

      <Menu />

      <main className={styles.main}>
        <h1 className={styles.title}>Lista de Livros</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Resumo</th>
              <th>Editora</th>
              <th>Autores</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {livros.map((livro) => (
              <LinhaLivro
                key={livro.codigo}
                livro={livro}
                excluir={() => excluir(livro.codigo)}
              />
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};
