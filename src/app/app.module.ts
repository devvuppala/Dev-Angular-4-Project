import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import {ProductCatalogModule} from './product-catalog/app.product.catalog.module' // Import the Module
import {HttpModule} from '@angular/http'
import {HttpClientModule} from '@angular/common/http'


import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule ,FormsModule,ProductCatalogModule, HttpModule     // Add it to the imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
