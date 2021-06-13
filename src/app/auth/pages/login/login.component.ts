import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent  {

  constructor( private router: Router, //porque esta injeccion : porque en este caso cuando se loguea el user , necesito redericcionar
               private authService: AuthService

  ) { }

  login() {

    /* request al backend : para regresar usuario existente , deberia tener un unsuario y este usuario debe estar almacenado en algun lugar : este lugar sera un servicio , porque en servicio : porque
       tiene que estar disponible : porque en todo momento voy a necesitar saber que usuario esta moviendo en la aplicacion  */

    this.authService.login()  // recuerde poraque este observabel se dispare alguien tiene que estar susbscrito
            .subscribe( resp => {
               console.log(resp);

                if ( resp.id ) { // Ojo si no hubiera declarado tipado que emita la observable login , el res.id : sera undefined : erro .

                  this.router.navigate(['./heroes']);

               }

            })



  }

  loginsin(){
    this.authService.lgins();
    this.router.navigate(['heroes']);
  }



}
