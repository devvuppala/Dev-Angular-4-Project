import {NgModule} from '@angular/core'  // In which the NgModule is
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'
import {RouterModule,Routes} from '@angular/router'

import {ChartsContainerComponent} from './containers/app.charts.container.component'
import {MapChartComponent} from './components/app.charts.map.component'
import {BarChartComponent} from './components/app.charts.barchart.component'
import {PieChartComponent} from './components/app.charts.piechart.component'

const productRoutes:Routes = [
                        {path:'charts_and_maps_am',
                            children : [
                                {path:'',component:ChartsContainerComponent,pathMatch:'full'},   
                                {path:'map_am',component:MapChartComponent,pathMatch:'full'},                                
                                {path:'chart_am',component:ChartsContainerComponent,pathMatch:'full'}
                            ]
                        }

                    ]

                          
@NgModule({
    imports:[CommonModule,FormsModule,RouterModule.forChild(productRoutes)],
    declarations:[ChartsContainerComponent,MapChartComponent,BarChartComponent,PieChartComponent],  // Module should declare the smart component
    providers:[],   // This can be used in any other files in this module
    exports:[ChartsContainerComponent]      // Module should export the component (Only the smart component) , 
                                           // Do not add dumb components , add only smart components that youa re going to expose to other components
})

export class ChartsModule {   // Every class should export that class.
    
    
}