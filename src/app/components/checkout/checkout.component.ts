import { HttpClient, HttpHeaders } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { ShareDataService } from 'src/app/services/share-data.service';
import { environment } from 'src/environments/environment.prod';
import { isNullOrUndefined } from 'util';
import { ConfirmationDialogBuynowService } from '../confirmation-dialog-buynow/confirmation-dialog-buynow.service';
import { HostListener } from '@angular/core';
import {Location} from '@angular/common';



@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  prodDetail;
  selectedProduct: any;
  langToBEAPIs: any;
  quotationRequestExternalId: any;
  referenceId: any;
  productId: any;
  SelectedProductBenfitId = [];
  mycurrentLangu: any;
  myLanguageCus: any;
  loadingNext = false;
  loadingPrevious = false;
  ProductModel: any = [];
  PriceModel: any = [];
  BenefitModel: any = [];
  VehicleModel: any = [];
  CarPlateInfo: any = [];
  CompanyModel: any = [];
  DriverDataModel: any = [];
  lookup: any = [];
  PaymentMethodCode: any;
  paymentMethods: any;
  formdata: FormGroup;
  submitted = false;
  fixedMainDriverData: any;
  lowestProduct: any;
  insuranceTypeCode: any
  message: any;
  listBankCodes: any;
  listDriver: any;
  listVehicle: any;
  listCompany: any;
  Email: any;
  IBAN: any;
  Phone: any;
  FirstAddDriverNameAr: any;
  FirstAddDriverNameEn: any;
  Hashed: any;
  ImageBack: any;
  ImageFront: any;
  ImageLeft: any;
  ImageRight: any;
  ImageBody: any;
  InsuranceCompanyId: any;
  InsuranceCompanyKey: any;
  IsCheckoutEmailVerified: any;
  IsCompany: any;
  IsReceivePolicyByEmailChecked: any;
  IsSanadPlus: any;
  LowestComperehensiveQoutPrice: any;
  PaymentAmountVal: any;
  PolicyEffectiveDate: any;
  PolicyEndDate: any;
  ProductId: any;
  ProductInsuranceTypeCode: any;
  QtRqstExtrnlId: any;
  QuotationResponseId: any;
  ReferenceId: any;
  SequenceNumber: any;
  TypeOfInsurance: any;
  UserId: any;
  VehicleIdType: any;
  insuredNationalID: any;
  insuredNameAr: any;
  insuredNameEn: any;
  PriceDetails: any
  specialDiscount: any;
  subTotal: any = 0;
  tax: any;
  productPriceTypeCode: any;
  taxNameAr: any;
  taxNameEn: any;
  CarPlate: any;
  insuredIBAN: any;
  paymentMethodsDescription: any
  bankName: any;
  SelectedProduct: any;
  showSumitCheckoutError = false;
  sumitCheckoutServererror = "";
  SecondAddDriverNameAr: any;
  SecondAddDriverNameEn: any;
  StcPayPhoneNo: any;
  ImageRequired: any;
  HyperpayRequestId: any;
  PurchaseByMobile: any;
  ErrorValidatingUserData: any;
  ibanWithoutSA: any;
  firstCharIban: any;
  vehicleIMG: any;
  vehicleDesc: any;
  vehicleModelYear: any;
  vehicleModel: any;
  carPlateEN: any;
  carPlateAR: any;
  CarPlateTextAr: any;
  CarPlateTextEn: any;
  vehicleNCDFree: any;
  typeVehicleId: any;
  showEmailIfNotEditable = true;
  showPhoneIfNotEditable = true;
  vehicleDetails: any;
  mobilePattern = /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;
  imageFrontToUpload: any;
  imageFrontUrl: any;
  imageRightToUpload: any;
  imageRightUrl: any;
  imageLeftToUpload: any;
  imageLeftUrl: any;
  imageBackToUpload: any;
  imageBackUrl: any;
  imageChasisToUpload: any;
  imageChasisUrl: any;
  Benefits: any;
  exampleCheckLbl1: any;
  exampleCheckLbl2: any;
  requestBody: any;
  openPpUp: any;
  dataFromQuotPage: any;
  parsedDatafromQuotStorage: any;
  vehicleDetailsFromQuotPage: any;
  showLoading = true;
  openMobilePpUp: any;
  showVerifyMobileNoError = false;
  mobileServererror = "";
  CompanyLogo:any;
  loadingVerfiy = false;
  loadingResend = false;
  screenTitleEn : string ="Checkout Page";
  screenTitleAr : string = "تفاصيل الوثيقة والدفع";
  AdditionalDriverAr:any;
  AdditionalDriverEn:any;


  constructor(private router: Router,
    public fb: FormBuilder, private http: HttpClient, private data: ShareDataService,
    private cdRef: ChangeDetectorRef
    , private ConfirmationDialogBuynowService: ConfirmationDialogBuynowService,
    private _location: Location) { }


    @HostListener('window:popstate', ['$event'])
    onPopState(event) {
      
      console.log('Back button pressed');
     let loggedIn = window.localStorage.getItem("authenticatedUSer");
     if(loggedIn !=null){
      this.router.navigate(['/quotations/' + this.QtRqstExtrnlId]);
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

  ngOnInit() {
    this.dataFromQuotPage = localStorage.getItem("checkOutDetailsData");
    console.log(JSON.parse(this.dataFromQuotPage));
    this.parsedDatafromQuotStorage = JSON.parse(this.dataFromQuotPage);

    this.vehicleDetailsFromQuotPage = JSON.parse(localStorage.getItem("VehicleDetailsFrmQuotPage"));
    console.log(this.vehicleDetailsFromQuotPage);

    $('#cehckoutEmail').attr("disabled", "disabled")
    $('#phone').attr("disabled", "disabled")
    this.showEmailIfNotEditable = true;
    this.showPhoneIfNotEditable = true;
    this.vehicleDetails = this.data.getVehicleDetails()
    this.vehicleIMG = this.vehicleDetailsFromQuotPage.Vehicle.FormatedMakerCode;
    this.vehicleDesc = this.vehicleDetailsFromQuotPage.Vehicle.Maker;
    this.vehicleModelYear = this.vehicleDetailsFromQuotPage.Vehicle.ModelYear;
    this.vehicleModel = this.vehicleDetailsFromQuotPage.Vehicle.Model;
    this.carPlateEN = this.vehicleDetailsFromQuotPage.Vehicle.CarPlate.CarPlateNumberEn;
    this.carPlateAR = this.vehicleDetailsFromQuotPage.Vehicle.CarPlate.CarPlateNumberAr;
    this.CarPlateTextAr = this.vehicleDetailsFromQuotPage.Vehicle.CarPlate.CarPlateTextAr;
    this.CarPlateTextEn = this.vehicleDetailsFromQuotPage.Vehicle.CarPlate.CarPlateTextEn;
    this.vehicleNCDFree = this.vehicleDetailsFromQuotPage.NCDFreeYears;
    this.data.checkoutDetailsPrefilled.subscribe(message => this.message = message);
    if (this.parsedDatafromQuotStorage != undefined) {
      this.showLoading = false;
      this.listBankCodes = this.parsedDatafromQuotStorage.checkoutModel.BankCodes;
      this.listDriver = this.parsedDatafromQuotStorage.checkoutModel.Driver;
      this.insuredNationalID = this.listDriver.NIN;
      this.insuredNameAr = this.listDriver.FullArabicName;
      this.insuredNameEn = this.listDriver.FullEnglishName;
      this.listVehicle = this.parsedDatafromQuotStorage.checkoutModel.Vehicle;
      this.CarPlate = this.listVehicle.CarPlate;

      this.listCompany = this.parsedDatafromQuotStorage.checkoutModel.Company;
      this.SelectedProduct = this.parsedDatafromQuotStorage.checkoutModel.SelectedProduct;
      this.PriceDetails = this.SelectedProduct.PriceDetails;
      this.Benefits = this.SelectedProduct.Benefits;
      this.Email = this.parsedDatafromQuotStorage.checkoutModel.Email;
      this.IBAN = this.parsedDatafromQuotStorage.checkoutModel.IBAN;
      this.AdditionalDriverAr = this.parsedDatafromQuotStorage.checkoutModel.FirstAdditionalDriverFirstNameAr;
      this.AdditionalDriverEn = this.parsedDatafromQuotStorage.checkoutModel.FirstAdditionalDriverFirstNameEn;
      let n = 2;
      this.ibanWithoutSA = this.IBAN.substring(n);
      this.firstCharIban = this.ibanWithoutSA.substring(2, 4)
      for (var i = 0; i < this.listBankCodes.length; i++) {
        if (this.firstCharIban == this.listBankCodes[i].Id) {
          this.bankName = this.listBankCodes[i].Name;
        }
      }
      this.Phone = this.parsedDatafromQuotStorage.checkoutModel.Phone;
      this.FirstAddDriverNameAr = this.parsedDatafromQuotStorage.checkoutModel.FirstAdditionalDriverFirstNameAr;
      this.FirstAddDriverNameEn = this.parsedDatafromQuotStorage.checkoutModel.FirstAdditionalDriverFirstNameEn;
      this.SecondAddDriverNameAr = this.parsedDatafromQuotStorage.checkoutModel.SecondAdditionalDriverFirstNameAr;
      this.SecondAddDriverNameEn = this.parsedDatafromQuotStorage.checkoutModel.SecondAdditionalDriverFirstNameEn;
      this.Hashed = this.parsedDatafromQuotStorage.checkoutModel.Hashed;
      this.ImageBack = this.parsedDatafromQuotStorage.checkoutModel.ImageBack;
      this.ImageFront = this.parsedDatafromQuotStorage.checkoutModel.ImageFront;
      this.ImageLeft = this.parsedDatafromQuotStorage.checkoutModel.ImageLeft;
      this.ImageRight = this.parsedDatafromQuotStorage.checkoutModel.ImageRight;
      this.ImageBody = this.parsedDatafromQuotStorage.checkoutModel.ImageBody;
      this.InsuranceCompanyId = this.parsedDatafromQuotStorage.checkoutModel.InsuranceCompanyId;
      this.InsuranceCompanyKey = this.parsedDatafromQuotStorage.checkoutModel.InsuranceCompanyKey;
      this.IsCheckoutEmailVerified = this.parsedDatafromQuotStorage.checkoutModel.IsCheckoutEmailVerified;
      this.IsCompany = this.parsedDatafromQuotStorage.checkoutModel.IsCompany;
      this.IsReceivePolicyByEmailChecked = this.parsedDatafromQuotStorage.checkoutModel.IsReceivePolicyByEmailChecked;
      this.IsSanadPlus = this.parsedDatafromQuotStorage.checkoutModel.IsSanadPlus;
      this.LowestComperehensiveQoutPrice = this.parsedDatafromQuotStorage.checkoutModel.LowestComperehensiveQoutPrice;
      this.PaymentAmountVal = this.parsedDatafromQuotStorage.checkoutModel.PaymentAmount;
      this.PolicyEffectiveDate = this.parsedDatafromQuotStorage.checkoutModel.PolicyEffectiveDate;
      this.PolicyEndDate = this.parsedDatafromQuotStorage.checkoutModel.PolicyEndDate;
      this.ProductId = this.parsedDatafromQuotStorage.checkoutModel.ProductId;
      this.ProductInsuranceTypeCode = this.parsedDatafromQuotStorage.checkoutModel.ProductInsuranceTypeCode;
      this.QtRqstExtrnlId = this.parsedDatafromQuotStorage.checkoutModel.QtRqstExtrnlId;
      this.QuotationResponseId = this.parsedDatafromQuotStorage.checkoutModel.QuotationResponseId;
      this.ReferenceId = this.parsedDatafromQuotStorage.checkoutModel.ReferenceId;
      this.SequenceNumber = this.parsedDatafromQuotStorage.checkoutModel.SequenceNumber;
      this.TypeOfInsurance = this.parsedDatafromQuotStorage.checkoutModel.TypeOfInsurance;
      this.UserId = this.parsedDatafromQuotStorage.checkoutModel.UserId;
      this.VehicleIdType = this.parsedDatafromQuotStorage.checkoutModel.VehicleIdType;
      this.SelectedProductBenfitId = this.parsedDatafromQuotStorage.checkoutModel.SelectedProductBenfitId;
      this.StcPayPhoneNo = this.parsedDatafromQuotStorage.checkoutModel.StcPayPhoneNo;
      this.ImageRequired = this.parsedDatafromQuotStorage.checkoutModel.ImageRequired;
      this.HyperpayRequestId = this.parsedDatafromQuotStorage.checkoutModel.HyperpayRequestId;
      this.PurchaseByMobile = this.parsedDatafromQuotStorage.checkoutModel.PurchaseByMobile;
      this.ErrorValidatingUserData = this.parsedDatafromQuotStorage.checkoutModel.ErrorValidatingUserData;

      for (var i = 0; i < this.PriceDetails.length; i++) {
        this.productPriceTypeCode = this.PriceDetails[i].PriceTypeCode;
        if (this.productPriceTypeCode == 8) {
          this.tax = this.PriceDetails[i].PriceValue;
          this.taxNameAr = this.PriceDetails[i].PriceNameAr;
          this.taxNameEn = this.PriceDetails[i].PriceNameEn;
          this.subTotal = this.subTotal + this.PriceDetails[i].PriceValue;
          this.subTotal = this.subTotal - this.tax;

          if (this.productPriceTypeCode == 1) {
            this.specialDiscount = this.PriceDetails[i].PriceValue;
            this.subTotal = this.subTotal - this.specialDiscount;
          }
        }
        else {
          this.subTotal = this.subTotal + this.PriceDetails[i].PriceValue;
          if (this.productPriceTypeCode == 1) {
            this.specialDiscount = this.PriceDetails[i].PriceValue;
            this.subTotal = this.subTotal - this.specialDiscount;
          }
        }
      }
    }

    this.formdata = this.fb.group({
      // this.minValuePhone.bind(this)
      email: new FormControl(this.Email, [Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]),
      phone: new FormControl(this.Phone, [Validators.required, Validators.pattern(this.mobilePattern)]),
      IBAN: new FormControl(this.ibanWithoutSA, [Validators.required, this.minIbanlength.bind(this)]),
      bankName: new FormControl(this.bankName),
    })

    if (this.ProductInsuranceTypeCode == 1) {
      this.getLowestProduct()
    }

    this.getPaymentMethods();
  }



 
    @HostListener('window:popstate', ['$event'])
    prevQuotation(event) {
      
      console.log('Back button pressed');
     let loggedIn = window.localStorage.getItem("authenticatedUSer");
     if(loggedIn !=null){
      this.router.navigate(['/quotations/' + this.QtRqstExtrnlId]);
     }
    }
  

  exampleCheck1(e) {
    console.log(e.target.checked);
    this.exampleCheckLbl1 = e.target.checked;
    if (this.exampleCheckLbl1 == true && this.exampleCheckLbl2 == true) {
      $("#PaySubmit").removeAttr("disabled");
    } else {
      $("#PaySubmit").attr("disabled", "disabled");
    }
  }

  exampleCheck2(e) {
    console.log(e.target.checked);
    this.exampleCheckLbl2 = e.target.checked;
    if (this.exampleCheckLbl1 == true && this.exampleCheckLbl2 == true) {
      $("#PaySubmit").removeAttr("disabled");
    } else {
      $("#PaySubmit").attr("disabled", "disabled");
    }
  }


  handleImageFront(file: FileList) {
    this.imageFrontToUpload = file.item(0);
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageFrontUrl = event.target.result;
    }
    reader.readAsDataURL(this.imageFrontToUpload);
  }

  handleIImageRight(file: FileList) {
    this.imageRightToUpload = file.item(0);
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageRightUrl = event.target.result;
    }
    reader.readAsDataURL(this.imageRightToUpload);
  }

  handleIImageLeft(file: FileList) {
    this.imageLeftToUpload = file.item(0);
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageLeftUrl = event.target.result;
    }
    reader.readAsDataURL(this.imageLeftToUpload);
  }

  handleIImageBack(file: FileList) {
    this.imageBackToUpload = file.item(0);
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageBackUrl = event.target.result;
    }
    reader.readAsDataURL(this.imageBackToUpload);
  }

  handleIImageChasis(file: FileList) {
    this.imageChasisToUpload = file.item(0);
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageChasisUrl = event.target.result;
    }
    reader.readAsDataURL(this.imageChasisToUpload);
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

  getLowestProduct() {
    this.http.get(environment.quotation + "/quotation/lowest-product?" + 'QtRqstExtrnlId=' + this.QtRqstExtrnlId,
      {}).subscribe(
        (res: any) => {
          this.lowestProduct = res.data.productPrice;
          this.insuranceTypeCode = res.data.insuranceTypeCode;
        },
        err => {
          console.log("Error occured");
        })
  }

  getPaymentMethods() {
    this.http.get(environment.portalUrl + "CheckoutAPI/api/Checkout/paymentmethods?Channel=portal", {
    }).subscribe(
      (res: any) => {
        console.log(res);
        if (res.errors != null) {
        }
        else {
          this.paymentMethods = res.data;
        }
      },
      err => {
        console.log("Error occured");
        this.loadingNext = false;
      })
  }

  selectPaymentMethod(id) {
    this.PaymentMethodCode = id;
    $('.paymethod-img').removeClass('selected');
    $('#paymentImg' + this.PaymentMethodCode).addClass('selected');
  }

  public confirmationPaymentMethod() {
    if (this.myLanguageCus == 'Arabic') {
      this.ConfirmationDialogBuynowService.confirm('', 'برجاء إختيار وسيلة الدفع')
        .then((confirmed) => { })
        .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));

    }
    else {
      this.ConfirmationDialogBuynowService.confirm('', 'Please  Choose Payment Method')
        .then((confirmed) => { })
        .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    }
  }

  public confirmationUploadImages() {
    if (this.myLanguageCus == 'Arabic') {
      this.ConfirmationDialogBuynowService.confirm('', 'برجاء إدخال جميع صور المركبة.')
        .then((confirmed) => { })
        .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));

    }
    else {
      this.ConfirmationDialogBuynowService.confirm('', 'Please insert all vehicle images.')
        .then((confirmed) => { })
        .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    }
  }

  backPrev() {
    window.history.back();
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
  minIbanlength(control: FormControl): { [s: string]: boolean } {
    if (control.value != null && control.value != "") {
      if (!isNullOrUndefined(control.value)) {
        if (control.value.length < 22) {
          return { 'IbanNumberLength': true }
        }
        else {
          return null;
        }
      }
    }
  }

  emailInputEditable() {
    $('#cehckoutEmail').removeAttr("disabled")
    this.showEmailIfNotEditable = false;
  }
  emailChange() {
    this.Email = this.formdata.controls['email'].value;
  }

  phoneInputEditable() {
    $('#phone').removeAttr("disabled")
    this.showPhoneIfNotEditable = false;
  }

  phoneChange() {
    this.Phone = this.formdata.controls['phone'].value;
  }

  ibanChange() {
    this.IBAN = "sa" + this.formdata.controls['IBAN'].value;
    this.ibanWithoutSA = this.formdata.controls['IBAN'].value;
    this.firstCharIban = this.ibanWithoutSA.substring(2, 4)
    for (var i = 0; i < this.listBankCodes.length; i++) {
      if (this.firstCharIban == this.listBankCodes[i].Id) {
        this.bankName = this.listBankCodes[i].Name;
        this.formdata.controls['bankName'].setValue(this.bankName)
      }
    }
  }

  openServerError() {
    this.openPpUp = true;
  }

  closePopup() {
    this.openPpUp = false;
  }


  openVerifyPhonNoPopup() {
    this.openMobilePpUp = true;
  }


  smsCode;
  verifyMobileNo(smsCode) {
    this.loadingVerfiy = true;
    const req = this.http.post(environment.checkout + "VerifyCode?phoneNumber=" + this.Phone + "&"
      + "code=" + smsCode, {})
      .subscribe(
        (res: any) => {
          if (res.data.ErrorCode != 1) {
            this.loadingVerfiy = false;
            this.showVerifyMobileNoError = true;
            this.mobileServererror = res.data.ErrorDescription;
          }
          else {
            this.loadingVerfiy = true;
            this.showVerifyMobileNoError = false;
            if (this.PaymentMethodCode == "4" || this.PaymentMethodCode == "10" || this.PaymentMethodCode == "13") {
              const req = this.http.post(environment.checkout + "PaymentUsingHyperpay?" 
              + 'referenceId=' + this.ReferenceId
              + "&" + 'QtRqstExtrnlId=' + this.QtRqstExtrnlId 
              + "&" + 'productId=' + this.ProductId
              + "&" + 'selectedProductBenfitId=' + this.SelectedProductBenfitId 
              + "&" + 'hashed=' + this.Hashed
              + "&" + 'paymentMethodCode=' + this.PaymentMethodCode
              + "&" + 'channel=' + 'portal'
              + "&" + 'lang=' + this.langToBEAPIs, {})
                .subscribe(
                  (res: any) => {
                    if (res.data.ErrorCode != 1) {
                      this.router.navigate(['payment-error']);
                    }
                    else {
                      this.router.navigate(['payment-hyper-pay'],
                      {
                        queryParams: {
                          id: res.data.hyperpaycheckoutid,
                          Lang: this.langToBEAPIs,
                          channel: "portal",
                        }
                      });
                    }
                  },
                  err => {
                    console.log("Error occured");
                  }
                )
            }
           
            else if (this.PaymentMethodCode == "12") {
              this.router.navigate(['payment-sadad'],
                {
                  queryParams: {
                    id: res.hyperpayResponseId,
                    Lang: this.langToBEAPIs,
                    channel: "portal",
                  }
                });
            }
          }
        },
        err => {
          this.loadingVerfiy = false;
          console.log("Error occured");
        }
      )
  }

  resendCode() {
    this.loadingResend = true;
    this.showVerifyMobileNoError = false;
    const req = this.http.post(environment.checkout + "ResendVerifyCode?userId=" + this.UserId + "&"
      + "phoneNumber=" + this.Phone + "&lang=" + this.langToBEAPIs, {})
      .subscribe(
        (res: any) => {
          if (res.data.ErrorCode != 1) {
            this.loadingResend = false;
          }
          else {
            this.loadingResend = true;
          }
        },
        err => {
          this.loadingResend = false;
          console.log("Error occured");
        }
      )
  }


  payNow(data) {
    this.submitted = true;
    this.loadingPrevious = false;
    if (this.PaymentMethodCode == undefined) {
      this.confirmationPaymentMethod();
      this.loadingNext = false;
    }
    else {
      if (this.ProductInsuranceTypeCode == 2) {
        if (this.imageFrontUrl == undefined || this.imageRightUrl == undefined
          || this.imageLeftUrl == undefined || this.imageBackUrl == undefined || this.imageChasisUrl == undefined) {
          this.confirmationUploadImages();
          this.loadingNext = false;
        }
        else {
          this.loadingNext = true;
        }
      }
      this.loadingNext = true;
      this.listVehicle.Id = this.UserId;
      this.listDriver.DriverId = this.UserId;

      let dataModel = {
        Email: this.Email,
        Phone: this.Phone,
        ReferenceId: this.ReferenceId,
        BankCode: Number(this.firstCharIban),
        IBAN: this.IBAN,
        ImageRight: this.ImageRight,
        ImageLeft: this.ImageLeft,
        ImageFront: this.ImageFront,
        ImageBack: this.ImageBack,
        ImageBody: this.ImageBody,
        UserId: this.UserId,
        QtRqstExtrnlId: this.QtRqstExtrnlId,
        ProductId: this.ProductId,
        SelectedProductBenfitId: this.SelectedProductBenfitId,
        Hashed: this.Hashed,
        PaymentMethodCode: this.PaymentMethodCode
      };

      let bodyReq = new FormData();
      bodyReq.append("data", JSON.stringify(dataModel));
      bodyReq.append("lang", "ar");
      bodyReq.append("channel", "portal");

      this.http.post(environment.checkout + "SubmitCheckoutDetails", bodyReq)
        .subscribe(
          (res: any) => {
            if (res.data.ErrorCode != 1 && res.data.ErrorCode != 25) {
              this.loadingNext = false;
              this.showSumitCheckoutError = true;
              this.openServerError()
              this.sumitCheckoutServererror = res.data.ErrorDescription;
              this.ConfirmationDialogBuynowService.confirm('', res.errors[0].description)
                .then((confirmed) => { })
                .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
            }
            if (res.data.ErrorCode == 25 && res.data.ErrorCode != 1) {
              this.showSumitCheckoutError = true;
              this.sumitCheckoutServererror = res.data.ErrorDescription;
              this.openVerifyPhonNoPopup()
            }
            else {
              // if(this.SelectedProductBenfitId == null){
              //   this.SelectedProductBenfitId ="";
              // }
              this.showSumitCheckoutError = false;
              if (this.PaymentMethodCode == "4" || this.PaymentMethodCode == "10" || this.PaymentMethodCode == "13") {
                const req = this.http.post(environment.checkout + "PaymentUsingHyperpay?" 
                + 'referenceId=' + this.ReferenceId
                + "&" + 'QtRqstExtrnlId=' + this.QtRqstExtrnlId 
                + "&" + 'productId=' + this.ProductId
                + "&" + 'selectedProductBenfitId='+this.SelectedProductBenfitId 
                + "&" + 'hashed=' + this.Hashed
                + "&" + 'paymentMethodCode=' + this.PaymentMethodCode
                + "&" + 'channel=' + 'portal'
                + "&" + 'lang=' + this.langToBEAPIs, {})
                  .subscribe(
                    (res: any) => {
                      if (res.data.ErrorCode != 1) {
                        this.router.navigate(['payment-error']);
                      }
                      else {
                        this.router.navigate(['payment-hyper-pay'],
                        {
                          queryParams: {
                            id: res.data.hyperpaycheckoutid,
                            Lang: this.langToBEAPIs,
                            channel: "portal",
                          }
                        });
                      }
                    },
                    err => {
                      console.log("Error occured");
                    }
                  )
              }
           
              else if (this.PaymentMethodCode == "12") {
                this.data.changeResponse(res.data.edaatPaymentResponseModel)
                this.router.navigate(['payment-sadad'],
                  {
                    queryParams: {
                      id: res.data.edaatPaymentResponseModel,
                      Lang: this.langToBEAPIs,
                      channel: "portal",
                    }
                  });
              }
            }
          },
          err => {
            this.loadingNext = false;

          })
    }
  }
}
