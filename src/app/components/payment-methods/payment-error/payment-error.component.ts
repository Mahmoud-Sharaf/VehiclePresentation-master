import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-payment-error',
  templateUrl: './payment-error.component.html',
  styleUrls: ['./payment-error.component.css']
})
export class PaymentErrorComponent implements OnInit {
  myLanguageCus : any;
  mycurrentLangu:any;
  langToBEAPIs:any;

  constructor(private data: ShareDataService,private cdRef : ChangeDetectorRef) { }

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
}
