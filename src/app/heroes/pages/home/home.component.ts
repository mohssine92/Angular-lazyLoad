import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
    .container{
       margin: 10px
    }

  `
  ]
})
export class HomeComponent implements OnInit {


  get auth() { // que interesante este getter : es similar a la prop computada de laravel
    return this.authService.auth;
  }


  constructor( private router: Router, //porque esta injeccion : porque en este caso cuando se loguea el user , necesito redericcionar
               private authService: AuthService

  ) { }

  ngOnInit(): void {
  }

  logout () {
    this.router.navigate(['auth']);
  }

}
