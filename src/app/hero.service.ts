import { Injectable } from '@angular/core';
import axios from 'axios';
import { Libro } from '../models/Libro';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private apiUrl = 'http://localhost:3000/libro';

  constructor() { }
  
  async getData(): Promise<Array<Libro>> {
    
    return (await axios.get(this.apiUrl)).data;
    
  };


  httpPost(body : any): void {
    axios.post(this.apiUrl, body)
  };


  httpDelete(datos : number): void {

    const data = {

      "id" : datos
  
    }
    axios.delete(this.apiUrl, { data })
  };



  async modificar( body : any){

    return (await axios.put(this.apiUrl, body))
    
  }

}