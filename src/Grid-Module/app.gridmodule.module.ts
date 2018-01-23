import {NgModule} from '@angular/core'  // In which the NgModule is
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'
import {HttpModule} from '@angular/http'
import {RouterModule,Routes} from '@angular/router'

import {GridModuleComponent} from './container/app.grid.container.component'

const productRoutes:Routes = [
                        {path:'grids',
                            children : [
                                {path:'',component:GridModuleComponent,pathMatch:'full'},
                                {path:':productGrid',component:GridModuleComponent,pathMatch:'full'}
                            ]
                        }

                    ]

                          
@NgModule({
    imports:[CommonModule,FormsModule,RouterModule.forChild(productRoutes)],
    declarations:[GridModuleComponent],  // Module should declare the smart component
    providers:[],   // This can be used in any other files in this module
    exports:[GridModuleComponent]      // Module should export the component (Only the smart component) , 
                                           // Do not add dumb components , add only smart components that youa re going to expose to other components
})

export class GridModule {   // Every class should export that class.
    
    
}