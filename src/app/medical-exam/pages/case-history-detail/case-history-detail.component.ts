/**
 * Created by gaole on 2017/9/8.
 */
import {Component, OnInit} from "@angular/core";
import {CornerstoneService} from "../../../theme/services/cornerstone.service";
import {CaseHistoryDetailService} from "./case-history-detail.service";
import {GlobalState} from "../../../global.state";

@Component({
  selector: 'case-history-detail',
  templateUrl: 'case-history-detail.component.html',
  styleUrls: ['case-history-detail.component.scss'],
  providers: [CaseHistoryDetailService]
})

export class CaseHistoryDetailComponent implements OnInit {
  imageData: any;
  // patientId: string = '';
  taskId: string = '';
  patientMDInfo:any;

  constructor(public csS: CornerstoneService,
              private _service: CaseHistoryDetailService,
              private _state: GlobalState) {
    // this.patientId = sessionStorage.getItem("patientId");
    this.taskId = sessionStorage.getItem("taskId");
  }

  ngOnInit() {
    this.reviewDetail();
    this.csS.fetchDicomImage(`http://localhost:4000/assets/dicom/im1.dcm`)
      .subscribe(res => this.imageData = res);
  }

  reviewDetail() {
    this._service.reviewDetail(this.taskId)
      .then(res => {
        this.patientMDInfo = res.data;
        // console.log("res", res.data);
      })
  }
}
