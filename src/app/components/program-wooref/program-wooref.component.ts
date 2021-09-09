import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
import * as FileSaver from 'file-saver';
import {jsPDF} from 'jspdf';

@Component({
  selector: 'app-program-wooref',
  templateUrl: './program-wooref.component.html',
  styleUrls: ['./program-wooref.component.css']
})
export class ProgramWoorefComponent implements OnInit {
  myLanguageCus:any;
  mycurrentLangu:any;
  langToBEAPIs:any;
  captch:any;
  CaptchaForm: FormGroup;
  programs:any;
  nationalId:any;
  showLoading = false;
  loading = false;
  showErrDesc = false;
  servererror = "";
  cpatchaMandatory = false;
  showNationalIdError = false;
  @ViewChild('pdfTable', {static: false}) pdfTable: ElementRef;


  constructor(private http: HttpClient , private cdRef: ChangeDetectorRef, public fb: FormBuilder,) { }

  ngOnInit() {
    this.CaptchaForm = this.fb.group({
      captcha: [null],
    });

    this.getProgramWooref()
  }



  
  public downloadAsPDF() {
    const doc = new jsPDF();

    const specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    const pdfTable = this.pdfTable.nativeElement;

    doc.fromHTML(pdfTable.innerHTML, 15, 15, {
      width: 190,
      'elementHandlers': specialElementHandlers
    });

    doc.save('tableToPdf.pdf');
  }


  ngAfterViewChecked() {
    let myStorage = window.localStorage;
    this.mycurrentLangu = myStorage.getItem("currentLanguage");
    this.myLanguageCus = this.mycurrentLangu;
    if (this.myLanguageCus == 'English') {
      this.langToBEAPIs = "ar";
    } else {
      this.langToBEAPIs = "en";
    }
    this.cdRef.detectChanges();

  }

  alllowOnlyNumbers(e) {
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

  getProgramWooref(){
    this.showLoading = true;
    this.mycurrentLangu = window.localStorage.getItem("currentLanguage");
    this.myLanguageCus = this.mycurrentLangu;
    if (this.myLanguageCus == 'English') {
      this.langToBEAPIs = "en";
    } 
    else {
      this.langToBEAPIs = "ar";
    }

    this.http.post(environment.portalUrl+"GenericApi/api/offer/get-offers?channel=" +'portal' +"&"+"language=" +  this.langToBEAPIs, {}).subscribe(
      (res: any) => {          
        if (res.ErrorCode != 1) {
          this.showLoading = false;
          this.showErrDesc = true;
          this.servererror = res.ErrorDescription;
        } 
        else {
          this.programs = res.Result;
          this.showLoading = false;
          this.showErrDesc = false;
        } 
      },
      err => {
        console.log("Error occured");
      })
  }
 
  searchProgramByNIN(){
    this.loading = true;
    $('.send-Btn').attr("disabled","disabled")
    this.mycurrentLangu = window.localStorage.getItem("currentLanguage");
    this.myLanguageCus = this.mycurrentLangu;
    if (this.myLanguageCus == 'English') {
      this.langToBEAPIs = "en";
    } 
    else {
      this.langToBEAPIs = "ar";
    }

    let myStorage = window.localStorage;
    let captchaInput = myStorage.getItem("captchaInputImg");
    let captchaTOken = myStorage.getItem("captchaInputTOKEN");

    this.captch = {token:captchaTOken, input:captchaInput}
    
    if (this.CaptchaForm.invalid || this.nationalId == null) {
      this.loading = false;
      this.cpatchaMandatory = true;
      return false;
    } else {
      this.cpatchaMandatory = false;
      this.loading = true;
    }

    if(this.nationalId.length < 10)
    {
      this.showNationalIdError = true;
    }

    else
    {
      this.showNationalIdError = false;
    }
    

    this.http.post(environment.profile+"checkForOffers", {
      Nin: this.nationalId,
      Channel: "portal",
      Lang: this.langToBEAPIs, 
      Captcha: this.captch
    }).subscribe(
      (res: any) => {          
        if (res.ErrorCode != 1) {
          this.loading = false;
          this.showErrDesc = true;
          this.servererror = res.ErrorDescription;
        } 
        else {
          $('.send-Btn').removeAttr("disabled")
          this.programs = res.Result;
          this.showErrDesc = false;
          this.loading = false;
        } 
      },
      err => {
        console.log("Error occured");
      })
  }


  // downloadResult(fileId){

  //   FileSaver.saveAs('data:application/pdf;base64,' + , "Programs Wooref" + '.pdf');
  
  // }

}
