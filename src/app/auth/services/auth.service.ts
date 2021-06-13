import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment'; //asegurar de importar de envirmont normal, cuando estemos en produccion lo modificamos
import { Auth } from '../interfaces/auth.interface';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root' // esta accedido por cualquier modulo de la app , esta provedido globalmente este servicio : esto es lo genial de los servicios
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined; // de momento cuando esta prop tiene valor segnifica que el user esta autenticado


  /*como _auth es privado - pero me gustaria mostrar la info del user autenticado en un componente - pues Creamos un getters que va ser injectado por el componente que desea la info del user autenticado
   tambien me gustaria que el guard : preteccion rutas  injecta auth*/
  get auth(): Auth {
    return { ...this._auth! } // lo desesstructuro para asegurarme que no se va cambiar de alguna manera
  }  // ! : es decir confia en mi siempre va tener un valor


  constructor(  private http: HttpClient // esta injeccion para hacer peticiones http a otros servidores

  ) { }

  /* sirva para verificar el estado de la autenticacion */
  verificaAutenticacion(): Observable<boolean> {
    // TODO : esta verificacion de momento no es segura : porque cualquier user avanzado crea una variable token con el nomber token y le psaa valor .la validacion segun tenemos va returnar true asi va poder acceder : asi antes de returnar true hacemos validaciones del token desde localstorage  recibido contra el backend

    if ( !localStorage.getItem('token') ) {
      /*si la funcion padre definida que va returnar Observable , segnifica todos los casos que pueden suceder dentro de ella , deben ser Observables emiten valor o valores
      por eso estoy usando la funcion of que produce un observable . */
      return of(false)
               .pipe(
                 tap(() => console.log('no token en localStorage - Bloqueado por AuthGuard - canLoad'))
               );
    }

    return this.http.get<Auth>(`${ this.baseUrl }/usuarios/1`)  // al hacer refresh se reinicia this_auth : debe notificarla de nuevo
              .pipe(

                map( auth => {  // map regresa la entrada transformada igual al map de los arreglos
                  this._auth = auth; // al hacer refresh se reinicia this_auth : debe notificarla de nuevo mantner la informacion viva en los componetes , tempalets
                  return true;
                }),


              );

  }



  login() {
    // cuando hacemos un request a un id user no existe va dar error , nostros intrepretamos este error como validacion no valida ,

    return this.http.get<Auth>(`${ this.baseUrl }/usuarios/1`) // emite observable de tipo Auth
           .pipe(
                // cuando Auth se esta saliendo del loguin hacia subscribe quiero almacenarlo en esta propiedad this._auth : para lograrlo tengo que pasarlo por el operador pipe

                tap( auth => this._auth = auth  ), // tap utulizado para generar efectos segunadarios - en este caso almacenar en la prop de este servicio class
                tap( auth => console.log('AUTHSERCICE', auth)),
                tap( auth => localStorage.setItem('token', auth.id ) ), // almacenar id del user autenticado en locastorage .-  uso: Mantener las session de usuario : es decir aunque hago refresh se mantiene en locastorage , para logout debe borrarlo

           ); /* es decir cuando se haga la peticion la emission antes de llegar al subscribe va a pasar por los metodos del pipe en secuencia , cada metodo recibe el producto del metodo interior asi hasta
          el producto del ultimo metodo en el pipe sera recibido en subscribe methodo */

  }

  lgins() {
     this._auth = undefined; // purgar objeto donde se elmacena user autenticado desde backend
  }



}



/* ng g s auth/services/auth --skip-Tests */


