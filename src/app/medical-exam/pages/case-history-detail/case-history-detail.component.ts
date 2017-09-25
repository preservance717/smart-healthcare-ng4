/**
 * Created by gaole on 2017/9/8.
 */
import {Component, OnInit, HostListener, ElementRef, ViewChild} from "@angular/core";
import {CornerstoneService} from "../../../theme/services/cornerstone.service";
import {CaseHistoryDetailService} from "./case-history-detail.service";
import {GlobalState} from "../../../global.state";
import * as $ from "jquery";
import {pneumoconiosisOptions} from "./pneumoconiosisOptions";

declare const cornerstone;
declare const cornerstoneTools;

@Component({
  selector: 'case-history-detail',
  templateUrl: 'case-history-detail.component.html',
  styleUrls: ['case-history-detail.component.scss'],
  providers: [CaseHistoryDetailService]
})

export class CaseHistoryDetailComponent implements OnInit {
  @ViewChild('dcmEle') dcmEle: ElementRef;
  @ViewChild('fullDcmEle') fullDcmEle: ElementRef;
  imageData: any;
  taskId: string = '';
  patientMDInfo: any = {
    patientName: "",
    sex: "",
    age: "",
    dustAge: "",
    analysisResult: "",
    reviewResult: "",
    reviewComment: "",
    filename: "",
    xrayId: ""
  };
  reviewResults = pneumoconiosisOptions;
  reviewComment: string;
  reviewResult: string;
  expertResult: string;

  userType: string;

  fullScreenBtn: boolean = false;

  imageList = [];

  currentIndex = 0;
  updateBtn: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if(this.dcmEle){
      cornerstone.resize(this.dcmEle.nativeElement, true);
    }else if(this.fullDcmEle){
      cornerstone.resize(this.fullDcmEle.nativeElement, true);
    }
  }

  @HostListener('mousewheel', ['$event'])
  onMouseWheel(event) {
    // event.preventDefault();

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
              private _state: GlobalState) {
    this.taskId = sessionStorage.getItem("taskId");
    this.userType = sessionStorage.getItem("user_type");
  }

  initImage(fileName) {
    cornerstone.enable(this.dcmEle.nativeElement);

    this.csS.fetchDicomImage(`/TM/files/${fileName}`)
      .subscribe(res => {
        this.imageData = res;
        if (this.imageData) {

          if (!this.imageList.filter(img => img.imageId === this.imageData.imageId).length) {
            this.imageList.push(this.imageData);
          }

          if (this.imageData.imageId) {
            this.activeDcm(this.dcmEle.nativeElement, this.imageData);
          }
        }
      });

  }

  ngOnInit() {
    this.reviewDetail();
  }

  reviewDetail() {
    this._service.reviewDetail(this.taskId)
      .then(res => {
        this.patientMDInfo = res.data;
        this.initImage(this.patientMDInfo.filename);
        if (this._state.expertStatus == "update") {
          this.reviewResult = this.patientMDInfo.reviewResult;
          this.reviewComment = this.patientMDInfo.reviewComment;
        } else if (this._state.expertStatus == "review") {
          if (this.patientMDInfo.reviewResult) {
            this.updateBtn = true;
            this.reviewComment = this.patientMDInfo.reviewComment;
            this.expertResult = this.reviewResults[this.patientMDInfo.reviewResult].label;
          }
        }
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
        if (res.aboolean === true) {
          this.updateBtn = true;
          this.expertResult = this.reviewResults[this.reviewResult].label
        }
      })
  }

  reviewFullScreen() {
    this.fullScreenBtn = true;
    setTimeout(() => {
      cornerstone.enable(this.fullDcmEle.nativeElement);

      this.csS.fetchDicomImage(`/TM/files/${this.patientMDInfo.filename}`)
        .subscribe(res => {
          this.imageData = res;
          if (this.imageData) {

            if (!this.imageList.filter(img => img.imageId === this.imageData.imageId).length) {
              this.imageList.push(this.imageData);
            }

            if (this.imageData.imageId) {
              this.activeDcm(this.fullDcmEle.nativeElement, this.imageData);
              this.dcmDescripe();
            }
          }
        });
    }, 0)
  }

  dcmDescripe(){
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
    $('#loadTime').text(this.imageData.loadTimeInMS + "ms");
    $('#decodeTime').text(this.imageData.decodeTimeInMS + "ms");
  }

  activeDcm(ele, imageData){
    cornerstone.displayImage(ele, imageData);
    cornerstoneTools.mouseInput.enable(ele);
    cornerstoneTools.mouseWheelInput.enable(ele);

    // Enable all tools we want to use with this ele
    cornerstoneTools.wwwc.activate(ele, 1); // ww/wc is the default tool for left mouse button
    cornerstoneTools.pan.activate(ele, 2); // pan is the default tool for middle mouse button
    cornerstoneTools.zoom.activate(ele, 4); // zoom is the default tool for right mouse button
    cornerstoneTools.zoomWheel.activate(ele); // zoom is the default tool for middle mouse wheel
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
    if (value === undefined) {
      return;
    }
    return value + (value === 0 ? ' (unsigned)' : ' (signed)');
  }

  getPlanarConfiguration() {
    var value = this.imageData.data.uint16('x00280006');
    if (value === undefined) {
      return;
    }
    return value + (value === 0 ? ' (pixel)' : ' (plane)');
  }

  backDetail() {
    this.fullScreenBtn = false;
    setTimeout(() => {
      this.initImage(this.patientMDInfo.filename);
    }, 0);
  }
}
