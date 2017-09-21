import {Injectable} from "@angular/core";
import {Http, RequestOptions, Headers} from "@angular/http";
import 'rxjs/add/operator/toPromise';
import {GlobalState} from "../../../global.state";

@Injectable()
export class MedicalPeopleDetailService {
  patientDetailUrl: string = '/selectPatientAndXTask';

  constructor(private http: Http, private GlobalState: GlobalState) {
    this.patientDetailUrl = this.GlobalState.MEBaseUrl + this.patientDetailUrl;
  }

  reviewPatientDetail(patientId:string):Promise<any> {
    this.patientDetailUrl = `${this.patientDetailUrl}\/${patientId}`;
    return this.http.get(this.patientDetailUrl).toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    // console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
