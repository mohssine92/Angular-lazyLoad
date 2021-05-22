import { NgModule } from '@angular/core';               /* seccion : 13: */
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// lo usan los Servicios class para comunicar con Rest Api , nuestros servicios providos de manera global  y el httClien... esta proveedo de manera global
// ASI NUESTROS SERVICIOS PUEDEN IMPORTARLO Y USARLO SI QUE IMPORTARLO CADA VEZ EN EL MODULO DONDE ALOJA CADA SERVICIO
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';

import { ErrorPageComponent } from './shared/error-page/error-page.component';


@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
