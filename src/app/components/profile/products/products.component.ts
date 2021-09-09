import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products:any;
  mycurrentLangu:any;
  myLanguageCus:any;
  langToBEAPIs:any;

  constructor(private http: HttpClient,private cdRef :ChangeDetectorRef) { }

  ngOnInit() {
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


  allowOnlyNumbers(e) {
    let input;
    if (e.metaKey || e.ctrlKey) {
      return true;
    }
    if (e.which === 32) {
      return false;
    }
    if (e.which === 0) {
      return true;
    }
    if (e.which < 33) {
      return true;
    }

    input = String.fromCharCode(e.which);
    return !!/[\d\s]/.test(input);
  }



  getAllPolicies(){
    if (this.myLanguageCus == 'English') {
      this.langToBEAPIs = "en";
    } else {
      this.langToBEAPIs = "ar";
    }
    let SequenceOrCustomCardNumber =$('#SequenceOrCustomCardNumber').val();
    let InsuredNIN =$('#InsuredNIN').val();
    let PolicyNumber =$('#PolicyNumber').val();

    let UserId = localStorage.getItem("UserId"); 
    if(UserId ==null){
      UserId = "00000000-0000-0000-0000-000000000000";
    }

    this.http.post(environment.profile+"policies?userId="+UserId+"&"+ 'pageNumber=' +100 +"&"+ 'language=' + this.langToBEAPIs+ "&" +'channel='+'portal', {
      SequenceOrCustomCardNumber:SequenceOrCustomCardNumber,
      InsuredNIN:InsuredNIN,
      PolicyNumber:PolicyNumber,
   
    }).subscribe(
      (res: any) => {          
        if (res) {
          this.products = res.Result;
        } else {
        
        } 
      },
      err => {
        console.log("Error occured");
      })
    
  }
}
