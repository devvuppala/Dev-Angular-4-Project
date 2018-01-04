import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'

//Http Modules
import {HttpModule} from '@angular/http'
import {HttpClientModule} from '@angular/common/http'

//Routing Modules
import {RouterModule,Routes} from '@angular/router'

//App specific Modules
import {UserModule} from './user/app.user.module';
import {ProductCatalogModule} from './product-catalog/app.product.catalog.module' // Import the Module

//App specific Components
import {ErrorComponent} from './app.error.component';
import {ContactUsComponent} from './app.contactus.component'
import {LoginComponent} from './user/container/app.login.component'
import {AppComponent} from './app.component';
import { UserService } from './user/service/app.user.service';

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
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
