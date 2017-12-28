import {Injectable} from '@angular/core';
import {ProductModel} from '../model/app.product.model'
import {Http,Response, RequestOptions,Headers} from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

const PRODUCT_API = "http://localhost:3000/products";

@Injectable()
export class ProductService {

    constructor(private http:Http) {
      console.log(this.http);
    }

    //private products_url:string = 'assests/assets/product.json';

    getProducts():Observable<ProductModel[]> {
       return  this.http.get(PRODUCT_API).map((response:Response) => 
                            response.json());
    }

    //Get , POST, PUT , DELETE
    updateProduct(product:ProductModel): Observable<ProductModel> {
     /* let cpHeaders = new Headers({
        "Authorization":"xyz-13245",
        "Accept":"application/json"
      });
      let options = new RequestOptions({headers : cpHeaders});
      
      return this.http.put(`${PRODUCT_API}/${product.id}`,product,options)
                .map((response:Response) => response.json());*/
      
      return this.http.put(`${PRODUCT_API}/${product.id}`,product)
                .map((response:Response) => response.json());
    }

    createProduct(product): Observable<ProductModel>{
 
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
   
      return this.http.post(`${PRODUCT_API}`,product,options
      ).map(res => res.json());
  }


    removeProduct(product:ProductModel): Observable<ProductModel> {
      return this.http.delete(`${PRODUCT_API}/${product.id}`)
                      .map((response:Response) => response.json());
    }


    fetchAproduct(id:number): Observable<ProductModel> {
      return this.http.delete(`${PRODUCT_API}/${id}`)
                      .map((response:Response) => response.json()).catch(error => Observable.throw(error.json))
    }






















    getProductsOld() {
        return [{
            id:1,
            name:'Outliers',
            type:'Books',
            premium:true
          } , {
            id:2,
            name:'Math',
            type:'Books',
            premium:true
          } , {
            id:3,
            name:'Carrom',
            type:'Books',
            premium:false
          } , {
            id:4,
            name:'One More',
            type:'Books',
            premium:true
          }]
    }
}