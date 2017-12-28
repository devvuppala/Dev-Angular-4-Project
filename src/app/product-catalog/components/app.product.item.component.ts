/* This is a component ( Dumb component ) 
 This is used to render the data on to the UI and listen any changes and emit the changes
  */

  import {Component,Input,Output,OnChanges,EventEmitter} from '@angular/core' //Import component 
  import {ProductModel} from '../model/app.product.model';
  
  @Component({
      selector:'product-item', // Selector is used on the pages to display what ever is in the template
      template: `
      <!--<div>Product Item Component</div>
      <div class="container"> 
          {{productValue.name}} - {{productValue.type}}
      </div>-->
      <!--<div>Uo to class 6</div>
      <div class="container"> 
        <ul class="list-group">
            <li class="list-group-item">
                <input type="text" [(ngModel)] = "productValue.name" (blur) = "emitProduct()">
                {{productValue.id}}.
                <input type="text" [(ngModel)] = "productValue.name">
                <input type="text" [(ngModel)] = "productValue.type">
                <button style="float:right"  class="btn btn-primary" (click) = "emitProduct()" >Emit</button>\n
                <button style="float:right" class="btn btn-warning" (click) = "deleteProduct()" >-</button>
            </li>
        </ul>
      </div>-->

      <!-- New bootstrap Table   -->
      <tr>
        <td>{{productValue.id}}</td>
        <td><input type="text" [(ngModel)] = "productValue.name"></td>
        <td><input type="text" [(ngModel)] = "productValue.type"></td>
        <td><input type="text" [(ngModel)] = "productValue.premium"></td>
        <td><button style="float:right"  class="btn btn-primary" (click) = "emitProduct()" >Emit</button>
            <button style="float:right" class="btn btn-warning" (click) = "deleteProduct()" >-</button></td>
      </tr>
  
      `
  
  })
  
  export class ProductItemComponent { // Export the component
    //Recieve the Data passed by the smart component
    @Input() productValue : ProductModel;

    @Output() onChangeOfValue: EventEmitter<ProductModel> = new EventEmitter<ProductModel>();

    @Output() onDelete: EventEmitter<ProductModel> = new EventEmitter<ProductModel>();

    ngOnInit() {
        console.log("Init");
    }

    //OnChanges method is called when a change is made to the cvalue
    ngOnChanges(changes) {
        if(changes.productValue) {
            this.productValue = Object.assign({},changes.productValue.currentValue);
        }
    }

    //Method that emits the Product
    emitProduct() {
        this.onChangeOfValue.emit(this.productValue);
    }
      
    deleteProduct() {
        this.onDelete.emit(this.productValue);
    }

  }