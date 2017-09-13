import {Component, OnInit} from "@angular/core";
import {GlobalState} from "../../../global.state";

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  columns = [
    {id: 'id', name: 'ID', prop: 'id'},
    {id: 'name', name: '姓名', prop: 'name'},
    {id: 'sex', name: '性别', prop: 'sex'},
    {id: 'telephone', name: '联系电话', prop: 'telephone'},
    {id: 'age', name: '接尘工龄', prop: 'age'},
    {id: 'property', name: '粉尘性质', prop: 'property'},
    {id: 'time', name: '就医时间', prop: 'time'},
    {}
  ];
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

  user_type: string = "";

  constructor(private GlobalState:GlobalState){}
  ngOnInit() {
    this.user_type = this.GlobalState.user_type;
  }

}
