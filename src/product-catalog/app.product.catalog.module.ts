import {NgModule} from '@angular/core'  // In which the NgModule is
import {ProductCatalogComponent} from './container/app.product.catalog.component' // Import Component
import {ProductService} from './service/app.product.service'
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'
import {ProductItemComponent} from './components/app.product.item.component'
import {ProductAddComponent} from './components/app.product.add.component'
import {ProductItemListComponent} from './components/app.product.item.list.component'
import {ProductDetailsComponent} from './container/app.product.details.component'
import {HttpModule} from '@angular/http'
import {RouterModule,Routes} from '@angular/router'
import {ProductCurrency} from './pipe/app.product.currency.pipe'
import {ProductDirectives} from './directives/app.product.directives'
import { MyRepeatDirective } from './directives/app.myRepeat.directive';

const productRoutes:Routes = [
                        {path:'products',
                            children : [
                                {path:'',component:ProductCatalogComponent,pathMatch:'full'},
                                {path:':id',component:ProductDetailsComponent,pathMatch:'full'}
                            ]
                        }

                    ]

                          
@NgModule({
    imports:[CommonModule,FormsModule,RouterModule.forChild(productRoutes)], // All modules needed for this module to work
    declarations:[ProductCatalogComponent,
            ProductItemComponent,ProductAddComponent,
            ProductItemListComponent,ProductDetailsComponent,ProductCurrency,
            ProductDirectives,MyRepeatDirective],  // Module should declare the smart component , dumb components , directives and pipes
    providers:[ProductService],   // Services that can be used in this module.
    exports:[ProductCatalogComponent]      // Module should export the component (Only the smart component) , 
                                           // Do not add dumb components , add only smart components that youa re going to expose to other components
})

export class ProductCatalogModule {   // Every class should export that class.
    
    
}