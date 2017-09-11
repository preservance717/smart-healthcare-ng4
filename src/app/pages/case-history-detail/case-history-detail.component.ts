/**
 * Created by gaole on 2017/9/8.
 */
import {Component, OnInit} from "@angular/core";
import {CornerstoneService} from "../../theme/services/cornerstone.service";

@Component({
  selector: 'case-history-detail',
  templateUrl: './case-history-detail.component.html'
})

export class CaseHistoryDetailComponent implements OnInit{
  imageData: any;

  constructor(public csS: CornerstoneService) {

  }


  ngOnInit() {

    // for (const i of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 , 11 , 12 , 13, 14 ,15 , 16 , 17 , 18]) {
    this.csS.fetchDicomImage(`http://localhost:4200/assets/dicom/im1.dcm`)
      .subscribe(res =>  this.imageData = res);
    // }


  }
}
