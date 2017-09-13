import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {GlobalState} from "../../global.state";

/**
 * Created by yxin on 7/29/2017.
 */
@Injectable()
export class LoginService {
  loginUrl: string = '/login';

  constructor(private http: Http, private GlobalState:GlobalState) {
    this.loginUrl = this.GlobalState.MEBaseUrl + this.loginUrl;
  }

  login(username: string, password: string): Promise<any> {
    let body = {
      name: username,
      password: password
    };
    return this.http.post(this.loginUrl, body).toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    // console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
