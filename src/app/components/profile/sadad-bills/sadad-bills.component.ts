import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
declare var $: any;
import { Slick } from 'ngx-slickjs';

@Component({
  selector: 'app-sadad-bills',
  templateUrl: './sadad-bills.component.html',
  styleUrls: ['./sadad-bills.component.css']
})
export class SadadBillsComponent implements OnInit {
  mycurrentLangu:any;
  myLanguageCus:any;
  langToBEAPIs:any;
  sadadBills:any;
  sadadBillsCount:any;
  showLoading = false;
  pagesCountMoreThanten = false;
  noOfPagesLabels: any;
  remindingHours:any;
  pageNumber =1;
  arrayNoOfPages: any[] = [];
  arrayLength = 10;
  config: Slick.Config = {
    infinite: true,
    slidesToShow: 20,
    slidesToScroll: 10,
    dots: false,
    autoplay: false,
  }
 

  @Output() onPageChange: EventEmitter<number> = new EventEmitter();

  constructor(private http: HttpClient,private cdRef :ChangeDetectorRef) {}

  getArray(count: number) {
    return new Array(count)
  }

  ngOnInit() {
    this.getSadadBills(this.pageNumber)
  }
 
  ngAfterViewChecked() {
    this.mycurrentLangu = window.localStorage.getItem("currentLanguage");
    this.myLanguageCus = this.mycurrentLangu;
    if (this.myLanguageCus == 'English') {
      this.langToBEAPIs = "en";
    } else {
      this.langToBEAPIs = "ar";
    }
    this.cdRef.detectChanges();
  }

  getSadadBills(pageNumber){
    this.showLoading = true;
    this.mycurrentLangu = window.localStorage.getItem("currentLanguage");
    this.myLanguageCus = this.mycurrentLangu;
    if (this.myLanguageCus == 'English') {
      this.langToBEAPIs = "en";
    } else {
      this.langToBEAPIs = "ar";
    }
    let UserId = localStorage.getItem("UserId"); 
    this.http.get(environment.portalUrl+"identityapi/api/profile/sadadBills?"+ "userId="+ UserId
    +'&'+"channel="+'portal'+'&'+ "language=" + this.langToBEAPIs +'&'+ "pageNumber=" + pageNumber, {
    }).subscribe(
      (res: any) => {          
        if (res) {
          this.sadadBills = res.Result.SadadBillsList;
          for(var i = 0; i< this.sadadBills.length; i++)
          {
            this.remindingHours = Math.floor(this.sadadBills[i].RemainingTimeToExpireInSeconds / 60/ 60 )
            this.sadadBills[i].RemainingTimeToExpireInSeconds =  this.remindingHours;
          }
          this.sadadBillsCount = res.Result.SadadBillsCount
          this.showLoading = false;
          if (this.sadadBillsCount > 10) {
            this.pagesCountMoreThanten = true;
            this.noOfPagesLabels = ((this.sadadBillsCount / 10) + 1);
            this.noOfPagesLabels.toFixed(2) * 1;
            for (let i = 1; i < this.noOfPagesLabels; i++) {
              this.arrayNoOfPages.push(i);
            }
          }
        } 
        else {} 
      },
      err => {
        console.log("Error occured");
      })
  }

  reCallGetSadadBills(pageNumber){
    this.showLoading = true;
    this.mycurrentLangu = window.localStorage.getItem("currentLanguage");
    this.myLanguageCus = this.mycurrentLangu;
    if (this.myLanguageCus == 'English') {
      this.langToBEAPIs = "en";
    } else {
      this.langToBEAPIs = "ar";
    }
    let UserId = localStorage.getItem("UserId"); 
    this.http.get(environment.portalUrl+"identityapi/api/profile/sadadBills?"+ "userId="+ UserId
    +'&'+"channel="+'portal'+'&'+ "language=" + this.langToBEAPIs +'&'+ "pageNumber=" + pageNumber, {
    }).subscribe(
      (res: any) => {          
        if (res) {
          this.sadadBills = res.Result.SadadBillsList;
          for(var i = 0; i< this.sadadBills.length; i++)
          {
            this.remindingHours = Math.floor(this.sadadBills[i].RemainingTimeToExpireInSeconds / 60/ 60 )
            this.sadadBills[i].RemainingTimeToExpireInSeconds =  this.remindingHours;
          }
        } 
        else {} 
      },
      err => {
        console.log("Error occured");
      })
  }

}
