import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
  img {
    width: 100%;
    height: 70%;
    border-radius: 5px;
  }
`]
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;

  constructor( private activatedRoute : ActivatedRoute ,
               private heroesService  : HeroesService,
               private router: Router,
             ) { }


  ngOnInit(): void {
    // .subscribe(({ id }) => console.log(id));   desestructuracion , porque observable de params emite objeto , ami me hace falto so el id en este caso

     this.activatedRoute.params
     .pipe(

      switchMap( ({ id }) => this.heroesService.getHeroePorId(id) )

    )
    .subscribe( heroe => this.heroe = heroe );
  }

  regresar() {
    this.router.navigate(['/heroes/listado']);
  }



}
