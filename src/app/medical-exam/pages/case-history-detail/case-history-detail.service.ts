import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {GlobalState} from "../../../global.state";

@Injectable()
export class CaseHistoryDetailService {
  caseHistoryDetailUrl: string = '/selectOneXRayTask';

  constructor(private http: Http, private GlobalState: GlobalState) {
    this.caseHistoryDetailUrl = this.GlobalState.MEBaseUrl + this.caseHistoryDetailUrl;
  }

  reviewDetail(taskId:string):Promise<any> {
    this.caseHistoryDetailUrl = `${this.caseHistoryDetailUrl}\/${taskId}`;
    return this.http.get(this.caseHistoryDetailUrl).toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    // console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
