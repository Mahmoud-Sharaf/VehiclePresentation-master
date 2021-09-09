import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  formdata: FormGroup;
  CaptchaForm: FormGroup;
  notValidHere: any[] = [];
  @Input() submitted;
  errors: [];
  serverError:"";
  loading = false;
  cpatchaMandatory= false;
  showDescription = false;
  mobilePattern = /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;

  constructor(public fb: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.formdata = this.fb.group({
      fullName: new FormControl(""),
      email: new FormControl("",[Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]),
      phone: new FormControl("", Validators.pattern(this.mobilePattern)),
      address: new FormControl(""),
      message: new FormControl("", Validators.required),
    });
    this.CaptchaForm = this.fb.group({
      captcha: [null],
    });


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


  onClickSubmit(data) {
    this.loading = true;
    this.submitted = true;
    $("#send-btn").attr("disabled", "disabled"); 
    if (this.formdata.controls['email'].invalid || this.formdata.controls['message'].invalid
    || this.formdata.controls['phone'].invalid || this.CaptchaForm.invalid) {
      $("#send-btn").removeAttr("disabled");
      if (this.CaptchaForm.valid) {
        $("#send-btn").attr("disabled", "disabled"); 
        this.cpatchaMandatory = false;
        this.loading = false;
        return false;
      } 
      else {
        $("#send-btn").removeAttr("disabled");
        this.loading = false;
        this.cpatchaMandatory = true;
        return false;
      }
    }
    else
    {
      this.cpatchaMandatory = false;
      this.loading = true;
      $("#send-btn").attr("disabled", "disabled"); 
      let NIN = localStorage.getItem("nationalID");
     this.http.post(environment.staticPages + "contact-us/post", {
      nin: NIN,
      email: data.email,
      message: data.message
    }).subscribe(
      (res: any) => {
        this.serverError = res.data.ErrorDescription;
        if(res.data.ErrorCode != 1)
        {
          this.showDescription = true;
          $('.serverError').css("color","red")
          $("#send-btn").removeAttr("disabled");
          this.loading = false;
        }
        else{
          this.showDescription = true;
          this.loading = false;
          $('.serverError').css("color","green")
          $("#send-btn").removeAttr("disabled");
          this.formdata.controls["fullName"].setValue(null);
          this.formdata.controls["email"].setValue(null);
          this.formdata.controls["phone"].setValue(null);
          this.formdata.controls["address"].setValue(null);
          this.formdata.controls["message"].setValue(null);
          this.CaptchaForm.controls["captcha"].setValue(null);
          this.formdata.controls["email"].setValidators(null);
          this.formdata.get("email").clearValidators();
          this.formdata.get("email").updateValueAndValidity();
          this.formdata.controls["phone"].setValidators(null);
          this.formdata.get("phone").clearValidators(); 
          this.formdata.get("phone").updateValueAndValidity();
          this.formdata.controls["message"].setValidators(null);
          this.formdata.get("message").clearValidators();          
          this.formdata.get("message").updateValueAndValidity();
          this.CaptchaForm.controls["captcha"].setValidators(null);
          this.formdata.get("captcha").clearValidators();
          this.CaptchaForm.get("captcha").updateValueAndValidity();
        }
        
      },
      err => {
        console.log("Error occured");
      })
    }
  }
}
