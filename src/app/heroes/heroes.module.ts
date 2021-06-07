import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


// se va usar solamente en este modulo
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';

// Router configuracion / carga perizoza : por demanda , de routas a nivel interio , conocidos rutas hijas
import { HeroesRoutingModule } from './heroes-routing.module';



// Components propios asociados a rutas
import { AgregarComponent } from './pages/agregar/agregar.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { HomeComponent } from './pages/home/home.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { HeroeComponent } from './pages/heroe/heroe.component';


// Componentes cubran elementos
import { HeroeTarjetaComponent } from './components/heroe-tarjeta/heroe-tarjeta.component';
import { ConfirmarComponent } from './components/confirmar/confirmar.component';


// Pipes Perzonalzados
import { ImagenPipe } from './pipes/imagen.pipe';






@NgModule({
  declarations: [
    AgregarComponent,
    BuscarComponent,
    HomeComponent,
    ListadoComponent,
    HeroeComponent,
    HeroeTarjetaComponent,
    ImagenPipe,
    ConfirmarComponent

  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    HeroesRoutingModule,
    FormsModule
  ]
})
export class HeroesModule { }
