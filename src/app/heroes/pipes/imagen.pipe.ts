import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../pages/interfaces/heroes.interface';


@Pipe({
  name: 'imagen',
 // pure: false 208 - por lo memento no me interesa tener esta funcionalidad . porque mi pipe se va disparando varias veces , luego veremos que alternativa tiene profe para nosotros
})
export class ImagenPipe implements PipeTransform {



 /*transform() se dispra en este caso cuando arg Heroe object se cambio occupa nuevo espacio en la memoria pero en el caso cuando nosotros cambiamos propiedad
  interna del objeto Hero esto no segnifica que el objeto heroe cambio asi el pipe no se va disparar , para resolver este conviniente nosotros vamos a cambiar
  comportamiento del pipe , vamos a configurar pure en false es decir , el pipe apartir de ahora se dispara su funcion transform cada vez que el Ciclo de
  de deteccion de  cambios de angular se dispare .   */
  transform( heroe: Heroe): string {
    // TODO : como alternativa mandarle otro argumento al pipe para decir heey hay que actualizarlo , asi que se vuelva a procesar el procidimiento


    // console.log('Pipe imagen se proceso');

    if( !heroe.id && !heroe.alt_img ) {

      return 'assets/no-image.png';

    } else if ( heroe.alt_img ) {

      return heroe.alt_img;

    } else {

      return `assets/heroes/${ heroe.id }.jpg`;
    }


  }

}
