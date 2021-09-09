import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import * as FileSaver from 'file-saver';
import { DatePipe } from '@angular/common';
declare var $: any;
import { Slick } from 'ngx-slickjs';
import * as moment from 'moment';



@Component({
  selector: 'app-policies',
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.css'],
  providers: [DatePipe]
})
export class PoliciesComponent implements OnInit {
  mycurrentLangu:any;
  myLanguageCus:any;
  langToBEAPIs:any;
  polices:any;
  showErrDescSubmitInq = false;
  servererror = "";
  showLoading = false;
  loading = false;
  canRenewPolicy = false;
  myDate :any = new Date();
  currentDate;
  dateIFExpired:any;
  policiesCount:any;
  pagesCountMoreThanten = false;
  noOfPagesLabels: any;
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
  PolicyExpiryDate:any;
  remindingDays:any;
  @Output() onPageChange: EventEmitter<number> = new EventEmitter();


  constructor(private http: HttpClient,private cdRef: ChangeDetectorRef,private router: Router,
    private datePipe: DatePipe) 
    {
      // this.currentDate= this.datePipe.transform(this.myDate, 'dd-MM-yyyy');
      this.myDate.setDate(this.myDate.getDate() + 1);
      console.log(this.currentDate)
    }
    

  getArray(count: number) {
    return new Array(count)
  }

  ngOnInit() {
    this.getPolices(this.pageNumber);
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


  reCallGetPolices(pageNumber){
    this.showLoading = true;
    this.mycurrentLangu = window.localStorage.getItem("currentLanguage");
    this.myLanguageCus = this.mycurrentLangu;
    if (this.myLanguageCus == 'English') {
      this.langToBEAPIs = "en";
    } else {
      this.langToBEAPIs = "ar";
    }

    let UserId = localStorage.getItem("UserId"); 
    this.http.post(environment.portalUrl+"identityapi/api/profile/policies?userId="+UserId+'&'+"channel="+'portal'+'&'+ "language=" + this.langToBEAPIs
    +"&"+ "pageNumber=" + pageNumber, {}).subscribe(
      (res: any) => {          
        if (res) {
          this.polices = res.Result.PoliciesList;
          this.showLoading = false; 
        } else {} 
      },
      err => {
        console.log("Error occured");
      })
  }

  getPolices(pageNumber){
    this.showLoading = true;
    this.mycurrentLangu = window.localStorage.getItem("currentLanguage");
    this.myLanguageCus = this.mycurrentLangu;
    if (this.myLanguageCus == 'English') {
      this.langToBEAPIs = "en";
    } else {
      this.langToBEAPIs = "ar";
    }

    let UserId = localStorage.getItem("UserId"); 
    this.http.post(environment.portalUrl+"identityapi/api/profile/policies?userId="+UserId+'&'+"channel="+'portal'+'&'+ "language=" + this.langToBEAPIs
    +"&"+ "pageNumber=" + pageNumber, {
    }).subscribe(
      (res: any) => {          
        if (res) {
          this.polices = res.Result.PoliciesList;

          for(var i =0; i< this.polices.length; i++)
          {

              let currentDate = new Date();
              this.PolicyExpiryDate = new Date(this.polices[i].PolicyExpiryDate);
             this.remindingDays  = Math.floor((Date.UTC(this.PolicyExpiryDate.getFullYear(), this.PolicyExpiryDate.getMonth(), this.PolicyExpiryDate.getDate())
               -  Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) ) /(1000 * 60 * 60 * 24));
           console.log(this.remindingDays);
           this.polices[i].PolicyExpiryDate = this.remindingDays

          }

          
    
         
          this.policiesCount = res.Result.PoliciesTotalCount;
          this.showLoading = false;
          if (this.policiesCount > 10) {
            this.pagesCountMoreThanten = true;
            this.noOfPagesLabels = ((this.policiesCount / 10) + 1);
            this.noOfPagesLabels.toFixed(2) * 1;
            for (let i = 1; i < this.noOfPagesLabels; i++) {
              this.arrayNoOfPages.push(i);
            }
          }
        } else 
        {

        } 
      },
      err => {
        console.log("Error occured");
      })
  }

  renewPolicy(eid,renewal,reference,CustomCardNumber){
    let customCardNumber = CustomCardNumber;
    console.log(customCardNumber);
    if(customCardNumber !=null){
      this.router.navigate(['/']);
    }else{
      this.editApi(eid,renewal,reference);
    }
    //lw customcard > home page  //lw seq >> quotation     
  }

  editApi(eid,renewal,reference){
    this.http.get(environment.editInqReq + "?eid=" + eid +"&"  + "r=" + renewal +"&" + "re=" + reference, {
    }).subscribe(
      (res: any) => {
       console.log(res);
       let submitRequest =  res.data;
       const req = this.http.post(environment.inquiry + "submit-inquiry-request", submitRequest).subscribe(
         (res: any) => {
           console.log(res);
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


  filterPolices(){
    if (this.myLanguageCus == 'English') {
      this.langToBEAPIs = "en";
    } else {
      this.langToBEAPIs = "ar";
    }
  
    let UserId = localStorage.getItem("UserId"); 
    let SequenceOrCustomCardNumber= $("#SequenceOrCustomCardNumber").val();
    let InsuredNIN= $("#InsuredNIN").val();
    let PolicyNumber= $("#PolicyNumber").val();

    this.http.post(environment.portalUrl+"identityapi/api/profile/policies?userId="+UserId+'&'+"channel="+'portal'+'&'+ "language=" + this.langToBEAPIs, {
      SequenceOrCustomCardNumber:SequenceOrCustomCardNumber,
      InsuredNIN:InsuredNIN,
      PolicyNumber:PolicyNumber
    }).subscribe(
      (res: any) => {          
        if (res) {
          this.polices = res.Result.PoliciesList;
          console.log(this.polices)
        } else {
        
        } 
      },
      err => {
        console.log("Error occured");
      })
  }

  downloadPolicy(fileId){
    if (this.myLanguageCus == 'English') {
      this.langToBEAPIs = "en";
    } else {
      this.langToBEAPIs = "ar";
    }

    this.http.get(environment.profile + "DownloadPolicyFile?fileId="+fileId
    +"&"+ 'language=' + this.langToBEAPIs +"&"+ 'channel=' + 'portal', {
    }).subscribe(
      (res: any) => {
        FileSaver.saveAs('data:application/pdf;base64,' + res.Result, "Policy" + '.pdf');
      },
      err => {
        console.log("Error occured");
      })
  }
  
  }
  


