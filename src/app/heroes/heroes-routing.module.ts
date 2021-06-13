import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { AgregarComponent } from './pages/agregar/agregar.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { HeroeComponent } from './pages/heroe/heroe.component';
import { HomeComponent } from './pages/home/home.component';



const routes: Routes = [
  {
    path: '',
    component: HomeComponent, // si lo declaramos , declaramos router-outlet en su tempalte ./ beneficios: tener plantilla indepiendientes del modulo en que estamos .
    children: [
      {
        path: 'listado',
        component: ListadoComponent
      },
      {
        path: 'agregar',
        component: AgregarComponent // observamos 2 rutas diferentes caragan mismo componente
      },
      {
        path: 'editar/:id',
        component:AgregarComponent // observamos 2 rutas diferentes caragan mismo componente
      },
      {
        path: 'buscar',
        component: BuscarComponent
      },
      {
        path: ':id',
        component: HeroeComponent
      },
      {
        path: '**',
        redirectTo : 'listado'
      }
    ]
  }
]





@NgModule({

  imports: [
    RouterModule.forChild( routes ) // esta funcion cuando se trata de rutas hijas .
  ],
  exports: [
    RouterModule
  ]
})
export class HeroesRoutingModule { }
