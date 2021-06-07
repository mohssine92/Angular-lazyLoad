import { Component, Input, OnInit } from '@angular/core';

import { Heroe } from '../../pages/interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styles: [`
   mat-card {
      margin-top: 20px;
    }
   `
  ]


})
export class HeroeTarjetaComponent   {

  // recibir data del componente padre para consumir dentro de este componente
  @Input() heroe!: Heroe;






}
