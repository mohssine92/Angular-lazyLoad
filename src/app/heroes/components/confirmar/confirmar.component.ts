import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Heroe } from '../../pages/interfaces/heroes.interface';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styleUrls: []
})
export class ConfirmarComponent implements OnInit {

   // @input() no sirve en este caso recuerda que la data no viene desde componente padre atraves de html , en este caso viene atraves de arg de una funcion de materialAngular . por ellos hacemos injeccion .


   constructor( private dialogRef: MatDialogRef<ConfirmarComponent>, // ver docs Clases :es una clase injectable , ver sus metodos , tenemos una que nos va permitir cerra el dialogo abierto
                @Inject(MAT_DIALOG_DATA) public data: Heroe ) { } // Injeccion para leer data que viaje desde el componete padre , data es publica para poder consumirla en html

   ngOnInit(): void {
    // console.log(this.data);
   }

  borrar() {
    this.dialogRef.close(true); // en la firma de la funcion dicen que el param es opccional , asi el params es el que sera returnado al dialogo abierto , asi true sera returnada en este caso
  }

  cerrar(){
    this.dialogRef.close();
  }


}
