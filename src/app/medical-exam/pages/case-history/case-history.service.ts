import {Injectable} from "@angular/core";
import {Http, RequestOptions, Headers, Response} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {GlobalState} from "../../../global.state";
import {Observable} from "rxjs";

@Injectable()
export class CaseHistoryService {
  newCaseHistoryUrl: string = '/newPatientAndXTask';
  updateCaseHistoryUrl: string = '/newXTask';
  findOnePatientUrl: string = '/selectOnePatient';
  pidValidateUrl: string = '/checkPid';

  constructor(private http: Http, private GlobalState: GlobalState) {
    this.newCaseHistoryUrl = this.GlobalState.MEBaseUrl + this.newCaseHistoryUrl;
    this.updateCaseHistoryUrl = this.GlobalState.MEBaseUrl + this.updateCaseHistoryUrl;
    this.findOnePatientUrl = this.GlobalState.MEBaseUrl + this.findOnePatientUrl;
    this.pidValidateUrl = this.GlobalState.MEBaseUrl + this.pidValidateUrl;
  }

  newCaseHistory(caseHistoryInfo: any): Promise<any> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.newCaseHistoryUrl, JSON.stringify(caseHistoryInfo), options).toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  getPatientInfo(id: string): Promise<any> {
    this.findOnePatientUrl = `${this.findOnePatientUrl}\/${id}`;

    return this.http.get(this.findOnePatientUrl).toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  updateCaseHistory(updateInfo: any): Promise<any> {
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(this.updateCaseHistoryUrl, JSON.stringify(updateInfo), options).toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  validatePID(query: any): Observable<any> {
    console.log("post");
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return this.http
      .post(this.pidValidateUrl, JSON.stringify({pid: query}), options)
      .map(response => {
        console.log("service", response.json);
        return response.json()
      });
  }

  private handleError(error: any): Promise<any> {
    // console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
