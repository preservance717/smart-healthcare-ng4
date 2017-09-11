import {Component, OnInit} from "@angular/core";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";

@Component({
  selector: 'case-history',
  templateUrl: 'case-history.component.html',
  styleUrls: ['case-history.component.scss']
})

export class CaseHistoryComponent implements OnInit{
  sex:any;
  sexOptions = [
    {
      label: '请选择性别',
      id: '',
    },
    {
      label: '男',
      id: '男',
    },
    {
      label: '女',
      id: '女',
    }
  ];
  locale = "en";
  bsConfig: Partial<BsDatepickerConfig>;
  colorTheme = 'theme-default';

  step: string = '';

  private disableUpload: boolean = false;
  private reissueProofPic: string = 'reissueProofPic';
  private sizeLimit = 2097152;
  fileUploadUrl: string = '';

  ngOnInit(){
    this.sex = this.sexOptions[0];
    this.bsConfig= Object.assign({}, {locale: this.locale},{containerClass: this.colorTheme});
  }

  submit(){

  }

  onFileUploading() {
    this.disableUpload = true;
  }

  onFinishUploading() {
    this.disableUpload = false;
  }
}
