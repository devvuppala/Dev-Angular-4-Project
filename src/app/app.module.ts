import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import {ProductCatalogModule} from './product-catalog/app.product.catalog.module' // Import the Module
import {HttpModule} from '@angular/http'
import {HttpClientModule} from '@angular/common/http'
import { LoginComponent } from './app.login.component';
import {ErrorComponent} from './app.error.component';
import {ContactUsComponent} from './app.contactus.component'
import { AppComponent } from './app.component';
import {RouterModule,Routes} from '@angular/router'

const routes:Routes = [
                          {path:'',component:LoginComponent,pathMatch:'full'},
                          {path:'contactus',component:ContactUsComponent,pathMatch:'full'},
                          {path:'**',component:ErrorComponent}
                      ]

@NgModule({
  declarations: [
    AppComponent,LoginComponent,ErrorComponent,ContactUsComponent
  ],
  imports: [
    BrowserModule ,
    FormsModule,
    ProductCatalogModule, 
    HttpModule,
    RouterModule.forRoot(routes)        // Add it to the imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
