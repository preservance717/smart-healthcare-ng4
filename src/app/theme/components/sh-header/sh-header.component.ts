import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-sh-header',
  templateUrl: './sh-header.component.html',
  styleUrls: ['sh-header.component.scss']
})
export class ShHeaderComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
  }

  toggleDB(){
    this.router.navigate(["/pages/db"]);
    return false;
  }

  toggleRA(){
    this.router.navigate(["/pages/ra"]);
    return false;
  }

  toggleCH(){
    this.router.navigate(["/pages/ch"]);
    return false;
  }
}
