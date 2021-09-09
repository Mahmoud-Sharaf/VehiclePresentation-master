import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications:any;
  showLoading = false;
  mycurrentLangu:any;
  myLanguageCus:any;
  langToBEAPIs:any;

  constructor(private http: HttpClient,private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
   this.getAllUserNotifications();
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

  getAllUserNotifications(){
    this.showLoading = true; 
    this.mycurrentLangu = window.localStorage.getItem("currentLanguage");
    this.myLanguageCus = this.mycurrentLangu;
    if (this.myLanguageCus == 'English') {
      
      this.langToBEAPIs = "en";
    } else {
      this.langToBEAPIs = "ar";
    }
    
    this.http.get(environment.profile+"getAllUserNotifications?channel=" +'portal' +"&"+ 'lang='+ this.langToBEAPIs, {
    }).subscribe(
      (res: any) => {          
        if (res) {
          this.notifications = res.Result;
          this.showLoading = false; 
        } else {} 
      },
      err => {
        console.log("Error occured");
      })
  }

}
