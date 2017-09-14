import {Injectable} from "@angular/core";
import {Http, RequestOptions, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {GlobalState} from "../../../global.state";

@Injectable()
export class CaseHistoryDetailService {
  caseHistoryDetailUrl: string = '/selectOneXRayTask';
  updateXRayTaskUrl: string = '/updateXRayTask';

  constructor(private http: Http, private GlobalState: GlobalState) {
    this.caseHistoryDetailUrl = this.GlobalState.MEBaseUrl + this.caseHistoryDetailUrl;
    this.updateXRayTaskUrl = this.GlobalState.MEBaseUrl + this.updateXRayTaskUrl;
  }

  reviewDetail(taskId:string):Promise<any> {
    this.caseHistoryDetailUrl = `${this.caseHistoryDetailUrl}\/${taskId}`;
    return this.http.get(this.caseHistoryDetailUrl).toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  updateTaskDetail(updateTaskInfo:any):Promise<any>{
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.updateXRayTaskUrl, JSON.stringify(updateTaskInfo), options).toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    // console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
