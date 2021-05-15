import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';





@Injectable({
  providedIn: 'root'
   // esta proviendo desde el modulo princial asi esta formando parte de del modulo princiapl aunque no estan importado , estan importados en el background de appAngular , por declara
   // esta prop , asi donde sean alojados dentro del app se pertenece al modulo principal . asi pueden hacer uso de httpclient que se encuentra atterizado en app modul princiapl .
})
export class HeroesService {

  constructor( private http: HttpClient) { }

  getHeroes(): Observable<object>{
   // Fuente es JsonServer NPM
   return this.http.get('http://localhost:3000/heroes')



    /* return forkJoin([
       this.RestServer.get('http://localhost:3000/heroes'),
       this.RestServer.get('http://localhost:3000/usuarios')
       ])
   */

  }


}
