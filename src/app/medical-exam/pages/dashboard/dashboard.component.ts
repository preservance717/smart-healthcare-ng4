import {Component, OnInit, ElementRef, ViewChild, Renderer2} from "@angular/core";
import {GlobalState} from "../../../global.state";
import {DashboardService} from "./dashboard.service";

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
  providers:[DashboardService]
})

export class DashboardComponent implements OnInit {
  @ViewChild('dustProperty') dustProperty: ElementRef;
  rows = [
    {
      "id": 1,
      "patient_name": "Ethel Price",
      "sex": "女",
      "tel": "1234345654",
      "dust_age": "13",
      "dustProperty": "3级",
      "created_on": "03/08/17 08:37"
    },
    {
      "id": 1,
      "patient_name": "Ethel Price",
      "sex": "女",
      "tel": "1234345654",
      "dust_age": "13",
      "dustProperty": "3级",
      "created_on": "03/08/17 08:37"
    },
    {
      "id": 1,
      "patient_name": "Ethel Price",
      "sex": "女",
      "tel": "1234345654",
      "dust_age": "13",
      "dustProperty": "3级",
      "created_on": "03/08/17 08:37"
    },
    {
      "id": 1,
      "patient_name": "Ethel Price",
      "sex": "女",
      "tel": "1234345654",
      "dust_age": "13",
      "dustProperty": "3级",
      "created_on": "03/08/17 08:37"
    },
    {
      "id": 1,
      "patient_name": "Ethel Price",
      "sex": "女",
      "tel": "1234345654",
      "dust_age": "13",
      "dustProperty": "3级",
      "created_on": "03/08/17 08:37"
    },
    {
      "id": 1,
      "patient_name": "Ethel Price",
      "sex": "女",
      "tel": "1234345654",
      "dust_age": "13",
      "dustProperty": "3级",
      "created_on": "03/08/17 08:37"
    },
    {
      "id": 1,
      "patient_name": "Ethel Price",
      "sex": "女",
      "tel": "1234345654",
      "dust_age": "13",
      "dustProperty": "3级",
      "created_on": "03/08/17 08:37"
    },
    {
      "id": 1,
      "patient_name": "Ethel Price",
      "sex": "女",
      "tel": "1234345654",
      "dust_age": "13",
      "dustProperty": "3级",
      "created_on": "03/08/17 08:37"
    },
    {
      "id": 1,
      "patient_name": "Ethel Price",
      "sex": "女",
      "tel": "1234345654",
      "dust_age": "13",
      "dustProperty": "3级",
      "created_on": "03/08/17 08:37"
    },
    {
      "id": 1,
      "patient_name": "Ethel Price",
      "sex": "女",
      "tel": "1234345654",
      "dust_age": "13",
      "dustProperty": "3级",
      "created_on": "03/08/17 08:37"
    },
    {
      "id": 1,
      "patient_name": "Ethel Price",
      "sex": "女",
      "tel": "1234345654",
      "dust_age": "13",
      "dustProperty": "3级",
      "created_on": "03/08/17 08:37"
    },
    {
      "id": 1,
      "patient_name": "Ethel Price",
      "sex": "女",
      "tel": "1234345654",
      "dust_age": "13",
      "dustProperty": "3级",
      "created_on": "03/08/17 08:37"
    },
    {
      "id": 1,
      "patient_name": "Ethel Price",
      "sex": "女",
      "tel": "1234345654",
      "dust_age": "13",
      "dustProperty": "3级",
      "created_on": "03/08/17 08:37"
    },
    {
      "id": 1,
      "patient_name": "Ethel Price",
      "sex": "女",
      "tel": "1234345654",
      "dust_age": "13",
      "dustProperty": "3级",
      "created_on": "03/08/17 08:37"
    },
    {
      "id": 1,
      "patient_name": "Ethel Price",
      "sex": "女",
      "tel": "1234345654",
      "dust_age": "13",
      "dustProperty": "3级",
      "created_on": "03/08/17 08:37"
    }
  ];

  viewBtn: boolean = false;
  caseHistoryList: any = [];

  constructor(private GlobalState: GlobalState, private _service:DashboardService,private renderer:Renderer2) {
  }

  ngOnInit() {
    this.viewBtn = sessionStorage.getItem("user_type") == 'tj_expert';
    this.getCaseHistoryList();
    // this.rows.forEach(row=>{
      // if(row.dustProperty.split("级")[0]-0>1){
      //   this.renderer.setStyle(this.dustProperty.nativeElement,'background','#000')
      // }else {
      //   this.renderer.setStyle(this.dustProperty.nativeElement,'background','#fff')
      // }
    // })
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
