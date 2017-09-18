/**
 * Created by gaole on 2017/9/8.
 */
import {Component, OnInit, HostListener, Input, ElementRef, Directive, ViewChild, AfterViewInit} from "@angular/core";
import {CornerstoneService} from "../../../theme/services/cornerstone.service";
import {CaseHistoryDetailService} from "./case-history-detail.service";
import {GlobalState} from "../../../global.state";
import * as $ from "jquery";

declare const cornerstone;

@Component({
  selector: 'case-history-detail',
  templateUrl: 'case-history-detail.component.html',
  styleUrls: ['case-history-detail.component.scss'],
  providers: [CaseHistoryDetailService]
})

export class CaseHistoryDetailComponent implements OnInit,AfterViewInit {
  @ViewChild('dcmEle') dcmEle: ElementRef;
  @ViewChild('fullDcmEle') fullDcmEle: ElementRef;
  imageData: any;
  // patientId: string = '';
  taskId: string = '';
  patientMDInfo: any;
  reviewResult: string;
  reviewComment: string;

  userType: string;

  fullScreenBtn: boolean = false;

  // element: any;

  imageList = [];

  currentIndex = 0;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    cornerstone.resize(this.dcmEle.nativeElement, true);
  }

  @HostListener('mousewheel', ['$event'])
  onMouseWheel(event) {
    event.preventDefault();

    const delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));

    if (delta > 0) {
      this.currentIndex++;
      if (this.currentIndex > this.imageList.length) {
        this.currentIndex = this.imageList.length - 1;
      }
    } else {

      this.currentIndex--;
      if (this.currentIndex < 0) {
        this.currentIndex = 0;
      }
    }
  }

  constructor(public csS: CornerstoneService,
              private _service: CaseHistoryDetailService,
              private _state: GlobalState,
              public elementRef: ElementRef) {
    // this.patientId = sessionStorage.getItem("patientId");
    this.taskId = sessionStorage.getItem("taskId");
    this.userType = sessionStorage.getItem("user_type");

    // this.element = this.element.nativeElement;
    // cornerstone.enable(this.dcmEle.nativeElement);
  }

  ngAfterViewInit() {
    this.initImage();
  }

  initImage(){
    this.csS.fetchDicomImage(`http://localhost:4000/assets/dicom/im1.dcm`)
      .subscribe(res => {
        this.imageData = res;
        if (this.imageData) {

          if (!this.imageList.filter(img => img.imageId === this.imageData.imageId).length) {
            this.imageList.push(this.imageData);
          }

          if (this.imageData.imageId) {
            this.displayImage(this.imageData);
            // console.log("oninit",this.dcmEle);
            cornerstone.displayImage(this.dcmEle.nativeElement, this.imageData);
          }
        }
      });
    cornerstone.enable(this.dcmEle.nativeElement);
  }

  displayImage(image) {
    cornerstone.displayImage(this.dcmEle.nativeElement, image);
  }

  ngOnInit() {
    this.reviewDetail();

  }

  reviewDetail() {
    this._service.reviewDetail(this.taskId)
      .then(res => {
        this.patientMDInfo = res.data;
      })
  }

  updateTaskDetail() {
    let updateTaskInfo = {
      id: this.taskId,
      reviewComment: this.reviewComment,
      reviewResult: this.reviewResult
    };
    this._service.updateTaskDetail(updateTaskInfo)
      .then(res => {
        // console.log(res);
      })
  }

  reviewFullScreen() {
    this.fullScreenBtn = true;
    setTimeout(() => {
      cornerstone.enable(this.fullDcmEle.nativeElement);

      this.csS.fetchDicomImage(`http://localhost:4000/assets/dicom/im1.dcm`)
        .subscribe(res => {
          this.imageData = res;
          if (this.imageData) {

            if (!this.imageList.filter(img => img.imageId === this.imageData.imageId).length) {
              this.imageList.push(this.imageData);
            }

            if (this.imageData.imageId) {
              // this.displayImage(this.imageData);
              cornerstone.displayImage(this.fullDcmEle.nativeElement, this.imageData);
              $('#transferSyntax').text(this.getTransferSyntax());
              $('#sopClass').text(this.getSopClass());
              $('#samplesPerPixel').text(this.imageData.data.uint16('x00280002'));
              $('#columns').text(this.imageData.data.uint16('x00280011'));
              $('#photometricInterpretation').text(this.imageData.data.string('x00280004'));
              $('#numberOfFrames').text(this.imageData.data.string('x00280008'));
              $('#rows').text(this.imageData.data.uint16('x00280010'));
              $('#pixelSpacing').text(this.imageData.data.string('x00280030'));
              $('#planarConfiguration').text(this.getPlanarConfiguration());
              $('#bitsAllocated').text(this.imageData.data.uint16('x00280100'));
              $('#bitsStored').text(this.imageData.data.uint16('x00280101'));
              $('#highBit').text(this.imageData.data.uint16('x00280102'));
              $('#pixelRepresentation').text(this.getPixelRepresentation());
              $('#windowCenter').text(this.imageData.data.string('x00281050'));
              $('#windowWidth').text(this.imageData.data.string('x00281051'));
              $('#rescaleIntercept').text(this.imageData.data.string('x00281052'));
              $('#rescaleSlope').text(this.imageData.data.string('x00281053'));
              $('#basicOffsetTable').text(this.imageData.data.elements.x7fe00010.basicOffsetTable ? this.imageData.data.elements.x7fe00010.basicOffsetTable.length : '');
              $('#fragments').text(this.imageData.data.elements.x7fe00010.fragments ? this.imageData.data.elements.x7fe00010.fragments.length : '');
              $('#minStoredPixelValue').text(this.imageData.minPixelValue);
              $('#maxStoredPixelValue').text(this.imageData.maxPixelValue);
              // var end = new Date().getTime();
              // var time = end - start;
              // $('#totalTime').text(time + "ms");
              $('#loadTime').text(this.imageData.loadTimeInMS + "ms");
              $('#decodeTime').text(this.imageData.decodeTimeInMS + "ms");
            }
          }
        });
    }, 0)
  }

  getTransferSyntax() {
  var value = this.imageData.data.string('x00020010');
  return value;
}

  getSopClass() {
  var value = this.imageData.data.string('x00080016');
  return value;
}

  getPixelRepresentation() {
  var value = this.imageData.data.uint16('x00280103');
  if(value === undefined) {
    return;
  }
  return value + (value === 0 ? ' (unsigned)' : ' (signed)');
}

  getPlanarConfiguration() {
  var value = this.imageData.data.uint16('x00280006');
  if(value === undefined) {
    return;
  }
  return value + (value === 0 ? ' (pixel)' : ' (plane)');
}

  backDetail() {
    this.fullScreenBtn = false;
    this.initImage();
  }
}
