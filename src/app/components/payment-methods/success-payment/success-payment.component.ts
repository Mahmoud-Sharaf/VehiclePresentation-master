import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-success-payment',
  templateUrl: './success-payment.component.html',
  styleUrls: ['./success-payment.component.css']
})
export class SuccessPaymentComponent implements OnInit {
  myLanguageCus : any;
  mycurrentLangu:any;
  CompanyLogo:any;
  getCompanyLogo:any;
  langToBEAPIs:any;
  
  constructor(private router: Router, private data: ShareDataService, private cdRef : ChangeDetectorRef
   ) { }

  ngOnInit() {
    this.data.companyLogoPrefilled.subscribe(CompanyLogo => this.CompanyLogo = CompanyLogo);
    this.getCompanyLogo = this.CompanyLogo;
  }

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

     goToProfile(){
      this.router.navigate(['/profile']);
    }
  
    goToHomePage()
    {
      this.router.navigate(['/']);
    }
}
