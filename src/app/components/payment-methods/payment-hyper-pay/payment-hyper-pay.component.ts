import { ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckoutResponse} from 'src/app/services/share-data.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-payment-hyper-pay',
  templateUrl: './payment-hyper-pay.component.html',
  styleUrls: ['./payment-hyper-pay.component.css']
})
export class PaymentHyperPayComponent implements OnInit {

  id: string;
  url: string;
  responseIdHyperPAy : any;
  myLanguageCus : any;
  mycurrentLangu:any;
  langToBEAPIs: any;
  responsId:any;
  language:any;

  constructor(public fb: FormBuilder,
      private router: Router, private elementRef: ElementRef,
      private activatedRoute: ActivatedRoute, private cdRef: ChangeDetectorRef) { 
      this.activatedRoute.queryParams.subscribe((res: CheckoutResponse) => {
        this.responsId = res.id;
        this.language = res.Lang;
        this.url = environment.portalPagesUrl + "HyperpayProcessPayment?id=" +
        this.responsId + "&Lang=" +  this.language + "&channel=" +  "portal";
        });
  }

  ngOnInit() {
    $("#loader_S").css("display","none");
    this.responseIdHyperPAy =this.router.url.substr(this.router.url.lastIndexOf('/') + 1);
  }

  ngAfterViewInit() {
    let myStorage = window.localStorage;
    this.mycurrentLangu= myStorage.getItem("currentLanguage");
    this.myLanguageCus = this.mycurrentLangu;
    if (this.myLanguageCus == 'English') {
      this.langToBEAPIs = "en";
    } else {
      this.langToBEAPIs = "ar";
    }
    this.cdRef.detectChanges();

    var s = document.createElement("script");
    s.type = "text/javascript";
    //https://oppwa.com/v1/paymentWidgets.js?checkoutId=@ViewBag.Id
    s.src = "https://oppwa.com/v1/paymentWidgets.js?"+'checkoutId='+ this.responsId;
    this.elementRef.nativeElement.appendChild(s);
    var jqueryScript = document.createElement("script");
    jqueryScript.type = "text/javascript";
    jqueryScript.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js";
    this.elementRef.nativeElement.appendChild(jqueryScript);
    
      var jqueryScript = document.createElement("script");
      jqueryScript.type = "text/javascript";
      jqueryScript.src = this.myLanguageCus == "English" ? "../../../../assets/js/hyperpay-en.js" : "../../../../assets/js/hyperpay-ar.js";
      this.elementRef.nativeElement.appendChild(jqueryScript);
  }
}