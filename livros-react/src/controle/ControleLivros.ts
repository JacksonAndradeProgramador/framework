// ControleLivros.ts
import { Livro } from '../modelo/Livro';

export class ControleLivros {
    private livros: Array<Livro> = [
        {
            codigo: 1,
            codEditora: 1,
            titulo: "Use a cabeça: Java",
            resumo: "Use a Cabeça! Java é uma experiência completa de aprendizado em programação orientada a objetos(OO) e Java",
            autores: ["Bert Bates", "Kathy Sierra"]
        },
        {
            codigo: 2,
            codEditora: 2,
            titulo: "Java, como programar",
            resumo: "Milhões de alunos e profissionais aprenderam programação e desenvolvimento de software com os livros de Deitel",
            autores: ["Paul Deitel", "Harvey Deitel"]
        },
        {
            codigo: 3,
            codEditora: 3,
            titulo: "Vitória",
            resumo: "Sem sacrifício não existe vitória",
            autores: ["Octimus Prime"]
        }
    ];

    obterLivros(): Array<Livro> {
        return this.livros;
    }

    incluir(novoLivro: Livro): void {
        const novoCodigo = this.livros.length > 0 
            ? Math.max(...this.livros.map(livro => livro.codigo)) + 1 
            : 1;
        novoLivro.codigo = novoCodigo;
        this.livros.push(novoLivro);
    }

    excluir(codigo: number): void {
        this.livros = this.livros.filter(livro => livro.codigo !== codigo);
    }
}

// Instância global
export const controleLivros = new ControleLivros();
