import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { DOCUMENT } from "@angular/common";
import { Inject } from "@angular/core";
import { DateAdapter } from '@angular/material';
import { Router } from "@angular/router";
import { Location } from "@angular/common";

declare var $: any;
import * as XLSX from 'xlsx';
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.prod";
const { read, write, utils } = XLSX;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  route: string;
  qtExternalID : any;
  refID : any;
  showErrDescSubmitInq = false;
  servererror = "";
  showLoading = false;
  loading = false;

  constructor(
    private translateService: TranslateService,
    @Inject(DOCUMENT) private document: Document,
    private dateAdapter: DateAdapter<any>, location: Location, private router: Router,private http: HttpClient) {
      let urlstr = location.path();
      if (urlstr != "" && urlstr.includes('eid')) {
        this.route = urlstr;
        var str = urlstr;
        var splitted = str.split("=", 4);
        this.refID = splitted[3];
        let qtExtr = splitted[1].split("&",2);
        this.qtExternalID = qtExtr[0];
        this.editApi(this.qtExternalID,"1",this.refID);   
      }   
  }

  editApi(eid,renewal,reference){
    this.http.get(environment.editInqReq + "?eid=" + eid +"&"  + "r=" + renewal +"&" + "re=" + reference, {
    }).subscribe(
      (res: any) => {
     //  console.log(res);
       let submitRequest =  res.data;
       const req = this.http.post(environment.inquiry + "submit-inquiry-request", submitRequest).subscribe(
         (res: any) => {
          // console.log(res);
           if (res.ErrorCode != 1) {
             this.showErrDescSubmitInq = true;
             this.servererror = res.ErrorDescription;
             this.showLoading = false;
             this.loading = false;   
           } else {
             this.loading = true;
             let quotationRequestExternalId = res.inquiryResponseModel.quotationRequestExternalId;
             this.router.navigate(['/quotations/' + quotationRequestExternalId]);
        }
         },
         err => {
           this.loading = false;
           this.showErrDescSubmitInq = true;
           console.log("Error occured");
           this.showLoading = false;       
         }
       )
   
      },
      err => {
        console.log("Error occured");
      })
  }


  
 
 





  changeLangage(lang: string) {
    let htmlTag = this.document.getElementsByTagName(
      "html"
    )[0] as HTMLHtmlElement;
    htmlTag.dir = lang === "Arabic" ? "rtl" : "ltr";
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
    this.changeCssFile(lang);
  }

  changeCssFile(lang: string) {
    let headTag = this.document.getElementsByTagName(
      "head"
    )[0] as HTMLHeadElement;
    let existingLink = this.document.getElementById(
      "langCss"
    ) as HTMLLinkElement;

    let bundleName = lang === "Arabic" ? "arabicStyle.css" : "englishStyle.css";

    if (existingLink) {
      existingLink.href = bundleName;
    } else {
      let newLink = this.document.createElement("link");
      newLink.rel = "stylesheet";
      newLink.id = "langCss";
      newLink.href = bundleName;
      headTag.appendChild(newLink);
    }
  }
}


