import {Injectable , Inject} from '@angular/core';
import {TechnologyModel , TechnologyCartModel} from '../model/app.technology.model'
import {Http,Response, RequestOptions,Headers} from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import {TECH_API_TOKEN, TECH_CART_API_TOKEN , JSON_SERVER_URL , SPRING_BOOT_REST_SERVICE_URL , MOB_REST_SERVICE_URL,WEATHER_SERVICE_FREE} from '../../app/app.properties'



@Injectable()
export class TechnologyService {

    constructor(private http:Http,
                @Inject(TECH_API_TOKEN) private techApi:string,
                @Inject(TECH_CART_API_TOKEN) private techCartApi:string,
                @Inject(JSON_SERVER_URL) private jsonServerApi:string,
                @Inject(SPRING_BOOT_REST_SERVICE_URL) private springBootServerApi:string,
                @Inject(MOB_REST_SERVICE_URL) private mobServerApi:string,
                @Inject(WEATHER_SERVICE_FREE) private freeWeatherService:string) {
                  
    }

    TECH_API:string = this.jsonServerApi + this.techApi;
    TECH_CART_API:string =  this.jsonServerApi + this.techCartApi;

    SPRING_BOOT_API = this.springBootServerApi;
    MOB_SERVICE_API = this.mobServerApi;
    WEA_SERVICE_API = this.freeWeatherService;

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
      return  this.http.get(`${this.SPRING_BOOT_API}/students/Student1/courses`).map((response:Response) => 
                             response.json());
    }
    
    testTheMobService() : Observable<string> {
      return  this.http.get(`${this.WEA_SERVICE_API}/data/2.5/forecast?zip=94040&appid=b6907d289e10d714a6e88b30761fae22`).map((response:Response) => 
                             response.json());
    }

}