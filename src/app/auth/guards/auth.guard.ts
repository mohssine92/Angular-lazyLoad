import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';





@Injectable({
  providedIn: 'root'
})  /* donde se coloca este guard ? : lo voy a poner en mi systema de routas princiapl en este caso , puede poner en cualquier ruta : aveces no queremos proteger ciertas rutas y otras si */
export class AuthGuard implements CanLoad, CanActivate { //implementacion de interface  CanLoad  : asi  estoy usando su metodo de forma directa en mi clase


  constructor( private authService: AuthService, // esta injeccion para obtener la prop'undefined' que tendra objeto del user autenticado en caso que se ha autenticado correctamente desde un backend
               private router: Router  // en caso no se aprobo el acceso : se bloquea la pantalla . debo sacar al user


               ) {}


  /* cuando el modulo no esta cargado - ver network : no hay rutas activadas a validar , asi se ejecuta la funcion  canLoad
   * puesto que el modulo cargado despues de su validaciones : la validaciones sera a nivel de rutas activadas al carga del modulo y seran las validaciones en atraves de esta funcion .
  */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  {

      return this.authService.verificaAutenticacion()
                .pipe(
                    tap((estaAutenticado) => console.log(estaAutenticado)),
                    tap( estaAutenticado => {
                      if( !estaAutenticado ) {
                        this.router.navigate(['./auth/login']);
                      }
                    })
                )

   /*   console.log('Bloqueado por AuthGuard - canActivate')
     return false; */

  }// activar ruta : si returna false no se va poder acceder a la ruta activada por lazyload : por aver podido acceder a la carga del modulo donde esta alojada esta ruta : ruta activada .



  /*  esta instruccion de CanLoad solo restringe que se cargue el modulo , asi cuando se carga por lazyload aunque purgamos despues objeto user autenticado : referencia condicion para caragar
      el modulo y accedere  a sus rutas , se accede porque el modulo fue cargado asi es no es suficiente para proteger ruta ver video 220 min 12  y  debe occupar canActive tambien para completar
      la seguridad de acceso .. - nunca se deja canLoad como segurida de mi aplicacion nunaca jamas
   */
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean  {

      // ojo aqui se concidera la salida del observable sin usar subscribe - no olividar que la salida del 0bservable interna esta conectada a un pipe  😎
      return this.authService.verificaAutenticacion()
               .pipe(
                 tap((estaAutenticado) => console.log(estaAutenticado)), // la idea cuandos se hace logout se barra la variable de localstorage : asi returna false
                 tap( estaAutenticado => {
                     if( !estaAutenticado ) {
                      this.router.navigate(['./auth/login']);
                     }
                 })
           );

       //  console.log('Bloqueado por AuthGuard - canLoad')

    } // puede cargar modulo




}


/*  ng g guard auth/guards/auth --skip-tests  */
/* es otro servicio nos va a servir para implementar reglas de validacion en las routas y modulo que consta de rutas  */
