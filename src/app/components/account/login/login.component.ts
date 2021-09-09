import { DOCUMENT } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShareDataService } from 'src/app/services/share-data.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formdata: FormGroup;
  notValidHere: any[] = [];
  myReferenceId: any;
  myQtRqstExtrnlId: any;
  myproductId: any;
  mychannel: any;
  mycurrentLangu: any;
  myLanguageCus: any;
  lang: any;
  langToBEAPIs: any;
  email:any;
  accessToken:any;
  language:any;
  hashed:any;
  @Input() submitted;
  checkoutParameters:any;
  selectedProductBenfitId:any;
  showLoginError = false;
  loginServererror = "";
  showAddtoCardError  = false;
  showCheckoutDetailsError  = false;
  checkoutDetailsServererror = "";
  addtoCardServererror = "";
  checkoutDetails:any;
  loading = false;
  loadingSendLink = false;
  VehicleDetailsFrmQuotPageX:any;
  @Input() openPpUpInMobile: any;
  @Input() openPpUpInweb: any;
  forgetPassOpenPopup = false;
  showForgetPassErr = false;
  serverForgetPassError ="";
  resetEmail :any;
  constructor(public fb: FormBuilder, private http: HttpClient, private router: Router,
    private cdRef: ChangeDetectorRef, private checkoutData :ShareDataService,
    @Inject(DOCUMENT) private _document: Document) {

      // let loggedIn = window.localStorage.getItem("authenticatedUSer");
      // if(loggedIn !=null){
      //  this.router.navigate(['/']);
      // }

     }

  ngOnInit() {
    this.formdata = this.fb.group({
       email: new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]),
      password: new FormControl("", Validators.required),
      rememberMe:new FormControl("")
    });

    let VehicleDetailsFrmQuotPage = localStorage.getItem('VehicleDetailsFrmQuotPage');
    if(VehicleDetailsFrmQuotPage){
      // alert(VehicleDetailsFrmQuotPage);
      this.VehicleDetailsFrmQuotPageX = VehicleDetailsFrmQuotPage;
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

  openForgetPasswordPopup()
  {
    this.forgetPassOpenPopup = true;
  }
  closePopup()
  {
    this.forgetPassOpenPopup = false;
  }

  resetPassword(email)
  {
    this.loadingSendLink = true;
    
    this.http.post(environment.identity+"ForgetPassword",
    {
      Email: email 
    }).subscribe(
      (res: any) => {          
        if (res.ErrorCode != 1) {
          this.showForgetPassErr = true;
          this.serverForgetPassError = res.ErrorDescription;
          this.loadingSendLink = false;
        }
        else {
          this.loadingSendLink = false;
          this.showForgetPassErr = false;
          let result = res.Result;
          this.forgetPassOpenPopup = false;
        } 
      },
      err => {
        console.log("Error occured");
      })
    
  }

  get fireValidation() { return this.formdata.controls; }

  onClickSubmit(data) {
    
    this.submitted = true;
    this.loading = true;
    this.notValidHere = new Array();
    if (!this.formdata.valid) {
      $(".loginBtn").removeAttr("disabled");
      this.loading = false;
      return false;
    }
    else{
      this.email = data.email;
      this.loading = true;
      $(".loginBtn").attr("disabled", "disabled");
      const req = this.http.post(environment.identity + "loginUser", {
        email: data.email,
        password: data.password,
        language: this.langToBEAPIs,
        channel: "portal",
      })
        .subscribe(
          (res: any) => {
            if (res.ErrorCode != 1) {
              this.showLoginError = true;
              this.showCheckoutDetailsError = false;
              this.showAddtoCardError = false;
              this.loginServererror = res.ErrorDescription;
              $(".loginBtn").removeAttr("disabled");
              this.loading = false;
            } 
            else {
              this.loading = true;
              $(".loginBtn").attr("disabled","disabled");
              this.showLoginError = false;
          //    localStorage.clear();
              let myStorage = window.localStorage;
              myStorage.setItem("currentLanguage", this.myLanguageCus);
              myStorage.setItem("authenticatedUSer", data.email);
              localStorage.setItem("UserId",res.Result.UserId);
              this.checkoutData.getCheckoutParameters()
              this.checkoutParameters = this.checkoutData.getCheckoutParameters();
            //  console.log( this.checkoutParameters)
              this.language =  this.checkoutParameters.value[0];
              this.myReferenceId = this.checkoutParameters.value[1];
              this.myQtRqstExtrnlId = this.checkoutParameters.value[2];
              this.myproductId = this.checkoutParameters.value[3];
              this.selectedProductBenfitId = this.checkoutParameters.value[4];
              
              if (this.myReferenceId != undefined) 
              {
                if(this.openPpUpInMobile == true)
                {
                //  localStorage.setItem('VehicleDetailsFrmQuotPage',this.VehicleDetailsFrmQuotPageX);
                  this.loading = true;
                  $(".loginBtn").attr("disabled","disabled");
                  let UserId = localStorage.getItem("UserId"); 
                    this.http.post(environment.identity + "GetAccessToken", {
                      UserId:UserId
                    }).subscribe(
                      (res: any) => {
                        if(res.ErrorCode != 1)
                        {
                          this.loading = false;
                          $(".loginBtn").removeAttr("disabled");
                        }
                        else{
                     //     localStorage.setItem('VehicleDetailsFrmQuotPage',this.VehicleDetailsFrmQuotPageX);
                          $(".loginBtn").attr("disabled", "disabled");
                          this.loading = true;
                          this.accessToken = res.Result.access_token; 
                          localStorage.setItem("accessToken",this.accessToken);
                          this.http.post(environment.checkout + "AddToCart", {
                            QuotaionRequestExternalId : this.myQtRqstExtrnlId,
                            ReferenceId: this.myReferenceId,
                            ProductId: this.myproductId,
                            SelectedProductBenfitId : this.selectedProductBenfitId,
                            lang: this.language,
                            Channel : "portal"}).subscribe(
                            (AddToCardres: any) => {
                              if (AddToCardres.data.ErrorCode != 1&& AddToCardres.data.ErrorCode != 22 ) {
                                this.showAddtoCardError = true;
                                this.showCheckoutDetailsError = false;
                                this.showLoginError = false;
                                this.addtoCardServererror = AddToCardres.ErrorDescription;
                                $(".loginBtn").removeAttr("disabled");
                                this.loading = false;
                              }
                              else if(AddToCardres.data.ErrorCode == 22){
                                this.loading = false;
                                this.router.navigate(['/quotations/' + this.myQtRqstExtrnlId]);
                                $(".loginBtn").removeAttr("disabled");
                              }
                              else
                              {
                                $(".loginBtn").attr("disabled","disabled");
                                this.loading = true;
                                this.showAddtoCardError = false;
                                this.hashed = AddToCardres.data._hValue;
                                const req =  this.http.get(environment.checkout + "CheckoutDetails?" + 'ReferenceId=' + this.myReferenceId
                                + '&' + 'QtRqstExtrnlId=' + this.myQtRqstExtrnlId 
                                + '&' + 'lang=' + this.language
                                + '&' + 'Channel='  + "portal"
                                + '&' + 'ProductId=' + this.myproductId
                                + '&' + 'hashed=' + this.hashed
                                + '&' + 'selectedProductBenfitId=' + this.selectedProductBenfitId
                                ).subscribe(
                                    (res: any) => {
                                      if (res.data.ErrorCode != 1) {
                                        this.showCheckoutDetailsError = true;
                                        this.showAddtoCardError = false;
                                        this.showLoginError = false;
                                        this.checkoutDetailsServererror = res.data.ErrorDescription;
                                        this.loading = false;
                                        $(".loginBtn").removeAttr("disabled");
                                      } 
                                      else {
                                        $(".loginBtn").attr("disabled","disabled");
                                        this.loading = true;
                                        
                                        this.showCheckoutDetailsError = false;
                                        localStorage.setItem("checkOutDetailsData",JSON.stringify(res.data));
                                      //  localStorage.setItem('VehicleDetailsFrmQuotPage',this.VehicleDetailsFrmQuotPageX);
                                        this.checkoutData.checkoutDetails(res.data)
                                        this.openPpUpInMobile = false;
                                        this.router.navigate(['/checkout']);
                                      
                                      }
                                    },
                                    err => {
                                      this.loading = false;
                                      console.log("Error occured");    
                                      $(".loginBtn").removeAttr("disabled");                  
                                    }
                                  )
                              }
                            },
                            err => {  this.loading = false;
                              $(".loginBtn").removeAttr("disabled");
                              console.log("Error occured");})
                        }
                      },
                      err => {
                        $(".loginBtn").removeAttr("disabled");
                        this.loading = false;
                        console.log("Error occured");
                      })
                }

                else if(this.openPpUpInweb == true){
                  this.loading = true;
                  $(".loginBtn").attr("disabled","disabled");
                  let UserId = localStorage.getItem("UserId"); 
                    this.http.post(environment.identity + "GetAccessToken", {
                      UserId:UserId
                    }).subscribe(
                      (res: any) => {
                        if(res.ErrorCode != 1)
                        {
                          this.loading = false;
                          $(".loginBtn").removeAttr("disabled");
                        }
                        else{
                      
                          $(".loginBtn").attr("disabled", "disabled");
                          this.loading = true;
                          this.accessToken = res.Result.access_token; 
                          localStorage.setItem("accessToken",this.accessToken);
                          this.http.post(environment.checkout + "AddToCart", {
                            QuotaionRequestExternalId : this.myQtRqstExtrnlId,
                            ReferenceId: this.myReferenceId,
                            ProductId: this.myproductId,
                            SelectedProductBenfitId : this.selectedProductBenfitId,
                            lang: this.language,
                            Channel : "portal"}).subscribe(
                            (AddToCardres: any) => {
                              if (AddToCardres.data.ErrorCode != 1&& AddToCardres.data.ErrorCode != 22 ) {
                                this.showAddtoCardError = true;
                                this.showCheckoutDetailsError = false;
                                this.showLoginError = false;
                                this.addtoCardServererror = AddToCardres.ErrorDescription;
                                $(".loginBtn").removeAttr("disabled");
                                this.loading = false;
                              }
                              else if(AddToCardres.data.ErrorCode == 22){
                                this.loading = false;
                                this.router.navigate(['/quotations/' + this.myQtRqstExtrnlId]);
                                $(".loginBtn").removeAttr("disabled");
                              }
                              else
                              {
                                $(".loginBtn").attr("disabled","disabled");
                                this.loading = true;
                                this.showAddtoCardError = false;
                                this.hashed = AddToCardres.data._hValue;
                                const req =  this.http.get(environment.checkout + "CheckoutDetails?" + 'ReferenceId=' + this.myReferenceId
                                + '&' + 'QtRqstExtrnlId=' + this.myQtRqstExtrnlId 
                                + '&' + 'lang=' + this.language
                                + '&' + 'Channel='  + "portal"
                                + '&' + 'ProductId=' + this.myproductId
                                + '&' + 'hashed=' + this.hashed
                                + '&' + 'selectedProductBenfitId=' + this.selectedProductBenfitId
                                ).subscribe(
                                    (res: any) => {
                                      if (res.data.ErrorCode != 1) {
                                        this.showCheckoutDetailsError = true;
                                        this.showAddtoCardError = false;
                                        this.showLoginError = false;
                                        this.checkoutDetailsServererror = res.data.ErrorDescription;
                                        this.loading = false;
                                        $(".loginBtn").removeAttr("disabled");
                                      } 
                                      else {
                                        $(".loginBtn").attr("disabled","disabled");
                                        this.loading = true;
                                        this.showCheckoutDetailsError = false;
                                        localStorage.setItem("checkOutDetailsData",JSON.stringify(res.data));
                                       // localStorage.setItem('VehicleDetailsFrmQuotPage',this.VehicleDetailsFrmQuotPageX);
                                        this.checkoutData.checkoutDetails(res.data)
                                        this.router.navigate(['/checkout']);
                                      }
                                    },
                                    err => {
                                      this.loading = false;
                                      console.log("Error occured");    
                                      $(".loginBtn").removeAttr("disabled");                  
                                    }
                                  )
                              }
                            },
                            err => {  this.loading = false;
                              $(".loginBtn").removeAttr("disabled");
                              console.log("Error occured");})
                        }
                      },
                      err => {
                        $(".loginBtn").removeAttr("disabled");
                        this.loading = false;
                        console.log("Error occured");
                      })
                }
             
              }
              else{
                $(".loginBtn").attr("disabled","disabled");
                this.loading = true;
                if(this.openPpUpInMobile == true)
                {
                  this.openPpUpInMobile = false;
                  this.router.navigate(['/']);
                   this._document.defaultView.location.reload();
                }
               else if(this.openPpUpInweb == true){
                this.router.navigate(['/']);
                this._document.defaultView.location.reload();
               }
              }
            }
          },
          err => {
            $(".loginBtn").removeAttr("disabled");
            this.loading = false;
            console.log("Error occured");
          }
        )
    }
  };

}
