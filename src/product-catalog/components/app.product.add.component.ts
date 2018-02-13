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
            <option value=false>False</option>
            <option value=true>True</option>
        </select>
        <button (click) = "addProduct()" class="btn btn-success">+</button>
      </div> 

      <form class="form-inline" role="form">
          <div class="form-group">
            <label for="fname">First Name</label>
            <input type="text" class="form-control" id="fname">
          </div>
          <div class="form-group">
            <label for="lname">Last Name</label>
            <input type="text" class="form-control" id="lname">
          </div>
           <div class="form-group">
            <label for="age">Age</label>
            <input type="text" class="form-control" id="age">
          </div>
          <div class="checkbox">
            <label><input type="checkbox"> Remember me</label>
          </div>
          <button type="submit" class="btn btn-default">Submit</button>
        </form>
  
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