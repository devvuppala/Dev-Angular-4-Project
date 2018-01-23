import {NgModule} from '@angular/core'  // In which the NgModule is
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'
import {HttpModule} from '@angular/http'
import {RouterModule,Routes} from '@angular/router'
import {ReactiveFormsModule} from '@angular/forms' // This is used to import the Reactive form functionalit
import {TECH_API_TOKEN, TECH_CART_API_TOKEN} from '../app/app.properties'
import {MicrostategyContainerComponent} from './container/app.microstrategy.container'

const productRoutes:Routes = [
                        {path:'microstategyReports',
                            children : [
                                {path:'',component:MicrostategyContainerComponent,pathMatch:'full'}
                                //,{path:':id',component:ProductDetailsComponent,pathMatch:'full'}
                            ]
                        }

                    ]

                          
@NgModule({
    imports:[CommonModule,FormsModule,RouterModule.forChild(productRoutes),ReactiveFormsModule],
    declarations:[MicrostategyContainerComponent],  // Module should declare the smart component
    providers:[],   // This can be used in any other files in this module
    exports:[MicrostategyContainerComponent]      // Module should export the component (Only the smart component) , 
                                           // Do not add dumb components , add only smart components that youa re going to expose to other components
})

export class MicrostategyModule {   // Every class should export that class.
    
    
}