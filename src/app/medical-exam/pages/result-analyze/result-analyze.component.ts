import {Component, OnInit} from "@angular/core";
import {ResultAnalyzeService} from "./result-analyze.service";
import {pneumoconiosisOptions} from "../case-history-detail/pneumoconiosisOptions";

@Component({
  selector:'result-analyze',
  templateUrl:'result-analyze.component.html',
  styleUrls:['result-analyze.component.scss'],
  providers:[ResultAnalyzeService]
})

export class ResultAnalyzeComponent implements OnInit{
  resultList:any = [];

  constructor(private _service:ResultAnalyzeService){}

  ngOnInit(){
    this.getCaseHistoryList();
  }

  getCaseHistoryList(){
    this._service.getCaseHistoryList()
      .then(res=>{
        if(res.aboolean === true){
          this.resultList = res.data;
          this.resultList = this.resultList.map(result=>{
            result.reviewResult = pneumoconiosisOptions[result.reviewResult].label;
            return result;
          })
        }
      })
  }

  getRow(row){
    sessionStorage.setItem("taskId", row.taskId);
  }
}
