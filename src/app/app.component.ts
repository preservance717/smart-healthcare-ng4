import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  url: string;

  constructor(private router:Router){
    this.url = window.location.href;
  }
  ngOnInit(){
    let path = this.url.split("?")[1];
    if(path == "platform=tj"){
      this.router.navigate(['/medical-exam']);
    }else if(path == "platform=mz"){
      this.router.navigate(['/mz-platform']);
    }
  }
}
