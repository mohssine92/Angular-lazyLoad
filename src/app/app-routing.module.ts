import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { ErrorPageComponent } from './shared/error-page/error-page.component';


const routes: Routes = [
   {
     // si alguien navigue a tal routa , Cargue el modulo respectivo , recien configurado Routing a nivel interior en tal Module que se va cargar
     // auth es el prefijo para rutas de autenticacion , realmente se carga el modulo  que a su vez carga un componente por defecto
     path: 'auth',
     // esta es la cLave de lazyLoad : cargar modulo hijo .
     loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule ),

   },
   {
      path: 'heroes',
      loadChildren: () => import('./heroes/heroes.module').then( m => m.HeroesModule ), // proteger la carga de este modulo usando guard class : siempre cuando se intenta acceder a esta rutas se ejecuta primero guards definidos
      canLoad: [AuthGuard], // esta es la prop que me interesa en este caso , pregunto si puedo cargar modulo , no ruta hija o ... - uso guard , [] : especificar cuantos guards ... en form arreglo : es decir estouy previniedo que esta ruta cargue el modulo con sus rutas
      canActivate: [AuthGuard]  // previniendo que la ruta se activa , asi con la implemenatacion de estas dos props estoy segurando mi ruta
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
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
