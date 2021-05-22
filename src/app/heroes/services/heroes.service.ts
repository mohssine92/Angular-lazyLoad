import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Heroe } from '../pages/interfaces/heroes.interface';
import { environment } from 'src/environments/environment';





@Injectable({
  providedIn: 'root'
   // esta proviendo desde el modulo princial asi esta formando parte de del modulo princiapl aunque no estan importado , estan importados en el background de appAngular , por declara
   // esta prop , asi donde sea alojado dentro del app se pertenece al modulo principal . asi pueden hacer uso de httpclient que se encuentra atterizado en app modul princiapl .
})
export class HeroesService {

  private baseUrl: string = environment.baseUrl;

  constructor( private http: HttpClient) { }

  getHeroes(): Observable<Heroe[]> {
   // Fuente es JsonServer NPM
   return this.http.get<Heroe[]>(`${this.baseUrl}/heroes`)

    /* return forkJoin([
       this.RestServer.get('http://localhost:3000/heroes'),
       this.RestServer.get('http://localhost:3000/usuarios')
       ])
   */
  }

  getHeroePorId( id: string ):Observable<Heroe> {
    return this.http.get<Heroe>(`${this.baseUrl}/heroes/${ id }`);  // regresa un objeto
  }

  getSugerencias( termino: string ): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${ this.baseUrl }/heroes?q=${ termino }&_limit=6`);
    // coincidencia aprox en todas las props de todo objetos existen en la coleccion del modelo
  }



}
