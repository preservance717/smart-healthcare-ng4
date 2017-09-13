/**
 * Created by gaole on 2017/9/8.
 */
import {Component, OnInit} from "@angular/core";
import {CornerstoneService} from "../../../theme/services/cornerstone.service";

@Component({
  selector: 'case-history-detail',
  templateUrl: 'case-history-detail.component.html',
  styleUrls: ['case-history-detail.component.scss']
})

export class CaseHistoryDetailComponent implements OnInit {
  imageData: any;

  constructor(public csS: CornerstoneService) {
  }

  ngOnInit() {
    this.csS.fetchDicomImage(`http://localhost:4200/assets/dicom/im1.dcm`)
      .subscribe(res => this.imageData = res);
  }
}
