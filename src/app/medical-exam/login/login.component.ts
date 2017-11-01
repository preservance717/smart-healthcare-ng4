import "style-loader!./login.scss";
import {LoginService} from "./login.service";
import {Component, ElementRef, HostListener, Renderer2} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import 'style-loader!./login.scss';
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalState} from "../../global.state";

@Component({
  selector: 'login',
  templateUrl: './login.html',
  providers: [LoginService],
  styleUrls:['./login.scss']
})
export class Login {

  public form: FormGroup;
  public name: AbstractControl;
  public password: AbstractControl;
  public submitted: boolean = false;
  public showExpertBtn:boolean = false;
  public showDoctorBtn: boolean = false;

  constructor(private _service: LoginService, private fb: FormBuilder, private elementRef: ElementRef,
              private route: ActivatedRoute, private router: Router, private Renderer: Renderer2, private GlobalState:GlobalState) {

    this.form = this.fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(4)])]
    });

    this.name = this.form.controls['name'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(event: any): void {
    this.submitted = true;
    if (this.form.valid) {
      this.router.navigate(['/medical-exam/pages']);

      //调用后台接口
      //   this._service.login(this.name.value, this.password.value).then(
      //     res => {
      //       if (res.aboolean === true) {
      //         this.router.navigate(['/medical-exam/pages']);
      //         sessionStorage.setItem("user_type", res.data);
      //       } else {
      //         alert(res.msg);
      //       }
      //     }).catch(error => console.log(error))
    }
  }

  showExpert(){
    this.showExpertBtn = true;
    this.showDoctorBtn = false;
  }

  showDoctor(){
    this.showExpertBtn = false;
    this.showDoctorBtn = true;
  }
}
