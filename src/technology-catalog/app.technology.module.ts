import {NgModule} from '@angular/core'  // In which the NgModule is
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'
import {HttpModule} from '@angular/http'
import {RouterModule,Routes} from '@angular/router'
import {ReactiveFormsModule} from '@angular/forms' // This is used to import the Reactive form functionality
import {TechnologyCatalogComponent} from './container/app.technology.sc.technologyComponent'
import {TechnologyFormComponent} from './component/app.technology.component'
import {TechnologyAddComponent} from './component/app.technology.add'
import {TechnologyService} from './service/app.technology.service'
import {TechnologyCartFormComponent} from './component/app.technology.cart.component'
import {TECH_API_TOKEN, TECH_CART_API_TOKEN} from '../app/app.properties'

const productRoutes:Routes = [
                        {path:'technology',
                            children : [
                                {path:'',component:TechnologyCatalogComponent,pathMatch:'full'}
                                //,{path:':id',component:ProductDetailsComponent,pathMatch:'full'}
                            ]
                        }

                    ]

                          
@NgModule({
    imports:[CommonModule,FormsModule,RouterModule.forChild(productRoutes),ReactiveFormsModule],
    declarations:[TechnologyCatalogComponent,TechnologyFormComponent,TechnologyAddComponent,TechnologyCartFormComponent],  // Module should declare the smart component
    providers:[TechnologyService,
                    {provide:TECH_API_TOKEN,useValue:'/technologies'},
                    {provide:TECH_CART_API_TOKEN,useValue:'/technologiesCart'}],   // This can be used in any other files in this module
    exports:[TechnologyCatalogComponent]      // Module should export the component (Only the smart component) , 
                                           // Do not add dumb components , add only smart components that youa re going to expose to other components
})

export class TechnologyCatalogModule {   // Every class should export that class.
    
    
}