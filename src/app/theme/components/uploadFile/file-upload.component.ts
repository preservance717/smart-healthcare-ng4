import {Component, OnInit, Input, NgZone, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'file-upload',
  templateUrl: 'file-upload.component.html',
  styleUrls: ['file-upload.scss'],
  providers: []
})
export class FileUploadComponent implements OnInit {
  @Input() disable: boolean = false;
  @Input() fileSizeLimit: number = 20971520;
  @Input() url: string;
  @Input() name: string;
  @Input() type: string = '';
  @Input() fileDisplay: boolean;

  @Output() onUploading = new EventEmitter<boolean>();
  @Output() onFinishUploading = new EventEmitter<any>();

  private zone: NgZone;
  uploading: boolean = false;
  progress: number = 0;
  private response: any = {};
  originalName: string = '';

  private reply: ReplyObject = new ReplyObject();
  options: Object;

  constructor() {
  }

  ngOnInit() {
    this.options = {
      url: this.url,
      fieldName: this.name
    };
    this.reply.property = this.name;
    this.zone = new NgZone({enableLongStackTrace: false});
  }

  handleUpload(data: any): void {
    // this.beforeUpload(data);
    this.onUploading.emit(true);

    //beforeUpload not firing bug so get originalName here:(!!
    // this.originalName = data.originalName;

    this.zone.run(() => {
      this.response = data;
      this.progress = Math.floor(data.progress.percent);
    });

    let rsp = data.response;
    if (rsp) {
      rsp = JSON.parse(rsp);
      this.reply.rsp = rsp;
      this.reply.originName = this.originalName;
      this.onFinishUploading.emit(this.reply);
    }
  }

  beforeUpload(uploadingFile): void {
    if (uploadingFile.size > this.fileSizeLimit) {
      uploadingFile.setAbort();
      alert('文件不能超过2M，请重新上传！');
    }
    this.originalName = uploadingFile.originalName;


  }

}

export class ReplyObject {
  property: string;
  rsp: any;
  originName:string;
}
