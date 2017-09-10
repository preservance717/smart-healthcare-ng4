import {Component} from "@angular/core";

@Component({
  selector:'pages',
  template:`
<app-sh-header></app-sh-header>
<router-outlet></router-outlet>
<app-sh-footer></app-sh-footer>`
})

export class PagesComponent{

}
