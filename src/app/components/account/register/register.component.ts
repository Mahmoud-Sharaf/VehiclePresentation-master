import { DOCUMENT } from '@angular/common';
import { HttpClient} from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formdata: FormGroup;
  notValidHere: any[] = [];
  mycurrentLangu: any;
  myLanguageCus: any;
  lang: any;
  langToBEAPIs: any;
  @Input() submitted;
  showRegisterError:any;
  registerServererror ="";
  loading = false;
  @Input() openPpUpInMobile: any;
  @Input() openPpUpInweb: any;
  mobilePattern = /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;

  constructor(public fb: FormBuilder, private http: HttpClient, private router: Router,
    private cdRef: ChangeDetectorRef,
    @Inject(DOCUMENT) private _document: Document) { }

  ngOnInit() {
    this.formdata = this.fb.group({
      email: new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]),
      password: new FormControl("", [Validators.required, this.minValuePassword.bind(this)]),
      mobile: new FormControl("", [Validators.required, Validators.pattern(this.mobilePattern)]),
    });
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

  minValuePassword(control: FormControl): { [s: string]: boolean } {
    if (control.value != null && control.value != "") {
      if (!isNullOrUndefined(control.value)) {
        if (control.value.length < 4) {
          return { 'PasswordNumberLength': true }
        }
        else {
          return null;
        }
      }
    }
  }

  minValuePhone(control: FormControl): { [s: string]: boolean } {
    if (control.value != null && control.value != "") {
      if (!isNullOrUndefined(control.value)) {
        if (control.value.length < 10) {
          return { 'PhoneNumberLength': true }
        }
        else {
          return null;
        }
      }
    }
  }

  validateAllFormFields(formGroup: FormGroup) {     
    Object.keys(formGroup.controls).forEach(field => { 
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        if (control.invalid) {
          this.notValidHere.push(control);
        }
        else {
          control.markAsPristine();
        }
        control.markAsTouched({ onlySelf: true });
      }
      else if (control instanceof FormGroup) {   
        this.validateAllFormFields(control);    
      }
    });
  }

  get fireValidation() { return this.formdata.controls; }

  onClickSubmit(data) {
    this.submitted  = true;
    this.loading = true;
    this.notValidHere = new Array();
    if (!this.formdata.valid) {
      this.loading = false;
      $(".registerBtn").removeAttr("disabled");
      return false;   
    }
    else{
      $(".registerBtn").attr("disabled", "disabled");
      const req = this.http.post(environment.identity + "register", {
        email: data.email,
        password: data.password,
        language: this.langToBEAPIs,
        channel: "portal",
        mobile: data.mobile
      })
        .subscribe(
          (res: any) => {
            if (res.ErrorCode != 1) {
              this.showRegisterError = true;
              this.loading = false;
              this.registerServererror = res.ErrorDescription;
              $(".registerBtn").removeAttr("disabled");
            } else {
              $(".registerBtn").attr("disabled", "disabled");
              this.loading = true;
              this.showRegisterError = false;
              localStorage.setItem("UserId",res.Result.UserId);
              localStorage.setItem("MobileNo",data.mobile);
              
              if(this.openPpUpInMobile == true)
              {
                this.openPpUpInMobile = false;
                this.router.navigate(['/']);
                this._document.defaultView.location.reload();
              } 
              else if(this.openPpUpInweb == true)
              {
                this.router.navigate(['/']);
                this._document.defaultView.location.reload();
              }
            }
          },
          err => {
            $(".registerBtn").removeAttr("disabled");
            this.loading = false;
            this.showRegisterError = false;
            console.log("Error occured");
  
          }
        )
    }
  };
}
