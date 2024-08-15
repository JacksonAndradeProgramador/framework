import type { NextApiRequest, NextApiResponse } from 'next';
import { controleLivros } from '.';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'DELETE') {
      // Captura o código do livro da URL
      const { codigo } = req.query;

      if (typeof codigo !== 'string') {
        return res.status(400).json({ error: 'Código inválido' });
      }

      const codigoNumero = parseInt(codigo);

      if (isNaN(codigoNumero)) {
        return res.status(400).json({ error: 'Código deve ser um número' });
      }

      // Exclui o livro do vetor usando o método excluir
      controleLivros.excluir(codigoNumero);

      // Retorna mensagem de sucesso
      res.status(200).json({ message: 'Livro excluído com sucesso' });
    } else {
      // Retorna status 405 para método não permitido
      res.setHeader('Allow', ['DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    // Retorna status 500 para exceções ocorridas no servidor
    console.error('Internal Server Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


/*import type { NextApiRequest, NextApiResponse } from 'next';
import { controleLivro } from '.';

export default (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const codigo = parseInt(req.query.codigo as string);

        if (req.method === 'DELETE') {
            controleLivro.excluir(codigo);
            return res.status(200).json({ message: 'Livro excluído com sucesso.' });
        } else {
            res.setHeader('Allow', ['DELETE']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        return res.status(500).json({ message: 'Erro no servidor.' });
    }
};
*/