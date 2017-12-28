/* This is a component ( Dumb component ) 
 This is used to render the list of products UI and listen any changes and emit the changes
  */

  import {Component,Input,Output,EventEmitter} from '@angular/core' //Import component 
  import {ProductModel} from '../model/app.product.model';
  
  @Component({
      selector:'product-list', // Selector is used on the pages to display what ever is in the template
      template: `
        <ul class="list-group">
            <li class="list-group-item" *ngFor="let product of products">
                {{product.name}}
                <span style="float:right">
                    <button class="btn btn-success" (click)="showDetails(product)">Details</button>
                </span>
            </li>
        </ul>  
      ` 
  })
  
  export class ProductItemListComponent { // Export the component
    //Recieve the Data passed by the smart component
    @Input() productValue : ProductModel;

    @Output() onDetails: EventEmitter<ProductModel> = new EventEmitter<ProductModel>();

    showDetails(product:ProductModel) {
        console.log("Product List Component" , product);
        this.onDetails.emit(product);    
    }
    
      
  }