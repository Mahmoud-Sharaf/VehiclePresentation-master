import { DatePipe, DOCUMENT } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ShareDataService } from "src/app/services/share-data.service";
import { MatDatepicker } from "@angular/material/datepicker";
import { environment } from "src/environments/environment.prod";
import { isNullOrUndefined } from "util";

@Component({
  selector: "app-main-data-insured",
  templateUrl: "./main-data-insured.component.html",
  styleUrls: ["./main-data-insured.component.css"],
})
export class MainDataInsuredComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  formdata: FormGroup;
  CaptchaForm: FormGroup;
  notValidHere: any[] = [];
  meladiyearsManifacture: any[] = [];
  minmeladiYearsman: number = Math.round(this.currentYear * (33 / 32)) - 184;
  maxmeladiYearsman: number = this.currentYear  + 1;
  meladiyear: any;
  @Input() submitted;
  errors: [];
  cpatchaMandatory = false;
  loading = false;
  periodselected: any;
  sequenceOnly = true;
  customNoOnly = false;
  vehicleOwnerId = false;
  minDateStart: any;
  maxDateStart: any;
  PolicyEffictiveDate: any;
  showErrDesc = false;
  servererror = "";
  vehicleIdType: any;
  customNoVal: any;
  sequenceNoVal: any;
  ownerIdVal: any;
  nationalIdVal: any;
  mainDriverData: any;
  insurancePurposeType: any;
  showSequenceInputStye = false;
  showInOwnerTransfereOnly = false;
  showInNewInsurOnly = true;
  quotationRequestExternalId;
  is_edit = false;
  seqOrCustList: any;
  CopiedseqOrCustList;
  mycurrentLangu: any;
  myLanguageCus: any;
  lang: any;
  showLostSeqBool = false;
  newBindedArr: any[] = [];
  manufactureYearForCustom: any;
  get fireValidation() {
    return this.formdata.controls;
  }

  constructor(
    public fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    private data: ShareDataService,
    public datepipe: DatePipe,
    private cdRef: ChangeDetectorRef
  ) {
    var startDate = new Date();
    var endDate = new Date();
    startDate.setDate(startDate.getDate() + 1);
    this.minDateStart = startDate;
    endDate.setDate(endDate.getDate() + 14);
    this.maxDateStart = endDate;
  }

  ngAfterViewChecked() {
    this.data.currentCustomLanguage.subscribe((lang) => (this.lang = lang));
    let myStorage = window.localStorage;
    this.mycurrentLangu = myStorage.getItem("currentLanguage");
    this.myLanguageCus = this.mycurrentLangu;
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    //   $('html').on("click",function(e) {
    //     if(!$(e.target).hasClass('sequenceNumberAutoComplete'))
    //     {
    //       $(".sequenceNumberAutoComplete").hide();
    //     }
    //  });

    // const mediaQuery = window.matchMedia("(max-width: 992px)");
    // if (mediaQuery.matches) {
    //   $(".mobile").css("display", "block");
    //   $(".desktop").css("display", "none");
    // }

    $("body").on("click", function (event) {
      if (!$(event.target).is(".menu-btn")) {
        $("#nav-home").removeClass("activeX");
      }
    });
    this.data.getMainDriverData();
    this.mainDriverData = this.data.getMainDriverData();
    this.PolicyEffictiveDate = this.minDateStart;
    // this.manufactureYearForCustom = 1961;
    this.formdata = this.fb.group({
      vehicleType: new FormControl(),
      insurancePurpose: new FormControl(),
      customNo: new FormControl(""),
      nationalId: ["", [Validators.required, this.minValueMaxValue.bind(this)]],
      sequenceNo: new FormControl(""),
      policyEffectiveDate: [this.PolicyEffictiveDate, [Validators.required]],
      vehicleIdTypeId: ["1", [Validators.required]],
      ownerTransfer: new FormControl(""),
      ownerNationalId: new FormControl(""),
      insurancePurposeTypeId: ["3", [Validators.required]],
      inquiryTerms: ["", [Validators.required]],
      manufactureYear: new FormControl(""),
    });

    this.CaptchaForm = this.fb.group({
      captcha: [null, [Validators.required]],
    });
    if (
      this.formdata.controls["vehicleIdTypeId"].value == 1 &&
      this.formdata.controls["insurancePurposeTypeId"].value == 3
    ) {
      this.sequenceNumberClick();
    } else if (
      this.formdata.controls["vehicleIdTypeId"].value == 1 &&
      this.formdata.controls["insurancePurposeTypeId"].value == 4
    ) {
      this.transfereOwnerShipClick();
    } else {
      this.customNoClick();
    }

    if (
      this.mainDriverData.value.length != 0 ||
      this.mainDriverData.value != ""
    ) {
      this.vehicleIdType = this.mainDriverData.value[0];
      this.insurancePurposeType = this.mainDriverData.value[1];
      this.nationalIdVal = this.mainDriverData.value[2];
      this.PolicyEffictiveDate = this.mainDriverData.value[3];
      this.sequenceNoVal = this.mainDriverData.value[4];
      this.customNoVal = this.mainDriverData.value[5];
      this.ownerIdVal = this.mainDriverData.value[6];
      this.manufactureYearForCustom = this.mainDriverData.value[7];

      if (this.vehicleIdType == 1 && this.ownerIdVal == null) {
        this.sequenceNumberClick();
      }

      if (this.vehicleIdType == 1 && this.ownerIdVal != null) {
        this.transfereOwnerShipClick();
      }
      if (this.vehicleIdType == 2) {
        this.customNoClick();
      }
      this.formdata = this.fb.group({
        vehicleType: new FormControl(),
        insurancePurpose: new FormControl(),
        customNo: new FormControl(this.customNoVal),
        nationalId: [
          this.nationalIdVal,
          [Validators.required, this.minValueMaxValue.bind(this)],
        ],
        manufactureYear: new FormControl(this.manufactureYearForCustom),
        sequenceNo: new FormControl(this.sequenceNoVal),
        policyEffectiveDate: [this.PolicyEffictiveDate, [Validators.required]],
        vehicleIdTypeId: [this.vehicleIdType, [Validators.required]],
        ownerTransfer: new FormControl(""),
        ownerNationalId: new FormControl(this.ownerIdVal),
        insurancePurposeTypeId: [
          this.insurancePurposeType,
          [Validators.required],
        ],
        inquiryTerms: ["", [Validators.required]],
      });
    }

    this.quotationRequestExternalId = this.router.url.substr(
      this.router.url.lastIndexOf("/") + 1
    );
    if (this.quotationRequestExternalId) {
      this.http
        .get(
          environment.editInqReq + "?eid=" + this.quotationRequestExternalId,
          {}
        )
        .subscribe(
          (res: any) => {
            let responseModel = res.data;
            let nationalIdEdit = responseModel.insured.nationalId;
            let sequenceNoVal = responseModel.vehicle.sequenceNumber;
            let customNoVal = responseModel.vehicle.customCardNumber;
            let vehicleIdTypeId = responseModel.vehicle.VehicleIdTypeId;
            let manufactureYearForCustom =
              responseModel.vehicle.manufactureYear;
            let insurancePurposeType;
            if (vehicleIdTypeId == 1) {
              this.sequenceNumberClick();
              vehicleIdTypeId = "1";
              this.is_edit = true;
              this.formdata.controls.vehicleIdTypeId.disable();
            } else if (vehicleIdTypeId == 2) {
              this.customNoClick();
              vehicleIdTypeId = "2";
              insurancePurposeType = "3";
              this.is_edit = true;
              this.formdata.controls.vehicleIdTypeId.disable();
            }
            let ownerNationalId = responseModel.oldOwnerNin;
            let ownerTransfer = responseModel.vehicle.ownerTransfer;

            if (ownerTransfer == false && vehicleIdTypeId == 1) {
              insurancePurposeType = "3";
              this.newInsuranceClick();
              this.is_edit = true;
              this.formdata.controls.insurancePurposeTypeId.disable();
            } else if (ownerTransfer == true && vehicleIdTypeId == 1) {
              insurancePurposeType = "4";
              this.transfereOwnerShipClick();
              this.is_edit = true;
              this.formdata.controls.insurancePurposeTypeId.disable();
            }
            //this.insurancePurposeType
            this.formdata = this.fb.group({
              //vehicleIdTypeId
              // vehicleType: [vehicleIdTypeId, [Validators.required]],
              insurancePurpose: new FormControl(),
              customNo: [customNoVal],
              nationalId: [
                nationalIdEdit,
                [Validators.required, this.minValueMaxValue.bind(this)],
              ],
              manufactureYear: [manufactureYearForCustom],
              sequenceNo: [sequenceNoVal], // new FormControl(sequenceNoVal),
              policyEffectiveDate: [
                this.PolicyEffictiveDate,
                [Validators.required],
              ],
              vehicleIdTypeId: [vehicleIdTypeId, [Validators.required]],
              ownerTransfer: new FormControl(""),
              ownerNationalId: [ownerNationalId], // new FormControl(ownerNationalId),
              insurancePurposeTypeId: [
                insurancePurposeType,
                [Validators.required],
              ],
              inquiryTerms: ["", [Validators.required]],
            });
          },
          (err) => {
            console.log("Error occured");
          }
        );
    }

    this.generatemeladiYears(this.minmeladiYearsman, this.maxmeladiYearsman);
  }
  generatemeladiYears(min, max) {
    for (let i = min; i <= max; i++) {
      this.meladiyearsManifacture.push(i);
    }
    if (!this.meladiyearsManifacture.includes(this.meladiyear)) {
      this.meladiyear = null;
    }
  }
  focusOutFunction() {
    let nationalIDVl = this.formdata.get("nationalId").value;
    //https://bcare.com.sa/InquiryApi/api/InquiryNew/getVehiclesByNin?Nin=2044831598
    this.http
      .get(environment.inquiry + "getVehiclesByNin?Nin=" + nationalIDVl)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.seqOrCustList = res.data;

          this.CopiedseqOrCustList = this.seqOrCustList.filter(
            (c) => c.SequenceNumber != null && c.SequenceNumber != ""
          );

          this.seqOrCustList.map((i) => {
            i.fullInfoAr =
              i.SequenceNumber +
              " " +
              i.ModelAr +
              " " +
              i.MakerAr +
              " " +
              i.ModelYear;
            return i;
          });

          this.seqOrCustList.map((i) => {
            i.fullInfoEn =
              i.SequenceNumber +
              " " +
              i.ModelEn +
              " " +
              i.MakerEn +
              " " +
              i.ModelYear;
            return i;
          });
        },
        (err) => {
          console.log("Error");
        }
      );
  }
  bindDataFromListToInput(seqNu) {
    this.formdata.get("sequenceNo").setValue(seqNu);
    this.showLostSeqBool = false;
  }
  matchInputWithList(event) {
    if (this.formdata.get("sequenceNo").value == "") {
      this.showLostSeqBool = false;
      return;
    }
    this.showLostSeqBool = true;
    console.log(event);

    if (this.CopiedseqOrCustList != null) {
      if (
        this.CopiedseqOrCustList.filter((v) => v.SequenceNumber.includes(event))
          .length > 0
      ) {
        this.showLostSeqBool = true;

        ;

        this.newBindedArr = this.CopiedseqOrCustList.filter((d) =>
          d.SequenceNumber.includes(event)
        );

        console.log(this.newBindedArr);
        var docText = $(".bindData").html();
        var modifiedText = docText.replace(
          event,
          "<span style='color: #f9a62f;font-weight: bold;font-size: 19px;' class='highlight'>" +
            event +
            "</span>"
        );
        $(".bindData").html(modifiedText);

        $("span.highlight:not(.highlight-active):eq(0)").addClass(
          "highlight-active"
        );
      } else {
        this.showLostSeqBool = false;
      }
    }
  }

  removeDDL() {
    this.showLostSeqBool = false;
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
        if (control.value.length < 5) {
          return { SequenceNumberLength: true };
        } 
        if (control.value.length > 15) {
          return { SequenceNumberLength: true };
        }
        else {
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

  @ViewChild("policyStartDateToFocus", { static: false })
  _policyStartDateInput: ElementRef;
  _openCalendarPolicyStartDt(picker1: MatDatepicker<Date>) {
    picker1.open();
    setTimeout(() => this._policyStartDateInput.nativeElement.focus());
  }
  _closeCalendarPolicyStartDt(e) {
    setTimeout(() => this._policyStartDateInput.nativeElement.blur());
  }

  uuidv4() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
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

  sequenceNumberClick() {
    $(".registerBtn");
    this.showInOwnerTransfereOnly = false;
    this.showInNewInsurOnly = true;
    this.sequenceOnly = true;
    this.customNoOnly = false;
    this.formdata
      .get("sequenceNo")
      .setValidators([
        Validators.required,
        this.minValueFiledsSequenceNumber.bind(this),
      ]);
    this.formdata.get("customNo").setValidators(null);
    this.formdata.get("customNo").setValue(null);
    this.formdata.get("customNo").clearValidators();
    this.formdata.get("customNo").updateValueAndValidity();
    this.formdata.get("manufactureYear").setValidators(null);
    this.formdata.get("manufactureYear").setValue(null);
    this.formdata.get("manufactureYear").clearValidators();
    this.formdata.get("manufactureYear").updateValueAndValidity();
    this.vehicleIdType = 1;
    this.insurancePurposeType = 3;
    this.formdata.controls["insurancePurposeTypeId"].setValue("3");
  }
  customNoClick() {
    
    $(".registerBtn");
    this.insurancePurposeType = 3;
    this.formdata.controls["insurancePurposeTypeId"].setValue("3");
    this.showInOwnerTransfereOnly = false;
    this.showInNewInsurOnly = false;
    this.sequenceOnly = false;
    this.customNoOnly = true;
    this.vehicleOwnerId = false;
    this.formdata
      .get("customNo")
      .setValidators([
        Validators.required,
        this.minValueFiledsCustomNumber.bind(this),
      ]);
    this.formdata.get("manufactureYear").setValidators([Validators.required]);
    this.formdata.get("sequenceNo").setValidators(null);
    this.formdata.get("sequenceNo").setValue(null);
    this.formdata.get("sequenceNo").clearValidators();
    this.formdata.get("sequenceNo").updateValueAndValidity();
    this.formdata.get("ownerNationalId").setValidators(null);
    this.formdata.get("ownerNationalId").setValue(null);
    this.formdata.get("ownerNationalId").clearValidators();
    this.formdata.get("ownerNationalId").updateValueAndValidity();
    this.vehicleIdType = 2;
  }

  newInsuranceClick() {
    $(".registerBtn");
    this.showInOwnerTransfereOnly = false;
    this.showInNewInsurOnly = true;
    this.showSequenceInputStye = false;
    this.vehicleOwnerId = false;
    this.customNoOnly = false;
    this.formdata.get("ownerNationalId").setValidators(null);
    this.formdata.get("ownerNationalId").setValue(null);
    this.formdata.get("ownerNationalId").clearValidators();
    this.formdata.get("ownerNationalId").updateValueAndValidity();
    this.insurancePurposeType = 3;
  }

  transfereOwnerShipClick() {
    $(".registerBtn");
    this.vehicleIdType = 1;
    this.formdata.controls["vehicleIdTypeId"].setValue("1");
    this.showInOwnerTransfereOnly = true;
    this.showInNewInsurOnly = false;
    this.showSequenceInputStye = true;
    this.vehicleOwnerId = true;
    this.sequenceOnly = true;
    this.customNoOnly = false;
    this.formdata
      .get("ownerNationalId")
      .setValidators([Validators.required, this.minValueMaxValue.bind(this)]);
    this.formdata.get("customNo").setValidators(null);
    this.formdata.get("customNo").setValue(null);
    this.formdata.get("customNo").clearValidators();
    this.formdata.get("customNo").updateValueAndValidity();
    this.formdata.get("manufactureYear").setValidators(null);
    this.formdata.get("manufactureYear").setValue(null);
    this.formdata.get("manufactureYear").clearValidators();
    this.formdata.get("manufactureYear").updateValueAndValidity();
    this.insurancePurposeType = 4;
  }

  detectChangePolicyDate() {
    var startdate = this.formdata.controls["policyEffectiveDate"].value;
    this.PolicyEffictiveDate = new Date(
      startdate.toString() + "z"
    ).toISOString();
    $(".registerBtn");
    this.formdata.value;
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

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        if (control.invalid) {
          this.notValidHere.push(control);
        } else {
          control.markAsPristine();
        }
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

  onClickSubmit(data) {
    $("#btnSubmit").removeAttr("disabled");
    localStorage.setItem("typeVehicle", this.vehicleIdType);
    localStorage.setItem("manufactureYear", data.manufactureYear);
    let guidParentReq = this.uuidv4;
    this.submitted = true;
    this.errors = [];
    this.notValidHere = new Array();
    let myStorage = window.localStorage;
    let captchaInput = myStorage.getItem("captchaInputImg");
    let captchaTOken = myStorage.getItem("captchaInputTOKEN");
    // suequence
    if (this.sequenceOnly == true && this.vehicleOwnerId == false) {
      if (this.formdata.invalid || this.CaptchaForm.invalid) {
        $("#btnSubmit").removeAttr("disabled");
        this.loading = false;
        this.cpatchaMandatory = true;
        return false;
        // if (this.CaptchaForm.valid) {
        //   this.cpatchaMandatory = false;
        //   this.loading = false;
        //   return false;
        // }
        // else {
        //   this.loading = false;
        //   this.cpatchaMandatory = true;
        //   return false;
        // }
      } 
      else {
        $("#btnSubmit").attr("disabled","disabled");
        this.cpatchaMandatory = false;
        this.loading = true;
      }

      localStorage.setItem("nationalID", data.nationalId);
      const req = this.http
        .post(environment.inquiry + "init-inquiry-request", {
          VehicleIdTypeId: this.vehicleIdType,
          captchaInput: captchaInput,
          captchaToken: captchaTOken,
          nationalId: data.nationalId,
          ownerNationalId: null,
          ownerTransfer: false,
          parentRequestId: guidParentReq,
          policyEffectiveDate: this.PolicyEffictiveDate,
          sequenceNumber: data.sequenceNo,
        })
        .subscribe(
          (res: any) => {
            if (res.ErrorCode != 1) {
              this.loading = false;
              this.showErrDesc = true;
              this.servererror = res.ErrorDescription;
              $("#btnSubmit").removeAttr("disabled");
            } else {
              $("#btnSubmit").attr("disabled","disabled");
              this.showErrDesc = false;
              this.data.setMainDriverData([
                this.vehicleIdType,
                this.insurancePurposeType,
                data.nationalId,
                this.PolicyEffictiveDate,
                data.sequenceNo,
                data.customNo,
                null,
                data.manufactureYear,
              ]);
              if (res.initInquiryResponseModel) {
                $("#btnSubmit").removeAttr("disabled");
                this.showErrDesc = false;
                this.loading = true;
                this.data.setResponseMainDriverData(
                  res.initInquiryResponseModel
                );
                this.router.navigate(["insured"]);
              } 
              else {
                $("#btnSubmit").removeAttr("disabled");
                this.showErrDesc = false;
                this.loading = true;
                this.router.navigate(["insured"]);
              }
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
      if (
        !this.formdata.controls["nationalId"].valid ||
        !this.formdata.controls["policyEffectiveDate"].valid ||
        !this.formdata.controls["customNo"].valid ||
        this.CaptchaForm.invalid ||
        !this.formdata.controls["inquiryTerms"].valid ||
        !this.formdata.controls["manufactureYear"].valid) 
        {
        $("#btnSubmit").removeAttr("disabled");
        if (this.CaptchaForm.valid) {
           $("#btnSubmit").attr("disabled","disabled");
          this.cpatchaMandatory = false;
          this.loading = false;
          return false;
        } else {
           $("#btnSubmit").removeAttr("disabled");
          this.loading = false;
          this.cpatchaMandatory = true;
          return false;
        }
      } 
      else {
        $("#btnSubmit").attr("disabled","disabled");
        this.cpatchaMandatory = false;
        this.loading = true;
      }
      const req = this.http
        .post(environment.inquiry + "init-inquiry-request", {
          VehicleIdTypeId: this.vehicleIdType,
          captchaInput: captchaInput,
          captchaToken: captchaTOken,
          nationalId: data.nationalId,
          ownerNationalId: null,
          ownerTransfer: false,
          parentRequestId: guidParentReq,
          policyEffectiveDate: this.PolicyEffictiveDate,
          sequenceNumber: data.customNo,
        })
        .subscribe(
          (res: any) => {
            if (res.ErrorCode != 1) {
              this.loading = false;
              this.showErrDesc = true;
              this.servererror = res.ErrorDescription;
              $("#btnSubmit").removeAttr("disabled");
            } 
            else {
              $("#btnSubmit").attr("disabled","disabled");
              this.showErrDesc = false;
              this.data.setResponseMainDriverData(res.initInquiryResponseModel);
              this.data.setMainDriverData([
                this.vehicleIdType,
                this.insurancePurposeType,
                data.nationalId,
                this.PolicyEffictiveDate,
                data.sequenceNo,
                data.customNo,
                null,
                data.manufactureYear,
              ]);
              this.router.navigate(["insured"]);
              if (res.errorDescription) {
              }
            }
          },
          (err) => {
            console.log("Error occured");
          }
        );
    }

    // owner transfer
    if (this.vehicleOwnerId == true && this.sequenceOnly == true) {
      if (
        !this.formdata.controls["nationalId"].valid ||
        !this.formdata.controls["policyEffectiveDate"].valid ||
        !this.formdata.controls["sequenceNo"].valid ||
        !this.formdata.controls["ownerNationalId"].valid ||
        this.CaptchaForm.invalid ||
        !this.formdata.controls["inquiryTerms"].valid) 
        {
        $("#btnSubmit").removeAttr("disabled");
        if (this.CaptchaForm.valid) {
          $("#btnSubmit").attr("disabled","disabled");
          this.cpatchaMandatory = false;
          this.loading = false;
          return false;
        } 
        else {
          $("#btnSubmit").removeAttr("disabled");
          this.loading = false;
          this.cpatchaMandatory = true;
          return false;
        }
      } 
      else {
        $("#btnSubmit").attr("disabled","disabled");
        this.cpatchaMandatory = false;
        this.loading = true;
      }
      const req = this.http
        .post(environment.inquiry + "init-inquiry-request", {
          VehicleIdTypeId: this.vehicleIdType,
          captchaInput: captchaInput,
          captchaToken: captchaTOken,
          nationalId: data.nationalId,
          ownerNationalId: data.ownerNationalId,
          ownerTransfer: true,
          parentRequestId: guidParentReq,
          policyEffectiveDate: this.PolicyEffictiveDate,
          sequenceNumber: data.sequenceNo,
        })
        .subscribe(
          (res: any) => {
            if (res.ErrorCode != 1) {
              this.loading = false;
              this.showErrDesc = true;
              this.servererror = res.ErrorDescription;
              $("#btnSubmit").removeAttr("disabled");
            } 
            else {
              $("#btnSubmit").attr("disabled","disabled");
              this.showErrDesc = false;
              this.data.setResponseMainDriverData(res.initInquiryResponseModel);
              this.data.setMainDriverData([
                this.vehicleIdType,
                this.insurancePurposeType,
                data.nationalId,
                this.PolicyEffictiveDate,
                data.sequenceNo,
                data.customNo,
                data.ownerNationalId,
                data.manufactureYear,
              ]);
              this.router.navigate(["insured"]);
              if (res.errorDescription) {
              }
            }
          },
          (err) => {
            console.log("Error occured");
          }
        );
    }
  }
}
