import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-account-g',
  templateUrl: './account-g.component.html',
  styleUrls: ['./account-g.component.css']
})
export class AccountGComponent implements OnInit {
  // lang: any;
  // myLanguageCus: any;
  // mycurrentLangu: any;
  // showLogin=true;
  // showReg=false;
  // checkLoginLabel=false;
  // checkRegLabel=true;
  // forgetPassOpenPopup : any;
  // showForgetPassErr: any;
  constructor(private _router: Router, private data: ShareDataService ) {}

  ngOnInit() {
   
  }
//   ngAfterViewChecked() {
//     this.data.currentCustomLanguage.subscribe(lang => this.lang = lang);
//     let myStorage = window.localStorage;
//     this.mycurrentLangu= myStorage.getItem("currentLanguage");
//     this.myLanguageCus = this.mycurrentLangu;
//   }
//  checkLogin(){
//    this.showLogin=true;
//    this.showReg=false
//    this.checkLoginLabel=false;
//    this.checkRegLabel=true;
//  }
//  checkReg(){
//   this.showLogin=false;
//   this.showReg=true
//   this.checkLoginLabel=true;
//   this.checkRegLabel=false;
// }
}
