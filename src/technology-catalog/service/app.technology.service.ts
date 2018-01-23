import {Injectable , Inject} from '@angular/core';
import {TechnologyModel , TechnologyCartModel} from '../model/app.technology.model'
import {Http,Response, RequestOptions,Headers} from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import {TECH_API_TOKEN, TECH_CART_API_TOKEN , JSON_SERVER_URL} from '../../app/app.properties'



@Injectable()
export class TechnologyService {

    constructor(private http:Http,
                @Inject(TECH_API_TOKEN) private techApi:string,
                @Inject(TECH_CART_API_TOKEN) private techCartApi:string,
                @Inject(JSON_SERVER_URL) private jsonServerApi:string) {
                  
    }

    TECH_API:string = this.jsonServerApi + this.techApi;
    TECH_CART_API:string =  this.jsonServerApi + this.techCartApi;

    //private products_url:string = 'assests/assets/product.json';

    getTechnologies():Observable<TechnologyModel[]> {
       return  this.http.get(this.TECH_API).map((response:Response) => 
                            response.json());
    }

    getTechnologiesCart():Observable<TechnologyCartModel[]> {
        return  this.http.get(this.TECH_CART_API).map((response:Response) => 
                             response.json());
     }

    addTechnology(technology): Observable<TechnologyModel>{ 
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      //console.log(technology);
      return this.http.post(`${this.TECH_API}`,technology,options).map(res => res.json());
    }

    removeTechnology(technology:TechnologyModel): Observable<TechnologyModel> {
      return this.http.delete(`${this.TECH_API}/${technology.id}`)
                      .map((response:Response) => response.json());
    }

    addTechnologyToCart(technology): Observable<TechnologyCartModel>{ 
      //console.log("Here");
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      //console.log(technology);
      return this.http.post(`${this.TECH_CART_API}`,technology,options).map(res => res.json());
    }

    removeTechnologyFromCart(technology:TechnologyCartModel): Observable<TechnologyCartModel> {
      return this.http.delete(`${this.TECH_CART_API}/${technology.id}`)
                      .map((response:Response) => response.json());
    }

    testTheRestService() : Observable<string> {
      return  this.http.get(`http://localhost:8080/welcome`).map((response:Response) => 
                             response.json());
    }

    //Get , POST, PUT , DELETE
    /*updateProduct(product:ProductModel): Observable<ProductModel> {
     /* let cpHeaders = new Headers({
        "Authorization":"xyz-13245",
        "Accept":"application/json"
      });
      let options = new RequestOptions({headers : cpHeaders});
      
      return this.http.put(`${PRODUCT_API}/${product.id}`,product,options)
                .map((response:Response) => response.json());*/
      
      /*return this.http.put(`${PRODUCT_API}/${product.id}`,product)
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
      return this.http.get(`${PRODUCT_API}/${id}`)
                      .map((response:Response) => response.json()).catch(error => Observable.throw(error.json))
    }

    fetchProductTypes(id:number): Observable<ProductModel> {
      return this.http.get(`${PRODUCT_API}/${id}`)
                      .map((response:Response) => response.json()).catch(error => Observable.throw(error.json))
    }*/
}