import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {CornerstoneService} from "../../../theme/services/cornerstone.service";
declare const cornerstone;
@Component({
  selector: 'app-medical-people-detail',
  templateUrl: './medical-people-detail.component.html',
  styleUrls: ['medical-people-detail.component.scss']
})
export class MedicalPeopleDetailComponent implements OnInit {
  @ViewChild('dcmEle') dcmEle: ElementRef;

  imageData: any;
  imageList = [];

  demoList = [1,2];

  constructor(public csS: CornerstoneService) { }

  ngOnInit() {
  }

  openAccordion(){
    setTimeout(() => {
      cornerstone.enable(this.dcmEle.nativeElement);

      this.csS.fetchDicomImage(`http://localhost:4000/assets/dicom/im1.dcm`)
        .subscribe(res => {
          this.imageData = res;
          if (this.imageData) {
            this.displayImage(this.imageData);
            if (!this.imageList.filter(img => img.imageId === this.imageData.imageId).length) {
              this.imageList.push(this.imageData);
            }
          }
        });
    }, 0);
    console.log("open accordin");
  }

  displayImage(image) {
    console.log("oninit",this.dcmEle);
    cornerstone.displayImage(this.dcmEle.nativeElement, image);
  }
}
