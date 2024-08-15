class ControleEditora {
    private editoras = [
        { codEditora: 1, nome: "Alta Books" },
        { codEditora: 2, nome: "person" },
        { codEditora: 3, nome: "Addison Wesley" }
    ];
  
    getEditoras(): { id: number; nome: string }[] {
      return this.editoras;
    }
  
    getNomeEditora(codEditora: number): string | null {
      const editora = this.editoras.find(e => e.codEditora === codEditora);
      return editora ? editora.nome : null;
    }
  }
  
  export default ControleEditora;
  
  