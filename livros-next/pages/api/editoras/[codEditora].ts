import type { NextApiRequest, NextApiResponse } from 'next';
import { controleEditora } from '.';

// Define a assinatura do handler
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Verifica o método da requisição
    if (req.method === 'GET') {
      // Recupera o parâmetro codEditora da URL e converte para number
      const { codEditora } = req.query;
      const codEditoraNumber = Array.isArray(codEditora) ? parseInt(codEditora[0]) : parseInt(codEditora);

      // Verifica se a conversão foi bem-sucedida
      if (isNaN(codEditoraNumber)) {
        return res.status(400).json({ error: 'Invalid codEditora' });
      }

      // Obtém o nome da editora usando o método getNomeEditora
      const nomeEditora = controleEditora.getNomeEditora(codEditoraNumber);

      // Verifica se a editora foi encontrada
      if (nomeEditora) {
        // Retorna o nome da editora com status 200
        res.status(200).json({ nome: nomeEditora });
      } else {
        // Retorna status 404 se a editora não for encontrada
        res.status(404).json({ error: 'Editora não encontrada' });
      }
    } else {
      // Retorna status 405 para método não permitido
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    // Retorna status 500 para exceções ocorridas no servidor
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
