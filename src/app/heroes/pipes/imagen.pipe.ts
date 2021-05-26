import { Pipe, PipeTransform } from '@angular/core';

// Interfaz
import { Heroe } from '../pages/interfaces/heroes.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform( heroe: Heroe ): string {
    return `assets/heroes/${ heroe.id }.jpg`;
  }

} /* aprovechando que el id forma parde del nombre de la imagen alojada en el servidor de angular */
 /* assests esta alojada el src */
 /* este pipe se peude usarlo en cualquier lugar de este modulo  */
