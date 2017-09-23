import {Component, OnInit} from "@angular/core";
import {ResultAnalyzeService} from "./result-analyze.service";
import {pneumoconiosisOptions} from "../case-history-detail/pneumoconiosisOptions";
import {GlobalState} from "../../../global.state";

@Component({
  selector:'result-analyze',
  templateUrl:'result-analyze.component.html',
  styleUrls:['result-analyze.component.scss'],
  providers:[ResultAnalyzeService]
})

export class ResultAnalyzeComponent implements OnInit{
  resultList:any = [];

  constructor(private _service:ResultAnalyzeService,private state:GlobalState){}

  ngOnInit(){
    this.getCaseHistoryList();
  }

  getCaseHistoryList(){
    this._service.getCaseHistoryList()
      .then(res=>{
        if(res.aboolean === true){
          this.resultList = res.data;
          this.resultList = this.resultList.map(result=>{
            result.reviewResult = result.reviewResult != null? pneumoconiosisOptions[result.reviewResult].label:result.reviewResult;
            return result;
          })
        }
      })
  }

  getRow(row){
    sessionStorage.setItem("taskId", row.taskId);
    this.state.expertStatus = "review";
  }
  updateRow(row){
    sessionStorage.setItem("taskId", row.taskId);
    this.state.expertStatus = "update";
  }
}
