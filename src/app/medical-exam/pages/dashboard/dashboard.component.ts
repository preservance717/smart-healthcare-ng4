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
      "name": "Ethel Price",
      "sex": "女",
      "telephone": "1234345654",
      "age": "13",
      "property": "3级",
      "time": "03/08/17 08:37"
    },
    {
      "id": 1,
      "name": "Ethel Price",
      "sex": "女",
      "telephone": "1234345654",
      "age": "13",
      "property": "3级",
      "time": "03/08/17 08:37"
    },
    {
      "id": 1,
      "name": "Ethel Price",
      "sex": "女",
      "telephone": "1234345654",
      "age": "13",
      "property": "3级",
      "time": "03/08/17 08:37"
    },
    {
      "id": 1,
      "name": "Ethel Price",
      "sex": "女",
      "telephone": "1234345654",
      "age": "13",
      "property": "3级",
      "time": "03/08/17 08:37"
    },
    {
      "id": 1,
      "name": "Ethel Price",
      "sex": "女",
      "telephone": "1234345654",
      "age": "13",
      "property": "3级",
      "time": "03/08/17 08:37"
    },
    {
      "id": 1,
      "name": "Ethel Price",
      "sex": "女",
      "telephone": "1234345654",
      "age": "13",
      "property": "3级",
      "time": "03/08/17 08:37"
    },
    {
      "id": 1,
      "name": "Ethel Price",
      "sex": "女",
      "telephone": "1234345654",
      "age": "13",
      "property": "3级",
      "time": "03/08/17 08:37"
    },
    {
      "id": 1,
      "name": "Ethel Price",
      "sex": "女",
      "telephone": "1234345654",
      "age": "13",
      "property": "3级",
      "time": "03/08/17 08:37"
    },
    {
      "id": 1,
      "name": "Ethel Price",
      "sex": "女",
      "telephone": "1234345654",
      "age": "13",
      "property": "3级",
      "time": "03/08/17 08:37"
    },
    {
      "id": 1,
      "name": "Ethel Price",
      "sex": "女",
      "telephone": "1234345654",
      "age": "13",
      "property": "3级",
      "time": "03/08/17 08:37"
    },
    {
      "id": 1,
      "name": "Ethel Price",
      "sex": "女",
      "telephone": "1234345654",
      "age": "13",
      "property": "3级",
      "time": "03/08/17 08:37"
    },
    {
      "id": 1,
      "name": "Ethel Price",
      "sex": "女",
      "telephone": "1234345654",
      "age": "13",
      "property": "3级",
      "time": "03/08/17 08:37"
    },
    {
      "id": 1,
      "name": "Ethel Price",
      "sex": "女",
      "telephone": "1234345654",
      "age": "13",
      "property": "3级",
      "time": "03/08/17 08:37"
    },
    {
      "id": 1,
      "name": "Ethel Price",
      "sex": "女",
      "telephone": "1234345654",
      "age": "13",
      "property": "3级",
      "time": "03/08/17 08:37"
    },
    {
      "id": 1,
      "name": "Ethel Price",
      "sex": "女",
      "telephone": "1234345654",
      "age": "13",
      "property": "3级",
      "time": "03/08/17 08:37"
    }
  ];

  viewBtn: boolean = false;
  caseHistoryList: any = [];

  constructor(private GlobalState: GlobalState, private _service:DashboardService) {
  }

  ngOnInit() {
    this.viewBtn = this.GlobalState.user_type == 'tj_expert';
    this.getCaseHistoryList();
  }

  getCaseHistoryList(){
    this._service.getCaseHistoryList()
      .then(res=>{
        if(res.aboolean === true){
          // this.caseHistoryList = res.data
        }
      })
  }

}
