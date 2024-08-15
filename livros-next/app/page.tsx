
import Head from 'next/head';
import { Menu } from '../componentes/Menu';
import styles from '../styles/Home.module.css'; // Importar os estilos
//import { LivroLista } from '../pages/LivroLista';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Next</title>
        <meta name="description" content="Página inicial" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Menu /> 

      <main className={styles.main}> {/* Aplicando o estilo styles.main */}
        <h1 className={styles.title}>Página Inicial</h1> {/* Aplicando o estilo styles.title */}
       
      </main>
    </div>
  );
}

