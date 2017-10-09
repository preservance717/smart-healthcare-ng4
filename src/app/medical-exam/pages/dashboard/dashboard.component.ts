import {Component, OnInit, ElementRef, ViewChild, Renderer2} from "@angular/core";
import {GlobalState} from "../../../global.state";
import {DashboardService} from "./dashboard.service";
import {Router} from "@angular/router";

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
  providers:[DashboardService]
})

export class DashboardComponent implements OnInit {
  @ViewChild('dustProperty') dustProperty: ElementRef;

  viewBtn: boolean = false;
  caseHistoryList: any = [];

  constructor( private _service:DashboardService,private renderer:Renderer2,private router:Router) {
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

  toggleNewCaseHistory(){
    if(this.viewBtn === false){
      this.router.navigate(["/medical-exam/pages/ch"]);
    }else {
      this.router.navigate(["/medical-exam/pages/db"]);
    }
  }
}
