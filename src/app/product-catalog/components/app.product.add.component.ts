/* This is a component ( Dumb component ) 
 This is used to render the data on to the UI and listen any changes and emit the changes
  */

  import {Component,Output,EventEmitter} from '@angular/core' //Import component 
  import {ProductModel} from '../model/app.product.model';
  
  @Component({
      selector:'product-add', // Selector is used on the pages to display what ever is in the template
      template: `
      <div>Product Item add Component</div> 

      <div>
        <input type="number" [(ngModel)] = "product.id">
        <input type="text" [(ngModel)] = "product.name" placeholder="Enter the product name">
        <input type="text" [(ngModel)] = "product.type" placeholder="Enter the product Type">
        <select [(ngModel)] = "product.premium" >
            <option value=true>False</option>
            <option value=false>True</option>
        </select>
        <button (click) = "addProduct()" class="btn btn-success">+</button>
      </div> 
  
      `
  
  })
  
  export class ProductAddComponent { // Export the component

    product:ProductModel = {id:0,name:'',type:'',premium:false}

    @Output() onAdd: EventEmitter<ProductModel> = new EventEmitter<ProductModel>();
    
    addProduct() {
        console.log(this.product);
        this.onAdd.emit(this.product);
    }
    
  }