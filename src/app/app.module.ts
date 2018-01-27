import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { NgXCookies } from 'ngx-cookies';

//Http Modules
import {HttpModule} from '@angular/http'
import {HttpClientModule} from '@angular/common/http'

//NgRx store Modules () Not used in Production)
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {storeFreeze} from 'ngrx-store-freeze'; //npm i --save-dev ngrx-store-freeze
import {StoreModule,MetaReducer} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects'


//Routing Modules
import {RouterModule,Routes} from '@angular/router'

//App specific Modules
import {UserModule} from '../user/app.user.module';
import {ProductCatalogModule} from '../product-catalog/app.product.catalog.module' // Import the Module
import {TechnologyCatalogModule} from '../technology-catalog/app.technology.module'
import {GridModule} from '../Grid-Module/app.gridmodule.module'
import {MicrostategyModule} from '../microstrategy/app.microstrategy.module'
import {RemindersModule} from '../reminders/app.reminder.module'
import {ChartsModule} from '../charts/app.chart.module'

//Charts
import { AmChartsModule } from "@amcharts/amcharts3-angular"; // am Charts

//App specific Components
import {ErrorComponent} from './app.error.component';
import {ContactUsComponent} from './app.contactus.component'
import {LoginComponent} from '../user/container/app.login.component'
import {AppComponent} from './app.component';
import { UserService } from '../user/service/app.user.service';
import { MessageComponent } from '../user/component/app.message.component';
import {JSON_SERVER_URL,SPRING_BOOT_REST_SERVICE_URL,MOB_REST_SERVICE_URL,WEATHER_SERVICE_FREE} from './app.properties'

const environment = {
  developement: true,
  production: false,
};

/****
 * Meta Reducers are proxy for all reducers in the App
 * Reducers are meant to give us immutable data , storeFreeze will throw an error if it is not immutable (Prod donot need this)
 * MetaReducer is a proxy for all reducers , there is a pre and post . it goes through ans come back through meta reducer
 * If we want ro process something before Reducer and after reducer , we can do it here
 ****/

 export const metaReducers: MetaReducer<any>[] = !environment.production ? [storeFreeze] : [] ;

//Configure Routes
const routes:Routes = [
                          {path:'',component:LoginComponent,pathMatch:'full'},
                          {path:'contactus',component:ContactUsComponent,pathMatch:'full'},
                          {path:'**',component:ErrorComponent}
                      ]

@NgModule({
  declarations: [
    AppComponent,ErrorComponent,ContactUsComponent
  ],
  imports: [
    BrowserModule ,
    FormsModule,
    StoreModule.forRoot({} , {metaReducers}), // Configure Reducer , In root module we dont have to track any state , we will maitaint that in respective modules
    EffectsModule.forRoot([]), // Configure Effects Module
    environment.developement ? StoreDevtoolsModule.instrument() : [], //This is used to Debug in Dev , not used in PROD
    ProductCatalogModule, 
    HttpModule,
    RouterModule.forRoot(routes) ,
    UserModule,
    TechnologyCatalogModule,
    GridModule,
    MicrostategyModule,
    RemindersModule,
    ChartsModule ,    
    AmChartsModule   // Add it to the imports
  ],
  providers: [UserService,CookieService,
              {provide:JSON_SERVER_URL , useValue:'json_server'}, // Json Server api
              {provide:SPRING_BOOT_REST_SERVICE_URL , useValue:'springBoot_rest_service'},
              {provide:MOB_REST_SERVICE_URL , useValue:'another_rest_service'},
              {provide:WEATHER_SERVICE_FREE , useValue:'weather_service_free'} // Spring Boot rest service api
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
