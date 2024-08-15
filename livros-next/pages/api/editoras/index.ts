import type { NextApiRequest, NextApiResponse } from 'next';
import ControleEditora from '../../../classes/controle/ControleEditora';

export const controleEditora = new ControleEditora();

// Define a assinatura do handler
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      // Obtém o vetor de editoras usando o método getEditoras
      const editoras = controleEditora.getEditoras();

      if (editoras) {
        // Retorna o vetor de editoras com status 200
        res.status(200).json(editoras);
      } else {
        // Retorna status 404 se nenhuma editora for encontrada (embora isso não deva ocorrer com GET Editoras)
        res.status(404).json({ error: 'No editoras found' });
      }
    } else {
      // Retorna status 405 para método não permitido
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    // Retorna status 500 para exceções ocorridas no servidor
    console.error('Internal Server Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
