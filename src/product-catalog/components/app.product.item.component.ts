/* This is a component ( Dumb component ) 
 This is used to render the data on to the UI and listen any changes and emit the changes
  */

  import {Component,Input,Output,OnChanges,EventEmitter} from '@angular/core' //Import component 
  import {ProductModel} from '../model/app.product.model';
  
  @Component({
      selector:'product-item', // Selector is used on the pages to display what ever is in the template
      template: `
        <form #productForm = "ngForm" novalidate (ngSubmit) = "submitProductForm(productForm.value)" >   <!-- ngForm is a directive which will track all the imputs in the form -->
            <div class="form-group">                                                                     <!-- // noValidate will disable the html validation -->
                <h3> Product : {{productValue.name}} </h3>
            </div>

            <div class="form-group">                
                <input type="number" 
                    [ngModel]="productValue.id"
                    name="id">

                <input type="text" 
                    required="true"
                    [ngModel]="productValue.name"
                    #productName="ngModel"       
                    name="name">              <!--  Every element which has ngModel will have their own reference -->

                <span style="font-size:12px;color:red" *ngIf="productName.errors?.required">
                    <!--{{productName.errors | json}}</span>  (|) - This is pipe , which can be used to append to json -->
                    Product name is required
                </span>

                <input type="text" 
                    [ngModel]="productValue.type"
                    name="type">

                <input type="checkbox" 
                    [ngModel]="productValue.premium"
                    name="premium"> Premium
                
                <input type="submit"
                    class="btn btn-primary" 
                    [disabled] = "productForm.invalid">

            </div>
            <div>
                {{productForm.value | json}}

                valid : {{productForm.valid}}
            </div>
      `
  
  })
  
  export class ProductItemComponent { // Export the component
    //Recieve the Data passed by the smart component
    @Input() productValue : ProductModel;

    @Output() submitEditedProduct: EventEmitter<ProductModel> = new EventEmitter<ProductModel>();

    ngOnInit() {
        //console.log("Init");
    }

    //OnChanges method is called when a change is made to the cvalue
    ngOnChanges(changes) {
        if(changes.productValue) {
            this.productValue = Object.assign({},changes.productValue.currentValue);
        }
    }

    submitProductForm(editedProduct:ProductModel) {
        this.submitEditedProduct.emit(editedProduct);
    }

    

  }