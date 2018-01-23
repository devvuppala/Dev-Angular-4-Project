import {NgModule} from '@angular/core'  // In which the NgModule is
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'
import {HttpModule} from '@angular/http'
import {RouterModule,Routes} from '@angular/router'
import {ReactiveFormsModule} from '@angular/forms' // This is used to import the Reactive form functionality
import {RemindersComponent} from './container/app.reminder.loadReminders'
import {StoreModule} from '@ngrx/store';

const productRoutes:Routes = [
                        {path:'reminders',
                            children : [
                                {path:'',component:RemindersComponent,pathMatch:'full'}
                                //,{path:':id',component:ProductDetailsComponent,pathMatch:'full'}
                            ]
                        }

                    ]

                          
@NgModule({
    imports:[CommonModule,FormsModule,RouterModule.forChild(productRoutes),ReactiveFormsModule],
    declarations:[RemindersComponent],  // Module should declare the smart component
    providers:[],   // This can be used in any other files in this module
    exports:[RemindersComponent]      // Module should export the component (Only the smart component) , 
                                           // Do not add dumb components , add only smart components that youa re going to expose to other components
})

export class RemindersModule {   // Every class should export that class.
 
}