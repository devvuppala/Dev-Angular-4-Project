import {NgModule} from '@angular/core'  // In which the NgModule is
import {LoginComponent} from './container/app.login.component' // Import Component
import { MessageComponent } from './component/app.message.component'
import {UserService} from './service/app.user.service'
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'
import {HttpModule} from '@angular/http'
import {RouterModule,Routes} from '@angular/router'

const productRoutes:Routes = [
                        {path:'auth',
                            children : [
                                {path:'',component:LoginComponent,pathMatch:'full'}
                            ]
                        }

                    ]

                          
@NgModule({
    imports:[CommonModule,FormsModule,RouterModule.forChild(productRoutes)],
    declarations:[LoginComponent,MessageComponent],  // Module should declare the smart component
    entryComponents:[MessageComponent], // Dynamic components    
    providers:[UserService],   // This can be used in any other files in this module
    exports:[LoginComponent]      // Module should export the component (Only the smart component) , 
                                           // Do not add dumb components , add only smart components that youa re going to expose to other components
})

export class UserModule {   // Every class should export that class.
    
    
}