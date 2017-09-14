import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {GlobalState} from "../../../global.state";

@Injectable()
export class ResultAnalyzeService {
  caseHistoryListUrl: string = '/selectAllXRayTask';

  constructor(private http: Http, private GlobalState: GlobalState) {
    this.caseHistoryListUrl = this.GlobalState.MEBaseUrl + this.caseHistoryListUrl;
  }

  getCaseHistoryList(): Promise<any> {
    return this.http.get(this.caseHistoryListUrl).toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    // console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
