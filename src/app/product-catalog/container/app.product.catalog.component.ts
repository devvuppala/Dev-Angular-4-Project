/* This is a component ( Smart component ) 
 This is used to get the data using the service from the host
  */

import { Component, OnInit, OnChanges } from '@angular/core' //Import component 
import { ProductService } from '../service/app.product.service';
import { ProductModel } from '../model/app.product.model';
import { error } from 'selenium-webdriver';
import {Router} from '@angular/router'

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
    <div class="container" *ngIf="!showErrorMessageDiv">
        <div class="alert alert-success alert-dismissible" *ngIf="errorOrSuccessMessage != null"> 
            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
            <strong>{{errorOrSuccessMessage}}</strong>
        </div>    
    </div>
    <div class="container" *ngIf="showErrorMessageDiv">
        <div class="alert alert-danger">
            <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
            <strong>{{errorOrSuccessMessage}}</strong>
        </div>    
    </div>
    <!--Class 7-->
    <div  class="container">
        <product-list [products] = "products"
                    (onEditProduct)="onEditProductDetails($event)"
                    (onChangeOfValue) = "handleChangeOfValue($event)"  
                    (onDelete) = "onDeleteProduct($event)"
                    (onShowProductDetails) = "onProductDetails($event)"></product-list>
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
    showErrorMessageDiv:boolean = false;
    errorOrSuccessMessage:String = null;
    constructor(private productService: ProductService,
                private router:Router) {
        /*this.products =  this.productService.getProducts();*/
        //Do not write any business logic here
    }

    //Init method called when the class is initilized
    ngOnInit() {
        //this.products = this.productService.getProductsOld();
        this.productService.getProducts().subscribe((productArray:ProductModel[]) => {
            this.products = productArray;
        },
        (error) => {
            console.log("Error from the service " ,  error.status,error.url)
        });
    }

    handleChangeOfValue(productHere: ProductModel) {
        this.productService.updateProduct(productHere).subscribe((response:ProductModel) => {
            this.products = this.products.map((product:ProductModel) => {
                if(product.id === productHere.id) {
                    return Object.assign({},product,productHere);
                } else {
                    return product;
                }
            });
        }, 
        (error) => {
            console.log("Error from the service " ,  error.status,error.url);
        });
    }

    showNewProductDetails() {
        this.showProductAddDetails = true;
    }

    onProductDetails(product:ProductModel) {
        this.router.navigate(['products',product.id]);
    }

    onProductAdd(newProduct:ProductModel){
        this.productService.createProduct(newProduct).subscribe((response:ProductModel) => {
            this.loadProducts();
            this.showProductAddDetails = false; 
            this.requestSuccess();
        },
        (error) => {
            console.log("Error from the service " ,  error.status,error.url);
            this.showErrorMessage(error);
        });
            
    }

    onDeleteProduct(deletedProduct:ProductModel) {
        this.productService.removeProduct(deletedProduct).subscribe((response:ProductModel) => {
            this.loadProducts();
        },
        (error) => {
            console.log("Error from the service " ,  error.status,error.url)
        });

    }

    loadProducts() {
        this.productService.getProducts().subscribe((productArray:ProductModel[]) => {
            this.products = productArray;
        },
        (error) => {
            console.log("Error from the service " ,  error.status,error.url)
        });
    }

    onEditProductDetails(product:ProductModel) {
        this.productService.fetchAproduct(product.id).subscribe((response:ProductModel) => {
                this.showSelectedProductDetails = true;
                this.selectedProduct = response;
        },
        (error) => {
            console.log("Error from the service " ,  error.status,error.url)
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
         },
         (error) => {
             console.log("Error from the service " ,  error.status,error.url)
         });     

        this.showSelectedProductDetails = false;
    }

    showErrorMessage(error:any) {
        this.showErrorMessageDiv = true;
        this.errorOrSuccessMessage = "ERROR : " +  error.status + " " + error._body;
    }

    requestSuccess(){
        this.showErrorMessageDiv = false;
        this.errorOrSuccessMessage = "Success!!!!"
    }
    
}