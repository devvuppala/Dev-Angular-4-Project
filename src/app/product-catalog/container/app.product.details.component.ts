/* This is a component ( Dumb component ) 
 This is used to render the data a specific product
  */

  import {Component,Input,Output,OnChanges,EventEmitter} from '@angular/core' //Import component 
  import {ProductModel} from '../model/app.product.model';
  import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
  import { ProductService } from '../service/app.product.service';
  import {Router,ActivatedRoute,Params} from '@angular/router';
  import 'rxjs/add/operator/switchMap'
  
  @Component({
      selector:'product-details', // Selector is used on the pages to display what ever is in the template
      styles: [`
        div {
            margin : 0 10px 10px;
        }

        .show_left {
            float: left;
        }
      
      `],
      template: `
            <div class="show_left">
                <button class="btn btn-success" (click)="goBack()"> Back </button>
            </div>
            <div class="show_left">
                <div class="form-group">
                    Product Name : {{product?.name}}
                </div>
                <div class="form-group">
                    Product Type : {{product?.type}}
                </div>
                <div class="form-group">
                    Product Premium : {{product?.premium}}
                </div>
            </div>
      `
  
  })
  
  export class ProductDetailsComponent implements OnInit { // Export the component
    product : ProductModel;
    constructor(private productService: ProductService,
                private router:Router,
                private activeRoute:ActivatedRoute) { // Activated Route is used to fecth the parameters

    }
    ngOnInit() {
        console.log("In Product Details Component");
        /*this.activeRoute.params.subscribe((params:any) => {
                this.productService.fetchAproduct(params.id)
                    .subscribe((data:ProductModel) => this.product = data);                                   
            }            
        );*/
        this.activeRoute.queryParams.subscribe((qparams:Params) => console.log(qparams));
        this.activeRoute.params.switchMap((params:any) => 
                this.productService.fetchAproduct(params.id))
                    .subscribe((data:ProductModel) => this.product = data);
    }

    

    goBack() {
        this.router.navigate(['products']);
    }

    

  }