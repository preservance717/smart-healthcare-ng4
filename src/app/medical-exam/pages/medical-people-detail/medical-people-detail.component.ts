import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {CornerstoneService} from "../../../theme/services/cornerstone.service";
declare const cornerstone;
@Component({
  selector: 'app-medical-people-detail',
  templateUrl: './medical-people-detail.component.html',
  styleUrls: ['medical-people-detail.component.scss']
})
export class MedicalPeopleDetailComponent implements OnInit {
  imageData: any;
  imageList = [];

  demoList = [1,2];
  dcmElement:any;

  constructor(public csS: CornerstoneService,public elementRef:ElementRef) { }

  ngOnInit() {
  }

  openAccordion(i){
    this.dcmElement = this.elementRef.nativeElement.querySelector("#dicomImage"+i);

    setTimeout(() => {
      cornerstone.enable(this.dcmElement);

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
  }

  displayImage(image) {
    cornerstone.displayImage(this.dcmElement, image);
  }
}
