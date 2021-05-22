import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../interfaces/heroes.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [`
  `
  ]
})
export class BuscarComponent implements OnInit {

  termino: string  = '';
  heroes: Heroe[] = [];
  heroeSeleccionado: Heroe | undefined;

  constructor( private heroesService: HeroesService,
               private router: Router,
    ) { }

  ngOnInit(): void {
  }


  buscando() {
    /* this.heroesService.getSugerencias( this.termino.trim() )
      .subscribe( heroes => this.heroes = heroes ); */
      // en esta altura se condiciona la colleccion para mandar mensaje .. etc
      this.heroesService.getSugerencias( this.termino )
                 .subscribe( heroes => this.heroes = heroes );

  }

  opcionSeleccionada( event: MatAutocompleteSelectedEvent ) {


    // capa validacion
    if(!event.option.value) {
      this.heroeSeleccionado = undefined;
      return;
    }

    // extrerlo , mismo termino de antes
    const heroe: Heroe = event.option.value;
    this.termino = heroe.superhero; // corregir la apariencia de strin de objeto en input

    this.heroesService.getHeroePorId( heroe.id! )
      .subscribe( heroe =>{
          this.heroeSeleccionado = heroe
          this.router.navigate([`/heroes/${ heroe.id }`]);  // si anula esta linea tendre objeto heroe en la mis vista en formato json

      }); // objeto
  }

}

