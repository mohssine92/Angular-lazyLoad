import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


// Router configuracion / carga perizoza : por demanda , de routas a nivel interio , conocidos rutas hijas
import { HeroesRoutingModule } from './heroes-routing.module';


// Components propios
import { AgregarComponent } from './pages/agregar/agregar.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { HomeComponent } from './pages/home/home.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { HeroeComponent } from './pages/heroe/heroe.component';




@NgModule({
  declarations: [
    AgregarComponent,
    BuscarComponent,
    HomeComponent,
    ListadoComponent,
    HeroeComponent
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule
  ]
})
export class HeroesModule { }
