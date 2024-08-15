/*import 'bootstrap/dist/css/bootstrap.css';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <>
    <Head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <Component {...pageProps} />
    </>
  )
  


}

export default MyApp;
*/
// pages/_app.tsx
// pages/index.tsx
import Head from 'next/head';
import { Menu } from '../componentes/Menu'; // Certifique-se de que o caminho está correto
import styles from '../styles/Home.module.css'; // Certifique-se de que o caminho está correto

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Loja Next</title>
        <meta name="description" content="Página inicial da Loja Next" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Menu />

      <main className={styles.main}>
        <h1 className={styles.title}>Página Inicial</h1>
      </main>
    </div>
  );
}



