/* This is a component ( Dumb component ) 
 This is used to render the list of products UI and listen any changes and emit the changes
  */

  import {Component,Input,Output,EventEmitter,OnInit,AfterContentInit,AfterViewInit} from '@angular/core' //Import component 
  import {ProductModel} from '../model/app.product.model';  
  import {Router} from '@angular/router'
  
  @Component({
      selector:'product-list', // Selector is used on the pages to display what ever is in the template
      template: `
        <!--ng container (Template reference ) -->
        <ng-container [ngTemplateOutlet]="templateRef" [ngTemplateOutletContext]="templateData">
        
        </ng-container>

        <ng-template #templateRef let-productCount="countOfProducts" let-dateAndtime="currentDateTime">
            <h2>Products Table : {{products?.length}} Products at <u>{{dateAndtime | date: 'MM/dd/yyyy hh:mm:ss a'}}</u></h2>  
        </ng-template>

        

         
        <!-- New bootstrap Table -->
        <table class="table table-bordered"> 
            <thead>
                <tr>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Product Type</th>
                    <th>Product Premium</th>
                    <th>Product Price (Original Price) </th>
                    <th>Action(s)</th>
                </tr>
            </thead>  
            <tbody>
                <ng-container *ngFor="let product of products">
                    <tr>                  
                        <td>{{product.id}}</td>
                        <td>{{product.name}}</td>
                        <td>{{product.type}}</td>
                        <td>{{product.premium}}</td>
                        <td>{{product.price | productCurrencyPipe:'$':' (5%) ' : 9}}</td>
                        <td float=left>
                            <!--<button style="float:right" class="btn btn-primary" (click) = "emitProduct(product)" >Emit</button>-->
                            <button style="float:right" class="btn btn-warning" (click) = "deleteProduct(product)" >Delete(-)</button>
                            &nbsp;&nbsp;&nbsp;
                            <span style="float:right">
                                <button class="btn btn-success" (click)="editProduct(product)">Edit</button>
                            </span>
                            <span style="float:right">
                                <button class="btn btn-success" (click)="showProductDetails(product)">Details</button>
                            </span>
                        </td>
                    </tr>
                </ng-container>                      
            </tbody>
        </table>
        <!-- Directive -->
        Directive Test : Price (allow only numbers and format the number) : <input type="text" product-directive>  
        <div *myRepeat="let product of products ; let i=index_attr">
            Index : {{i}} - Product Name :  {{product.name}}
        </div>
       
        
        
        
      ` 
  })
  
  export class ProductItemListComponent { // Export the component
    //Recieve the Data passed by the smart component
    @Input() products : ProductModel[];

    @Input() productValue : ProductModel;

    @Output() onEditProduct: EventEmitter<ProductModel> = new EventEmitter<ProductModel>();    

    @Output() onChangeOfValue: EventEmitter<ProductModel> = new EventEmitter<ProductModel>();

    @Output() onDelete: EventEmitter<ProductModel> = new EventEmitter<ProductModel>();

    @Output() onShowProductDetails: EventEmitter<ProductModel> = new EventEmitter<ProductModel>();

    templateData:any;
    productsLenght:number = 0;
    currentDateValue:Date = new Date();


    constructor(private router:Router) { // Activated Route is used to fecth the parameters

    }

    //Load the number of products and time

    ngAfterContentInit() {
        //Do something that needs to be done before initilazing the page
    }

    ngAfterViewInit() {
        this.productsLenght = this.products != null ? this.products .length : 0;
        this.templateData = {countOfProducts:this.productsLenght,currentDateTime:this.currentDateValue};
    }
    
    editProduct(product:ProductModel) {
        console.log("Product List Component" , product);
        this.onEditProduct.emit(product);    
    }
    
    //Method that emits the Product
    emitProduct(product:ProductModel) {
        this.onChangeOfValue.emit(product);
    }
      
    deleteProduct(product:ProductModel) {
        this.onDelete.emit(product);
    }

    showProductDetails(product:ProductModel) {
        this.onShowProductDetails.emit(product);
    }

      
  }