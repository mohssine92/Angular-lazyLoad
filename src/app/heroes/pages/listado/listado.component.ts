import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [
  ]
})
export class ListadoComponent implements OnInit {

  constructor( private heroesService: HeroesService ) { }

  ngOnInit(): void {
    //observable
    this.heroesService.getHeroes()
       .subscribe( resp => console.log( resp ))
       // primer oyente , podemos tener n de oyentes implementado en classes de componentes en este caso mientras que el observable aloja en un Servicio provee desde root


  }

}
