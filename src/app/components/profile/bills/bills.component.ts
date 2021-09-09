import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Router } from "@angular/router";
import * as FileSaver from 'file-saver'
declare var $: any;
import { Slick } from 'ngx-slickjs';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {
  bills:any;
  mycurrentLangu:any;
  myLanguageCus:any;
  langToBEAPIs:any;
  userId:any;
  showErrDescSubmitInq = false;
  servererror = "";
  showLoading = false;
  loading = false;
  billsCount:any;
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

  @Output() onPageChange: EventEmitter<number> = new EventEmitter();

  constructor(private http:HttpClient,private cdRef :ChangeDetectorRef, private router: Router) {}

  ngOnInit() {
    this.userId = localStorage.getItem("UserId");
    this.getAllBills(this.pageNumber)
  }

  getArray(count: number) {
    return new Array(count)
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

  getAllBills(pageNumber){
    this.showLoading = true;
    this.mycurrentLangu = window.localStorage.getItem("currentLanguage");
    this.myLanguageCus = this.mycurrentLangu;
    if (this.myLanguageCus == 'English') {
      this.langToBEAPIs = "en";
    } else {
      this.langToBEAPIs = "ar";
    }

    let UserId = localStorage.getItem("UserId"); 
    let SequenceOrCustomCardNumber= $("#SequenceOrCustomCardNumber").val();
    this.http.post(environment.portalUrl+"identityapi/api/profile/invoices?userId="+this.userId +'&'+"channel="+'portal'+'&'+"language="+ this.langToBEAPIs
    +"&"+ "pageNumber=" + pageNumber, {
    
    }).subscribe(
      (res: any) => {          
        if (res) {
          this.bills = res.Result.InvoicesList;
          this.billsCount = res.Result.InvoicesTotalCount
          this.showLoading = false;
          if (this.billsCount > 10) {
            this.pagesCountMoreThanten = true;
            this.noOfPagesLabels = ((this.billsCount / 10) + 1);
            this.noOfPagesLabels.toFixed(2) * 1;
            for (let i = 1; i < this.noOfPagesLabels; i++) {
              this.arrayNoOfPages.push(i);
            }
          }
        } else {} 
      },
      err => {
        console.log("Error occured");
      })
    
  }

  reCallGetAllBills(pageNumber){
    this.showLoading = true;
    this.mycurrentLangu = window.localStorage.getItem("currentLanguage");
    this.myLanguageCus = this.mycurrentLangu;
    if (this.myLanguageCus == 'English') {
      this.langToBEAPIs = "en";
    } else {
      this.langToBEAPIs = "ar";
    }

    let UserId = localStorage.getItem("UserId"); 
    let SequenceOrCustomCardNumber= $("#SequenceOrCustomCardNumber").val();
    this.http.post(environment.portalUrl+"identityapi/api/profile/invoices?userId="+this.userId +'&'+"channel="+'portal'+'&'+"language="+ this.langToBEAPIs
    +"&"+ "pageNumber=" + pageNumber, {
    
    }).subscribe(
      (res: any) => {          
        if (res) {
          this.bills = res.Result.InvoicesList;
          this.showLoading = false;
        } else {} 
      },
      err => {
        console.log("Error occured");
      })
    
  }

  filterBills(){
    
    if (this.myLanguageCus == 'English') {
      this.langToBEAPIs = "en";
    } else {
      this.langToBEAPIs = "ar";
    }
    let InvoiceNumber= $("#InvoiceNumber").val();
    this.http.post(environment.portalUrl+"identityapi/api/profile/invoices?userId="+this.userId +'&'+"channel="+'portal'+'&'+"language="+ this.langToBEAPIs, {
      InvoiceNumber:InvoiceNumber
    }).subscribe(
      (res: any) => {          
        if (res) {
          this.bills = res.Result.InvoicesList;
          this.billsCount = res.Result.InvoicesTotalCount;
          console.log(this.bills)
        } else {
        
        } 
      },
      err => {
        console.log("Error occured");
      })
    
  }

  downloadInvoice(fileId)
  {
      if (this.myLanguageCus == 'English') {
        this.langToBEAPIs = "en";
      } else {
        this.langToBEAPIs = "ar";
      }
  
      this.http.get(environment.profile + "DownloadInvoiceFilePDF?fileId="+fileId
      +"&"+ 'language=' + this.langToBEAPIs +"&"+ 'channel=' + 'portal', {
      }).subscribe(
        (res: any) => {
          FileSaver.saveAs('data:application/pdf;base64,' + res.Result, "Invoice" + '.pdf');
        },
        err => {
          console.log("Error occured");
        })
  }
}
