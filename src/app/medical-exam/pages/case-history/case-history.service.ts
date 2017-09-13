import {Injectable} from "@angular/core";
import {Http, RequestOptions, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {GlobalState} from "../../../global.state";

@Injectable()
export class CaseHistoryService {
  newCaseHistoryUrl: string = '/newPatient';

  constructor(private http: Http, private GlobalState: GlobalState) {
    this.newCaseHistoryUrl = this.GlobalState.MEBaseUrl + this.newCaseHistoryUrl;
  }

  newCaseHistory(caseHistoryInfo: any): Promise<any> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.newCaseHistoryUrl, JSON.stringify(caseHistoryInfo), options).toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    // console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
