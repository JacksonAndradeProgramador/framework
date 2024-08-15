import type { NextApiRequest, NextApiResponse } from 'next';
import { controleLivros } from '../../../classes/controle/ControleLivros'; // Ajuste o caminho conforme necessário
import { Livro } from '../../../classes/modelo/Livro'; // Ajuste o caminho conforme necessário

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      // Obtém o vetor de livros usando o método obterLivros
      const livros = controleLivros.obterLivros();
      res.status(200).json(livros);
    } else if (req.method === 'POST') {
      // Captura os dados do livro do corpo da requisição
      const novoLivro: Livro = req.body;

      // Verifica se o livro tem todos os dados necessários
      if (!novoLivro || !novoLivro.titulo || !novoLivro.codEditora || !novoLivro.autores || !novoLivro.resumo) {
        return res.status(400).json({ error: 'Dados do livro incompletos' });
      }

      // Inclui o livro no vetor de livros
      controleLivros.incluir(novoLivro);

      // Retorna mensagem de sucesso
      res.status(200).json({ message: 'Livro incluído com sucesso' });
    } else {
      // Retorna status 405 para método não permitido
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    // Retorna status 500 para exceções ocorridas no servidor
    console.error('Internal Server Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


/*import type { NextApiRequest, NextApiResponse } from 'next';

// Simulando uma classe de controle para Livros
class ControleLivro {
    private livros = [
        { codigo: 1, titulo: 'Livro A', autor: 'Autor A', editora: 1 },
        { codigo: 2, titulo: 'Livro B', autor: 'Autor B', editora: 2 },
        { codigo: 3, titulo: 'Livro C', autor: 'Autor C', editora: 3 }
    ];

    obterLivros() {
        return this.livros;
    }

    incluir(livro: { codigo: number; titulo: string; autor: string; editora: number }) {
        this.livros.push(livro);
    }

    excluir(codigo: number) {
        this.livros = this.livros.filter(livro => livro.codigo !== codigo);
    }
}

// Criando uma instância do controlador de livros
export const controleLivro = new ControleLivro();

export default (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'GET') {
            const livros = controleLivro.obterLivros();
            return res.status(200).json(livros);
        } else if (req.method === 'POST') {
            const novoLivro = req.body;
            controleLivro.incluir(novoLivro);
            return res.status(200).json({ message: 'Livro incluído com sucesso.' });
        } else {
            res.setHeader('Allow', ['GET', 'POST']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        return res.status(500).json({ message: 'Erro no servidor.' });
    }
};
*/