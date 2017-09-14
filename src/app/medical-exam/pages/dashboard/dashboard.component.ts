import {Component, OnInit} from "@angular/core";
import {GlobalState} from "../../../global.state";
import {DashboardService} from "./dashboard.service";

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
  providers:[DashboardService]
})

export class DashboardComponent implements OnInit {
  rows = [
    {
      "id": 1,
      "patient_name": "Ethel Price",
      "sex": "女",
      "tel": "1234345654",
      "dust_age": "13",
      "dust_property": "3级",
      "created_on": "03/08/17 08:37"
    },
    {
      "id": 1,
      "patient_name": "Ethel Price",
      "sex": "女",
      "tel": "1234345654",
      "dust_age": "13",
      "dust_property": "3级",
      "created_on": "03/08/17 08:37"
    },
    {
      "id": 1,
      "patient_name": "Ethel Price",
      "sex": "女",
      "tel": "1234345654",
      "dust_age": "13",
      "dust_property": "3级",
      "created_on": "03/08/17 08:37"
    },
    {
      "id": 1,
      "patient_name": "Ethel Price",
      "sex": "女",
      "tel": "1234345654",
      "dust_age": "13",
      "dust_property": "3级",
      "created_on": "03/08/17 08:37"
    },
    {
      "id": 1,
      "patient_name": "Ethel Price",
      "sex": "女",
      "tel": "1234345654",
      "dust_age": "13",
      "dust_property": "3级",
      "created_on": "03/08/17 08:37"
    },
    {
      "id": 1,
      "patient_name": "Ethel Price",
      "sex": "女",
      "tel": "1234345654",
      "dust_age": "13",
      "dust_property": "3级",
      "created_on": "03/08/17 08:37"
    },
    {
      "id": 1,
      "patient_name": "Ethel Price",
      "sex": "女",
      "tel": "1234345654",
      "dust_age": "13",
      "dust_property": "3级",
      "created_on": "03/08/17 08:37"
    },
    {
      "id": 1,
      "patient_name": "Ethel Price",
      "sex": "女",
      "tel": "1234345654",
      "dust_age": "13",
      "dust_property": "3级",
      "created_on": "03/08/17 08:37"
    },
    {
      "id": 1,
      "patient_name": "Ethel Price",
      "sex": "女",
      "tel": "1234345654",
      "dust_age": "13",
      "dust_property": "3级",
      "created_on": "03/08/17 08:37"
    },
    {
      "id": 1,
      "patient_name": "Ethel Price",
      "sex": "女",
      "tel": "1234345654",
      "dust_age": "13",
      "dust_property": "3级",
      "created_on": "03/08/17 08:37"
    },
    {
      "id": 1,
      "patient_name": "Ethel Price",
      "sex": "女",
      "tel": "1234345654",
      "dust_age": "13",
      "dust_property": "3级",
      "created_on": "03/08/17 08:37"
    },
    {
      "id": 1,
      "patient_name": "Ethel Price",
      "sex": "女",
      "tel": "1234345654",
      "dust_age": "13",
      "dust_property": "3级",
      "created_on": "03/08/17 08:37"
    },
    {
      "id": 1,
      "patient_name": "Ethel Price",
      "sex": "女",
      "tel": "1234345654",
      "dust_age": "13",
      "dust_property": "3级",
      "created_on": "03/08/17 08:37"
    },
    {
      "id": 1,
      "patient_name": "Ethel Price",
      "sex": "女",
      "tel": "1234345654",
      "dust_age": "13",
      "dust_property": "3级",
      "created_on": "03/08/17 08:37"
    },
    {
      "id": 1,
      "patient_name": "Ethel Price",
      "sex": "女",
      "tel": "1234345654",
      "dust_age": "13",
      "dust_property": "3级",
      "created_on": "03/08/17 08:37"
    }
  ];

  viewBtn: boolean = false;
  caseHistoryList: any = [];

  constructor(private GlobalState: GlobalState, private _service:DashboardService) {
  }

  ngOnInit() {
    this.viewBtn = sessionStorage.getItem("user_type") == 'tj_expert';
    setTimeout(this.getCaseHistoryList(),1000)
  }

  getCaseHistoryList(){
    this._service.getCaseHistoryList()
      .then(res=>{
        if(res.aboolean === true){
          this.caseHistoryList = res.data
        }
      })
  }
  newCaseHistory(){
    sessionStorage.removeItem("patientId");
  }
  getPatientId(row){
    sessionStorage.setItem("patientId", row.id);
  }

}
