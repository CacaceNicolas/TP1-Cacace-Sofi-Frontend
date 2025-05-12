export class Libro {
   
    titulo: string;
    autor: string;
    paginas : number;
    id : number;

    constructor(id : number, paginas: number, titulo : string, autor:string) {
        this.autor = autor;
        this.titulo = titulo;
        this.paginas = paginas
        this.id = id
    }

}
  
  