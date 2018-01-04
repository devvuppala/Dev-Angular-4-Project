import {Injectable} from '@angular/core';
import {UserModel} from '../model/app.user.model'
import {Http,Response, RequestOptions,Headers} from '@angular/http'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'

const USER_API = "http://localhost:3000/users";

@Injectable()
export class UserService {

    constructor(private http:Http) {
      console.log(this.http);
    }

    fetchAUser(username:String): Observable<UserModel> {
      return this.http.get(`${USER_API}/${username}`)
                      .map((response:Response) => response.json()).catch(error => Observable.throw(error.json))
    }

    fetchProductTypes(id:number): Observable<UserModel> {
      return this.http.get(`${USER_API}/${id}`)
                      .map((response:Response) => response.json()).catch(error => Observable.throw(error.json))
    }

    getAll() {
      //return this.http.get<UserModel[]>(USER_API);
    }

    getById(id: number) {
        return this.http.get(`${USER_API}/${id}`)
              .map((response:Response) => response.json()).catch(error => Observable.throw(error.json))
    }

    getByUserName(name: String) {
      return this.http.get(`${USER_API}?username=${name}`)
            .map((response:Response) => response.json()).catch(error => Observable.throw(error.json))
  }

    create(user: UserModel) {
        return this.http.post(USER_API, user);
    }

    update(user: UserModel) {
        return this.http.put(USER_API + user.username, user);
    }

    delete(id: number) {
        return this.http.delete(USER_API + id);
    }
}