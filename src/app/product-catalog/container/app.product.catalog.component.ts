/* This is a component ( Smart component ) 
 This is used to get the data using the service from the host
  */

import { Component, OnInit, OnChanges } from '@angular/core' //Import component 
import { ProductService } from '../service/app.product.service';
import { ProductModel } from '../model/app.product.model';
import { error } from 'selenium-webdriver';

@Component({
    selector: 'product-catalog', // Selector is used on the pages to display what ever is in the template
    template: `
    <!-- This needs to be in the dumb components 
    Product Catalog Component -->

    <!--<div *ngFor="let product of products"> 
        {{product.name}} - {{product.type}}
    </div>-->
    
    
    <!--<div *ngFor="let product of products"> 
        {{product.name}}
    </div>-->

    <!--Pass the Products to the Dumb Components -->
    <!--Inputs are property bindings and outputs are event binding-->
    <!--<div>Product Item Catalog Component </div>-->
    
    <!--Class 7-->
    <div  class="container">
        <product-list [products] = "products"
                    (onDetails)="onProductDetails($event)"
                    (onChangeOfValue) = "handleChangeOfValue($event)"  
                    (onDelete) = "onDeleteProduct($event)"></product-list>
    </div>

    <div class="container">        
        <div>
            <button style="float:right" class="btn btn-success" (click)="showNewProductDetails()">+ Add Product</button>
        </div>

        <div *ngIf="showProductAddDetails">
            <product-add (onAdd) = "onProductAdd($event)"></product-add>
        </div>
    </div>
    <!--<div class="container">                 
        <div *ngFor="let product of products">
                <product-item [productValue] = "product" ></product-item>
        </div> 
    </div>-->

    <div class="container" *ngIf="showSelectedProductDetails">
        <product-item [productValue] = "selectedProduct" 
        (submitEditedProduct) = "SubmitProductChanges($event)"></product-item>
     </div> 
    `

})

export class ProductCatalogComponent { // Export the component

    //Fetch the Data from service
    //Use dependency injection
    //When you use ProductService , it will search the moodule (app.product.catalog.module.ts) and will see if it is available
    products: ProductModel[];
    //Show or hide Product details
    showProductAddDetails: boolean = false;
    error:String = null;
    selectedProduct:ProductModel;
    showSelectedProductDetails: boolean = false;
    constructor(private productService: ProductService) {
        /*this.products =  this.productService.getProducts();*/
        //Do not write any business logic here
    }

    //Init method called when the class is initilized
    ngOnInit() {
        //this.products = this.productService.getProductsOld();
        this.productService.getProducts().subscribe((productArray:ProductModel[]) => {
            this.products = productArray;
        });

        /*
        this.productService.getProducts().subscribe(function(productArray) {
            this.products = productArray;
        });*/
    }

    handleChangeOfValue(productHere: ProductModel) {
       /* this.products = this.products.map(target => {
            if (productHere.id === target.id) {
                console.log(productHere.name);
                console.log(target.name);
                return Object.assign({}, target, productHere);
            } else {
                return target;
            }
        })*/

        console.log("In Product catalog Component", productHere);

        this.productService.updateProduct(productHere).subscribe((response:ProductModel) => {
            this.products = this.products.map((product:ProductModel) => {
                if(product.id === productHere.id) {
                    return Object.assign({},product,productHere);
                } else {
                    return product;
                }
            });
        }, (error:any) => this.error = error.statusText)
    }

    showNewProductDetails() {
        this.showProductAddDetails = true;
    }

    onProductAdd(newProduct:ProductModel){
        console.log("In onProductAdd");
        //this.products.push(product); -- One way
        //this.products = [...this.products,product]; // Spread operator ,  this will make the product as immutable
        //console.log(newProduct);
        this.productService.createProduct(newProduct).subscribe((response:ProductModel) => {
            this.loadProducts();
            this.showProductAddDetails = false; 
        });
            
    }

    onDeleteProduct(deletedProduct:ProductModel) {
        //this.products = this.products.filter(product => product.id != deletedProduct.id);

        /*this.productService.removeProduct(deletedProduct).subscribe((response:ProductModel) => {
            this.products = this.products.map((product:ProductModel) => {
                if(product.id === deletedProduct.id){
                    return null;
                } else {
                    return product;
                }
            })
        });*/
        //alert(deletedProduct);
        this.productService.removeProduct(deletedProduct).subscribe((response:ProductModel) => {
            this.loadProducts();
        })

    }

    loadProducts() {
        this.productService.getProducts().subscribe((productArray:ProductModel[]) => {
            this.products = productArray;
        });
    }

    onProductDetails(product:ProductModel){
        this.productService.fetchAproduct(product.id).subscribe((response:ProductModel) => {
                this.showSelectedProductDetails = true;
                this.selectedProduct = response;
        });
    }

    SubmitProductChanges(productHere: ProductModel) { 
         this.productService.updateProduct(productHere).subscribe((response:ProductModel) => {
             this.products = this.products.map((product:ProductModel) => {
                 if(product.id === productHere.id) {
                     return Object.assign({},product,productHere);
                 } else {
                     return product;
                 }
             });
         }, (error:any) => this.error = error.statusText);       

        this.showSelectedProductDetails = false;
     }
    
}