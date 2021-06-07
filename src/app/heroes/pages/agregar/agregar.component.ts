import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Heroe, Publisher } from '../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

// este componente fue importado aqui y enviado como argumento en una funcion - se considera componente hijo
// tambien se puede usar sus metodos aqui en las metodos que injecta
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;

    }
  `]
})
export class AgregarComponent implements OnInit {



 //- length! : number | undefined ;

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    },
  ];

  heroe: Heroe = {  // este es el objeto a cargar para subir a DB , hay que inicializar vacio , sino da error de estricto por la      interfaz  .
    // TODO: asi tambien se trata el Objeto de cardBank - validacion - etc ... lurgo tenemos una seccion de valifaciones .
    // id es opcinal , el id solo va existir si yo la cree en base de datos
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '', // espacio reservado para imagenes que voy a subir al servidor

  }

  constructor( private heroesService: HeroesService,
               private activatedRoute: ActivatedRoute, // Injeccion para Leer Url
               private router: Router, // poder navigar , navigacion programada
               private snackBar: MatSnackBar, // injeccion de servicio de snackbar , para mas detalles ve docs
               public dialog: MatDialog,



               ) { }

  ngOnInit(): void {
  //en ngOnit se aconseja hacer estos tipos de peticiones , mientras la app se esta construiendo se va haciendo peticiones http ...

    // console.log(this.router.url)  //Leer url - string
    // es decir si la ruta no incluye editar pos no queremos editar , no vamos a cargar objeto a editar
     if( !this.router.url.includes('editar') ) {
       return;

     }

      this.activatedRoute.params
         .pipe(

           switchMap( ({id}) => this.heroesService.getHeroePorId( id ) )
           // desestructurar id , retorno otra Observable

         )
         .subscribe( heroeToEdit => {

            this.heroe = heroeToEdit

          //   this.length = heroeToEdit.alt_img?.length;

         });

  }

  guardar() {
    // puntos de diferencia : si quiero editar voy a tener id en el objeto this.heroe , si quiero crear voy a tener undefined . para  condiciones


    if ( this.heroe.id ) {
      // Actualizar
      this.heroesService.actualizarHeroe( this.heroe )
           .subscribe( heroeUpdated => this.mostrarSnakbar('Registro actualizado 🍕💪 👑 🤙  ⭐️'));
        // TODO : todavia siguemos con el problema del pipe sl momento de actualizar la imagen , no preferemos el pure del pipe porque se va ejutar varias veces , tenemos como otra alternativa es cuando se actualiza redericcionamos hacia Leer mas

    } else { // this.heroe.id === undefined
      // Crear

      if(this.heroe.alt_img == ''){ // validacion para campo de image
        this.mostrarSnakbar('Campo Url vacio 💃');
        return; // return ropa el proceso y no deje crear , asi puedo implementar validacion hasta que el profesor nos esplica una manera mejor
      }

      this.heroesService.agregarHeroe( this.heroe )
            .subscribe( heroeCreated => {
                this.router.navigate(['/heroes/editar', heroeCreated.id ]);
                // coincidencia  this.mostrarSnakbar('Registro creado');
                this.mostrarSnakbar('Registro Creado 💃');
            })
    }

  }



  borrarHeroe(){ // no recibe args ya sabemos quien es el objeto a borrar  en este caso .

     // siempre antes de borrar entramos en dialogo con el user paraque nos confirma el delete , usamos dialog de angularMaterial

     // const dialog para almazenar return
     const dialog = this.dialog.open( ConfirmarComponent, {
        width: '250px',
        data: this.heroe // data es donde viaja la informacion del este componente hacia el componente hijo , si me objeto podra sufrir cambios por ref , y yo no quiero que se afectado use operador spreat {...this.heroe }

     });

    dialog.afterClosed().subscribe(
      (result) => {
        // console.log(result)
        if(result){

           this.heroesService.borrarHeroe( this.heroe.id! )  // ! Ts confia en siempre vas a tener un valor
                 .subscribe( resp => {
                   this.router.navigate(['/heroes']); // navigacion/redireccion programada
               });

        }

      }

    ) // TODO:una mejora a hacer notamos,tenemos una subscribe depende de otra subcribe : podemos usar un switchmap , luego veremos como lo implementamos






  }

  // tener en cuenta esta es una funcion , la puedo llamar atraves de un evento , o en cualquier linea de codigo dentro de un proceso de una funcion.
  mostrarSnakbar( mensaje: string ) {  // snackbar with message

    this.snackBar.open( mensaje, '😝' , {
      duration: 2500,
      horizontalPosition: 'right',
      verticalPosition: 'top'

    });

  }


}
