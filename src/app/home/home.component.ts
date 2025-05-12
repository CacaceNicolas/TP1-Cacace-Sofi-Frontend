import { Component } from '@angular/core';
import { HeroService } from '../hero.service';
import { Libro } from '../../models/Libro';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})


export class HomeComponent {
  datos:Array<Libro>=new Array<Libro>;
  idMod : number = 0;
  popUp : boolean = false;

  mensajeNotificacion: string = '';
  mostrarNotificacion: boolean = false;

  constructor(private apiService: HeroService) {}


  protected Titulo = new FormControl<String>('')
  protected Autor = new FormControl<String>('')
  protected Paginas = new FormControl<Number>(0)


  protected TituloMod = new FormControl<String>('')
  protected AutorMod = new FormControl<String>('')
  protected PaginasMod = new FormControl<Number>(0)

  mostrarMensaje(mensaje: string) {
    this.mensajeNotificacion = mensaje;
    this.mostrarNotificacion = true;
    setTimeout(() => {
      this.mostrarNotificacion = false;
      this.mensajeNotificacion = '';
    }, 3000); // 3 segundos de cooldown
  }

  botonModificar(id : number, titulo : string, paginas : number, autor : string){
    this.idMod = id
    this.popUp = true
    this.TituloMod.setValue(titulo)
    this.AutorMod.setValue(autor)
    this.PaginasMod.setValue(paginas)

    
  }
  


  async botonAceptarModificacion() {
    const body = {
      "id": this.idMod,
      "titulo": this.TituloMod.value,
      "autor": this.AutorMod.value,
      "paginas": this.PaginasMod.value
    };

    this.popUp = false;
    try {
      const response = await this.apiService.modificar(body);
      console.log('Libro modificado:', response);
      this.mostrarMensaje('Libro modificadou');
      this.recogerDatos();
    } catch (error: any) {
      console.error('Hubo un error al modificar el libro:', error);
      this.mostrarMensaje('No se pudo modificar el libro :('); 
    }
  }


  recogerDatos(){
     this.apiService.getData().then(v =>{
      this.datos = v;
     })
  }


  agregarLibro(){



    const body = {

      "titulo" : this.Titulo.value,
      "autor" : this.Autor.value,
      "paginas" : this.Paginas.value
  
    }

    try {
    
      const response = this.apiService.httpPost(body)

      console.log('Libro borrado:', response);
      this.mostrarMensaje('Libro cargadoo');
      this.recogerDatos();
    }catch(error:any){
      console.error('Error al borrar el libro:', error);
      this.mostrarMensaje('ERRORRR, SU LIBRO NO SE AH! BORRADO (sadge)'); 
    }

  }


  async borrarLibro(id: number) {
    try {
      const response = await this.apiService.httpDelete(id);

      console.log('Libro borrado:', response);
      this.mostrarMensaje('Libro borrado :)');
      this.recogerDatos();
    } catch (error: any) {
      console.error('Error al borrar el libro:', error);
      this.mostrarMensaje('Error al borrar el libro'); 
    }
  }


}
