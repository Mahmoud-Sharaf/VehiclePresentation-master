import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  mycurrentLangu:any;
  myLanguageCus:any;
  langToBEAPIs:any;
  userId:any;
  statistics:any;
  PolicysCount:any;
  ActivePolicysCount:any;
  OffersCount:any;
  EditRequestsCount:any;
  InvoicesCount:any;
  PoliciesExpiredCount:any;
  info : any; 
  UserName: any; 
  Email: any; 
  PhoneNumber: any;
  showLoading = false;
  quotations:any;
  hideIfExistQuotations = true;
  showIfExistQuotations = false;

  constructor(private http: HttpClient,private cdRef: ChangeDetectorRef,
    private router: Router) { }

  ngOnInit() {
   this.getStatistics();
   this.getProfileInfo();
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

  getStatistics()
  {
    this.hideIfExistQuotations = true;
    this.showIfExistQuotations = false;
    this.showLoading = true;
    this.mycurrentLangu = window.localStorage.getItem("currentLanguage");
    this.myLanguageCus = this.mycurrentLangu;
    if (this.myLanguageCus == 'English') {
      this.langToBEAPIs = "en";
    } else {
      this.langToBEAPIs = "ar";
    }
    this.userId = localStorage.getItem("UserId");
    this.http.get(environment.portalUrl + "identityapi/api/profile/statistics?"+'channel='  + "portal" + "&" + 
    'language='+ this.langToBEAPIs +"&" + 'pageNumber=' + 1 + "&" + 'userId=' + this.userId, {
    }).subscribe(
      (res: any) => {
        if (res.Result.ErrorCode != 1) {
          this.showLoading = false;
        }
         else {
          this.statistics = res.Result.Statistics;
          this.PolicysCount = this.statistics.PolicysCount;
          this.ActivePolicysCount=this.statistics.ActivePolicysCount;
          this.OffersCount=this.statistics.OffersCount;
          this.PoliciesExpiredCount=this.statistics.PoliciesExpiredCount;
          this.InvoicesCount=this.statistics.InvoicesCount;
          this.EditRequestsCount=this.statistics.EditRequestsCount; 
          this.showLoading = false;
        }
      },
      err => {
        console.log("Error occured");
      })
  }

  getProfileInfo(){
    this.hideIfExistQuotations = true;
    this.showIfExistQuotations = false;
    let UserId = localStorage.getItem("UserId"); 
    if(UserId ==null){
      UserId = "00000000-0000-0000-0000-000000000000";
    }
    this.mycurrentLangu = window.localStorage.getItem("currentLanguage");
    this.myLanguageCus = this.mycurrentLangu;
    if (this.myLanguageCus == 'English') {
      this.langToBEAPIs = "en";
    } else {
      this.langToBEAPIs = "ar";
    }
    this.http.get(environment.profile+"profileByType?userId=" +UserId+ "&" +'profileTypeId=' + 0 + "&" + 'language=' + this.langToBEAPIs +"&"+ 'channel=' +'portal', {
    }).subscribe(
      (res: any) => {          
        if (res) {
          this.info = res.Result.UserObj;
          console.log(this.info);
          this.UserName = this.info.UserName;
          this.Email = this.info.Email;
          this.PhoneNumber = this.info.PhoneNumber;
        } else {
        
        }
      },
      err => {
        console.log("Error occured");
    }) 
  }

  
  showQuotations()
  {
    this.showLoading = true;
    this.showIfExistQuotations = true;
    this.hideIfExistQuotations = false;
    let UserId = localStorage.getItem("UserId"); 
    if(UserId ==null){
      UserId = "00000000-0000-0000-0000-000000000000";
    }
    if (this.myLanguageCus == 'English') {
      this.langToBEAPIs = "en";
    } else {
      this.langToBEAPIs = "ar";
    }
    this.userId = localStorage.getItem("UserId");
    this.http.get(environment.profile+"GetQuotationRequestDetail?userId=" + this.userId +"&"+ 'culture='+ this.langToBEAPIs +"&"+ 'channel=' + 'portal', {
    }).subscribe(
      (res: any) => {          
        if (res) {
          this.quotations = res.Result;
          if(this.quotations == [])
          {
            this.getStatistics();
            this.getProfileInfo();
          }
          this.showLoading = false;
        } 
        else {
          this.showLoading = false;
        }
      },
      err => {
        console.log("Error occured");
      })
  }

  
  showSearchQuotations(externalId)
  {
    this.router.navigate(['/quotations/' + externalId]);
  }
}
