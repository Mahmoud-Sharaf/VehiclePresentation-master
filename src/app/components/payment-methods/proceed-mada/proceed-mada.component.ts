import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckoutResponse, ShareDataService } from 'src/app/services/share-data.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-proceed-mada',
  templateUrl: './proceed-mada.component.html',
  styleUrls: ['./proceed-mada.component.css']
})
export class ProceedMadaComponent implements OnInit {

  myLanguageCus: any;
  mycurrentLangu: any;
  langToBEAPIs:any;
  checkoutDetails = {} as CheckoutResponse;
  responsId:any;
  language:any;
  url: string;

  constructor(public fb: FormBuilder, private http: HttpClient, private router: Router,
   private cdRef: ChangeDetectorRef, private activatedRoute: ActivatedRoute) { 
      this.activatedRoute.queryParams.subscribe((res: CheckoutResponse) => {
        this.responsId = res.id;
        this.language = res.Lang;
        this.hyperpayResponseProcess(this.responsId); 
      });
  }

  ngOnInit() {}

  ngAfterViewChecked() {
    this.mycurrentLangu = window.localStorage.getItem("currentLanguage");
    this.myLanguageCus = this.mycurrentLangu;
    if(this.myLanguageCus =='English'){
      this.langToBEAPIs = "en";
    }else{
      this.langToBEAPIs = "ar";
    }
    this.cdRef.detectChanges();
  }

  hyperpayResponseProcess(id) {
    const req = this.http.post(environment.checkout + "MadaProcessPayment?" + 'id=' + id 
    +"&"+ 'Lang=' + this.language +"&"+ 'channel=' + 'portal' ,{})
      .subscribe(
        (res: any) => {         
          if(res.errorCode != 1){
            this.router.navigate(['payment-error']);
          }
          else
          {
            this.router.navigate(['success-payment']);
          }
        },
        err => {
          console.log("Error occured");
        //  $('.serverErrValidation').text('حدث خطأ ..');
       //   $('.serverErrValidation').show();
        }
      )
  }

}
