import {Component, OnInit} from "@angular/core";
import {ResultAnalyzeService} from "./result-analyze.service";

@Component({
  selector:'result-analyze',
  templateUrl:'result-analyze.component.html',
  styleUrls:['result-analyze.component.scss'],
  providers:[ResultAnalyzeService]
})

export class ResultAnalyzeComponent implements OnInit{
  // rows = [
  //   {
  //     "name": "defa",
  //     "patientName": "孙婷婷",
  //     "pid": "女",
  //     "status": "完成",
  //     "analysisResult": "13",
  //     "reviewResult": "3级",
  //     "id":1
  //   },
  //   {
  //     "name": "gtrrer",
  //     "patientName": "arwe Price",
  //     "pid": "男",
  //     "status": "分析中",
  //     "analysisResult": "无",
  //     "reviewResult": "3级"
  //   }
  // ];

  resultList:any = [];

  constructor(private _service:ResultAnalyzeService){}

  ngOnInit(){
    this.getCaseHistoryList();
  }

  getCaseHistoryList(){
    this._service.getCaseHistoryList()
      .then(res=>{
        if(res.aboolean === true){
          console.log("res",res.data);
          this.resultList = res.data
        }
      })
  }

  getRow(row){
    sessionStorage.setItem("taskId", row.taskId);
  }
}
