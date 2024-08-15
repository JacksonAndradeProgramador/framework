import { Editora } from '../modelo/Editora';

export class ControleEditora {
    // Variável contendo um array de objetos do tipo Editora
    private editoras: Array<Editora> = [
        { codEditora: 1, nome: "Alta Books" },
        { codEditora: 2, nome: "person" },
        { codEditora: 3, nome: "Addison Wesley" }
    ];

    // Método que retorna o array de editoras
    getEditoras(): Array<Editora> {
        return this.editoras;
    }

    // Método que retorna o nome da editora com base no código
    getNomeEditora(codEditora: number): string {
        const editora = this.editoras.filter(editora => editora.codEditora === codEditora);
        return editora.length > 0 ? editora[0].nome : "Editora não encontrada";
    }
}
// Instância global exportada
export const controleEditora = new ControleEditora();
