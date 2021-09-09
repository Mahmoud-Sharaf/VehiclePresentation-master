import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-my-info',
  templateUrl: './my-info.component.html',
  styleUrls: ['./my-info.component.css']
})
export class MyInfoComponent implements OnInit {

  constructor(private http: HttpClient,private cdRef :ChangeDetectorRef) { }
  info : any;
  mycurrentLangu:any;
  myLanguageCus:any;
  langToBEAPIs:any;
  ngOnInit() {
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

  getProfileInfo(){
    this.mycurrentLangu = window.localStorage.getItem("currentLanguage");
    this.myLanguageCus = this.mycurrentLangu;
    if (this.myLanguageCus == 'English') {
      this.langToBEAPIs = "en";
    } else {
      this.langToBEAPIs = "ar";
    }
    let UserId = localStorage.getItem("UserId"); 
    if(UserId ==null){
      UserId = "00000000-0000-0000-0000-000000000000";
    }

      this.http.get(environment.profile+"profileByType?userId="+UserId+"&"+'profileTypeId='+0+"&"+'language='+this.langToBEAPIs+"&"+'channel='+'portal', {
      }).subscribe(
        (res: any) => {          
          if (res) {
            this.info = res.Result.UserObj;
            console.log(this.info);
          } else {
          
          }
        },
        err => {
          console.log("Error occured");
        })
      
  }

}
