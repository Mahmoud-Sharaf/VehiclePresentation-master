import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
import { isNullOrUndefined } from 'util';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-insurance-document',
  templateUrl: './insurance-document.component.html',
  styleUrls: ['./insurance-document.component.css']
})
export class InsuranceDocumentComponent implements OnInit {

  formdata: FormGroup;
  CaptchaForm: FormGroup;
  notValidHere: any[] = [];
  @Input() submitted;
  errors: [];
  cpatchaMandatory = false;
  loading = false;
  sequenceOnly = true;
  customNoOnly = false;
  showErrDesc = false;
  vehicleIdType: any;
  servererror =""
  mycurrentLangu:any;
  myLanguageCus:any;
  langToBEAPIs:any;
  captch:any;
  policies:any;

  constructor(public fb: FormBuilder, private http: HttpClient, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.formdata = this.fb.group({
      nationalId: new FormControl("", [Validators.required, this.minValueMaxValue.bind(this)]),
      sequenceNo: new FormControl(""),
      customNo: new FormControl(""),
      vehicleIdTypeId: new FormControl("1", Validators.required),
    });

    this.CaptchaForm = this.fb.group({
      captcha: [null, [Validators.required]],
    });

    if (this.formdata.controls["vehicleIdTypeId"].value == 1) {
      this.sequenceNumberClick();
    } else {
      this.customNoClick();
    }
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

  minValueMaxValue(control: FormControl): { [s: string]: boolean } {
    if (control.value != null && control.value != "") {
      if (!isNullOrUndefined(control.value)) {
        if (control.value.length < 10) {
          return { mainLength: true };
        }
        if (control.value.length > 10) {
          control.setValue(control.value.substring(0, 10));
        } else {
          return null;
        }
      }
    }
  }

  minValueFiledsSequenceNumber(control: FormControl): { [s: string]: boolean } {
    if (control.value != null && control.value != "") {
      if (!isNullOrUndefined(control.value)) {
        if (control.value.length < 3) {
          return { SequenceNumberLength: true };
        } else {
          return null;
        }
      }
    }
  }

  minValueFiledsCustomNumber(control: FormControl): { [s: string]: boolean } {
    if (control.value != null && control.value != "") {
      if (!isNullOrUndefined(control.value)) {
        if (control.value.length < 9) {
          return { CustomNumberLength: true };
        } else {
          return null;
        }
      }
    }
  }

  sequenceNumberClick() {
    this.sequenceOnly = true;
    this.customNoOnly = false;
    this.formdata.get("sequenceNo").setValidators([Validators.required,
        this.minValueFiledsSequenceNumber.bind(this),]);
    this.formdata.get("customNo").setValidators(null);
    this.formdata.get("customNo").setValue(null);
    this.formdata.get("customNo").clearValidators();
    this.formdata.get("customNo").updateValueAndValidity();
    this.vehicleIdType = 1;
  }
  customNoClick() {
    this.sequenceOnly = false;
    this.customNoOnly = true;
    this.formdata.get("customNo").setValidators([ Validators.required,
        this.minValueFiledsCustomNumber.bind(this),]);
    this.formdata.get("sequenceNo").setValidators(null);
    this.formdata.get("sequenceNo").setValue(null);
    this.formdata.get("sequenceNo").clearValidators();
    this.formdata.get("sequenceNo").updateValueAndValidity();
    this.vehicleIdType = 2;
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

  onClickSubmit(data) {
    this.submitted = true;
    this.errors = [];
    $('.search-Btn').attr("disabled","disabled")
    this.notValidHere = new Array();
    let myStorage = window.localStorage;
    let captchaInput = myStorage.getItem("captchaInputImg");
    let captchaTOken = myStorage.getItem("captchaInputTOKEN");

    this.captch = {token:captchaTOken, input:captchaInput}

    //sequence No
    if (this.sequenceOnly == true)
    {
      if (this.formdata.invalid || this.CaptchaForm.invalid) {
        $('.search-Btn').removeAttr("disabled")
        this.loading = false;
        this.cpatchaMandatory = true;
        return false;
      } 
      else {
        $('.search-Btn').attr("disabled","disabled")
        this.cpatchaMandatory = false;
        this.loading = true;
      }

      const req = this.http.post(environment.profile + "SearchPolicy", {
          NIN: data.nationalId,
          sequenceNumber: data.sequenceNo,
          customCardNumber: "",
          lang: this.langToBEAPIs,
          hannel : "portal",
          Captcha: this.captch
      })
      .subscribe(
          (res: any) => {
            if (res.ErrorCode != 1) {
              this.loading = false;
               this.showErrDesc = true;
               this.servererror = res.ErrorDescription; 
               $('.search-Btn').removeAttr("disabled")
            }
             else {
               this.loading = false;
               this.showErrDesc = false;
               $('.search-Btn').removeAttr("disabled")
              this.policies = res.Result.Policies;
            }
          },
          (err) => {
            this.loading = false;
            console.log("Error occured");
          }
      );
    }

    //custom No
    if (this.customNoOnly == true) {
      if (this.formdata.invalid || this.CaptchaForm.invalid) {
        $('.search-Btn').removeAttr("disabled")
        this.loading = false;
        this.cpatchaMandatory = true;
        return false;
      } 
      else {
        $('.search-Btn').attr("disabled","disabled")
        this.cpatchaMandatory = false;
        this.loading = true;
      }

      const req = this.http.post(environment.profile + "SearchPolicy", {
        NIN: data.nationalId,
        sequenceNumber: "",
        customCardNumber: data.customNo,
        lang: this.langToBEAPIs,
        channel : "portal",
        Captcha: this.captch
    })
    .subscribe(
        (res: any) => {
          if (res.ErrorCode != 1) {
            this.loading = false;
             this.showErrDesc = true;
             this.servererror = res.ErrorDescription; 
             $('.search-Btn').removeAttr("disabled")
          }
           else {
            this.loading = false;
            this.showErrDesc = false;
            $('.search-Btn').removeAttr("disabled")
           
            this.policies = res.Result.Policies;
          }
        },
        (err) => {
          this.loading = false;
          console.log("Error occured");
        }
    );

    }
  }
}
