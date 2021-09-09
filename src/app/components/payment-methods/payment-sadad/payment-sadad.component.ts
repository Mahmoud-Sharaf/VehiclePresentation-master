import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-payment-sadad',
  templateUrl: './payment-sadad.component.html',
  styleUrls: ['./payment-sadad.component.css']
})
export class PaymentSadadComponent implements OnInit {

  mycurrentLangu: string;
  myLanguageCus: string;
  message: string;
  messageRes: any;
  sadadNum: any;
  sadadDate: any;
  sadadPaymentResponseModel: any;
  langToBEAPIs: any;
  PremiumAmount: any;
  BillDueDate: any;
  CheckoutEmail: any;
  CheckoutReferenceId: any;
  CompanyName: any;
  InvoiceNo: any;
  ReferenceId: any;


  constructor(private data: ShareDataService, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    
    this.data.currentresponse.subscribe(messageRes => this.messageRes = messageRes);
 

    this.PremiumAmount = this.messageRes.PremiumAmount;
    this.BillDueDate = this.messageRes.BillDueDate;
    this.CheckoutEmail = this.messageRes.CheckoutEmail;
    this.CheckoutReferenceId = this.messageRes.CheckoutReferenceId;
    this.CompanyName = this.messageRes.CompanyName;
    this.InvoiceNo = this.messageRes.InvoiceNo;
    this.ReferenceId = this.messageRes.ReferenceId;

  }

  ngAfterViewChecked() {
    let myStorage = window.localStorage;
    this.mycurrentLangu = myStorage.getItem("currentLanguage");
    this.myLanguageCus = this.mycurrentLangu;
    if (this.myLanguageCus == 'English') {
      this.langToBEAPIs = "en";
    } else {
      this.langToBEAPIs = "ar";
    }
    this.cdRef.detectChanges();
  }

}
