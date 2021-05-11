import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';


const rourtes: Routes = [
   {
     // si alguien navigue a tal routa , Cargue el modulo respectivo , recien configurado Routing a nivel interior en tal Module que se va cargar
     // auth es el prefijo para rutas de autenticacion , realmente se carga el modulo  que a su vez carga un componente por defecto
     path: 'auth',
     // esta es la cLave de lazyLoad : cargar modulo hijo .
     loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
   },
   {
      path: 'heroes',
      loadChildren: () => import('./heroes/heroes.module').then( m => m.HeroesModule )
   },
   {
    path: '404',
    component: ErrorPageComponent
   },
   {
    path: '**',
    //component: ErrorPageComponent
    redirectTo: '404'
   }
]

@NgModule({
  imports: [
    RouterModule.forRoot( rourtes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
