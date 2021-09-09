import { Component, OnInit, Inject, ChangeDetectorRef, Output, Input } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment.prod";
import { DOCUMENT } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";

import * as _ from 'lodash';
import { ShareDataService } from "src/app/services/share-data.service";

@Component({
  selector: 'app-new-qutations',
  templateUrl: './new-qutations.component.html',
  styleUrls: ['./new-qutations.component.css']
})
export class NewQutationsComponent implements OnInit {

  screenTitleEn : string ="Qutations Page";
  screenTitleAr : string = "قائمة العروض";
  companyIDVAL: any;
  arrayOfData: any[] = [];
  companyDetailsPush: any[] = [];
  mycurrentLangu: any;
  myLanguageCus: any;
  lang: any;
  langToBEAPIs: any;
  quotationRequestExternalId: any;
  companiesList: any;
  productsARR: Array<any> = [];
  selectedDeductableValue: any;
  sumbenifitAndTotal: any;
  SelectedProductBenfitId = [];
  SelectedProductBenfitIdToDownload = [];
  NewBinifitList = [];
  showLoading = false;
  showQuotationError = false;
  quotationServererror = "";
  showAddtoCardError = false;
  addtoCardServererror = "";
  showCheckoutDetailsError = false;
  checkoutDetailsServererror = "";
  isDone = false;
  companyCount = 0;
  counter = 0;
  counterSecond = 0;
  benifitValueLikeLive: any;
  totalValuesBenefitsToQuotationForm = [];
  parentReqIdFromFE: any;
  showLoadingSmall = true;
  requestOneGetQuots: any;
  requestTwoGetQuots: any;
  noCompaniesFound = false;
  accOpposite = false;
  accAll = true;
  accComperhnsive = false;
  loading: any[] = [];
  prodCards: any;
  prodDetails: any;
  activeTPL: any;
  activeComprehensive: any;
  isActive: any;
  companyLogo: any;
  logo: any;
  requestAgencyWithDedctableGetQuots: any;
  requestAgencyGetQuots: any;
  requestWorkShopGetQuots: any;
  logoKey: any;
  products: any;
  productDetailsForFirstProd: any;
  showMoreBenfits: any[] = [];
  hideMoreBenfits: any[] = [];
  vehicleDetails: any;
  selectedBenifitsToBuyNowAPI: any;
  myLoogedUser: any;
  quotationVehicleDetails: any;
  fixedMainDriverData: any;
  lowestProduct: any;
  accessToken: any;
  hashed: any;
  vehicleImg: any;
  vehicleDesc: any;
  vehicleModelYear: any;
  vehicleNCDFree: any;
  vehiclePlateNumver: any;
  vehicleModel: any;
  vehicleIMG: any;
  currentLoggedInUSerID: any;
  carPlateEN: any;
  carPlateAR: any;
  CarPlateTextAr: any;
  CarPlateTextEn: any;
  typeVehicleId: any;
  vehicleNCDFreeEn: any;
  benefits: any;
  includedBenfitId: any;
  formdata: FormGroup;
  defaultDeductableValues = 2000;
  buyNwActive = false;
  deductDisabled = false;
  openPpUpInMobile: any;
  showLogin = true;
  showReg = false;
  checkLoginLabel = false;
  checkRegLabel = true;
  companiesGrade: any;
  companyIdArray: any = [];
  fullOpacity = false;
  halfOpacity = false;
  noneOpacity = false;
  openPpUpInweb: any;
  forgetPassOpenPopup = false;
  showForgetPassErr = false;
  serverForgetPassError = "";
  resetEmail: any;
  loadingSendLink = false;
  deductACIG = [
    { id: "500", value: "500" },
    { id: "1000", value: "1000" },
    { id: "1500", value: "1500" },
    { id: "2000", value: "2000" },
    { id: "3000", value: "3000" },
    { id: "5000", value: "5000" },
  ];
  deductArabianShield = [
    { id: "1000", value: "1000" },
    { id: "2000", value: "2000" },
    { id: "3000", value: "3000" },
    { id: "3500", value: "3500" },
    { id: "5000", value: "5000" },
    { id: "10000", value: "10000" },
  ];
  deductMedGULF = [
    { id: "1000", value: "1000" },
    { id: "1250", value: "1250" },
    { id: "1500", value: "1500" },
    { id: "1750", value: "1750" },
    { id: "2000", value: "2000" },
    { id: "2250", value: "2250" },
    { id: "2500", value: "2500" },
    { id: "3000", value: "3000" },
    { id: "3500", value: "3500" },
    { id: "4000", value: "4000" },
    { id: "4500", value: "4500" },
    { id: "5000", value: "5000" },
    { id: "6000", value: "6000" },
    { id: "7000", value: "7000" },
  ];

  isDriver : Boolean;
  isPassenger : Boolean;

  driverOrPassenger : string;
  filterProductsARR:any;

  testVar: any;
  constructor(
    private router: Router,
    @Inject(DOCUMENT) private _document: Document,
    public fb: FormBuilder,
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document,
    private data: ShareDataService,
    private cdRef: ChangeDetectorRef,
    private checkoutData: ShareDataService
  ) { }

  ngAfterViewChecked() {
    this.mycurrentLangu = window.localStorage.getItem("currentLanguage");
    this.myLanguageCus = this.mycurrentLangu;
    if (this.myLanguageCus == "English") {
      this.langToBEAPIs = "en";
    } else {
      this.langToBEAPIs = "ar";
    }
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    $('.flower-bg').addClass('custom-float-right')
    $('.logo-size').addClass('custom-float-right')
    this.showLoading = true;
    this.formdata = this.fb.group({
      deductables: new FormControl(),
      deductablesmedgulf: new FormControl("4000"),
      deductablesshield: new FormControl("5000"),
      deductablesAcig: new FormControl("5000"),
    });

    this.typeVehicleId = localStorage.getItem("typeVehicleId");

    $(".clickedBtn").click(function () {
      $(".clickedBtn").next("ul").toggleClass("active");
    });
    $("body").click(function (event) {
      if (!$(event.target).is(".clickedBtn")) {
        $(".dropdown").removeClass("active");
      }
    });
    $("img.logoInHeader").css("display", "block");

    this.isDone = false;
    this.showLoading = true;
    this.parentReqIdFromFE = this.generateGuid();
    // this.selectedDeductableValue = 1000;

    this.quotationRequestExternalId = this.router.url.substr(
      this.router.url.lastIndexOf("/") + 1
    );
    this.getInsuranceCompaniesByProduct();
    // this.data.getVehicleDetails()
    // this.vehicleDetails = this.data.getVehicleDetails().value;
    this.data.getMainDriverData();
    this.fixedMainDriverData = this.data.getMainDriverData();
    this.getVehicleDetailsInfo();
    localStorage.removeItem("checkOutDetailsData");
    this.getCompaniesGrades();
  }

  generateGuid() {
    return "xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        let r = (Math.random() * 16) | 0,
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

  checkAcc(condition) {

    if (condition == "accOpposite") {
      this.accOpposite = true;
      this.accAll = false;
      this.accComperhnsive = false;
      this.productsARR = this.arrayOfData;
      var products = this.productsARR.filter((x) => x.insuranceTypeCode == 1);
      this.productsARR = products;
      console.log(this.productsARR) 
    }
     else if (condition == "accComperhnsive") {
      this.accOpposite = false;
      this.accComperhnsive = true;
      this.accAll = false;
      this.productsARR = this.arrayOfData;
      var products = this.productsARR.filter((x) => x.insuranceTypeCode == 2);
      this.productsARR = products;
      console.log(this.productsARR) 
    } 
    else if (condition == "accAll") {
      this.accOpposite = false;
      this.accComperhnsive = false;
      this.accAll = true;
      this.productsARR = this.arrayOfData;
      var WithProductList = this.productsARR.filter(
        (x) => x.products.length > 0
      );
      this.productsARR = WithProductList;
      console.log(this.productsARR) 
    }
  }
  // checkAcc(condition) {

  //   if (condition == "accOpposite") {
  //     this.accOpposite = true;
  //     this.accAll = false;
  //     this.accComperhnsive = false;
  //     this.productsARR = [];
  //     this.filterProductsARR = [];
  //     this.filterProductsARR = this.arrayOfData;
  //     console.log(this.filterProductsARR)     
  //     for(var i=0; i<this.filterProductsARR.length;i++)
  //     {
  //       var TPLProducts = this.filterProductsARR[i].products.filter((x) => x.insuranceTypeCode == 1 || x.insuranceTypeCode == 7);
  //       console.log(TPLProducts)
  //       if(TPLProducts.length > 0)
  //       {
  //         if(this.filterProductsARR[i].insurancecompanyid == 12)
  //         {
  //           console.log("TPLProducts")
  //          this.filterProductsARR[i].products=this.filterProductsARR[i].products.filter((x) => x.insuranceTypeCode != 2);
  //          this.productsARR.push(this.filterProductsARR[i]);
  //          console.log(this.productsARR)
  //         }
  //         else
  //         {
  //           console.log("TPLProducts  elssssssssss")
  //           this.productsARR.push(this.filterProductsARR[i])
  //           console.log(this.productsARR)
  //         }
  //       console.log(this.productsARR)
  //       }
  //     }
  //     console.log(this.productsARR) 
  //   }
  //    else if (condition == "accComperhnsive") {
       
  //     this.accOpposite = false;
  //     this.accComperhnsive = true;
  //     this.accAll = false;
  //     this.productsARR=[];
  //     this.filterProductsARR = [];
  //     this.filterProductsARR = this.arrayOfData;
  //     console.log(this.filterProductsARR)
  //     for(var i=0; i<this.filterProductsARR.length;i++)
  //     {
  //       var comprehansiveProducts = this.filterProductsARR[i].products.filter((x) => x.insuranceTypeCode == 2);
  //       console.log(comprehansiveProducts)
  //       if(comprehansiveProducts.length > 0)
  //       {
  //         if(this.filterProductsARR[i].insurancecompanyid == 12)
  //         {
  //           console.log("idddddddddddddddd");

  //            this.filterProductsARR[i].products = this.filterProductsARR[i].products.filter((x) => x.insuranceTypeCode == 2);
  //            this.productsARR.push(this.filterProductsARR[i]);
  //            console.log(this.filterProductsARR[i].products);
  //            console.log(this.productsARR)
  //         }
  //         else
  //         {
  //           console.log("elseeeeeeeeeee");
  //           this.productsARR.push(this.filterProductsARR[i])
  //           console.log(this.productsARR)
  //         }
     
  //       }
  //     }
  //     console.log(this.productsARR) 
  //   } 
  //   else if (condition == "accAll") {
  //     this.accOpposite = false;
  //     this.accComperhnsive = false;
  //     this.accAll = true;
  //     this.productsARR = this.arrayOfData;
  //     var WithProductList = this.productsARR.filter((x) => x.products.length > 0);
  //     this.productsARR = WithProductList;
  //     console.log(this.productsARR) 
  //   }
  // }

  openBenfits(prodId: any) {
    this.showMoreBenfits[prodId] = false;
    this.hideMoreBenfits[prodId] = true;
    $(".addClass" + prodId).removeClass("full");
  }

  hideBenfits(prodId: any) {
    this.showMoreBenfits[prodId] = true;
    this.hideMoreBenfits[prodId] = false;
    $(".addClass" + prodId).addClass("full");
  }

  sort(dir) {
    var noProductList = this.productsARR.filter((x) => x.products.length == 0);
    var WithProductList = this.productsARR.filter((x) => x.products.length > 0);

    if (dir) {
      WithProductList = WithProductList.sort((x, y) =>
        x.products[0].productPrice > y.products[0].productPrice ? -1 : 1
      );
    } else {
      WithProductList = WithProductList.sort((x, y) =>
        x.products[0].productPrice > y.products[0].productPrice ? 1 : -1
      );
    }

    this.productsARR = [];
    WithProductList.forEach((element) => {
      this.productsARR.push(element);
    });
    noProductList.forEach((element) => {
      this.productsARR.push(element);
    });
  }

  getVehicleDetailsInfo() {
    if (this.myLanguageCus == "English") {
      this.langToBEAPIs = "en";
    } else {
      this.langToBEAPIs = "ar";
    }

    this.http
      .get(
        environment.portalUrl +
        "QuotationApi/api/quotation/getVehicleInfo?" +
        "qtRqstExtrnlId=" +
        this.quotationRequestExternalId +
        "&" +
        "typeOfInsurance=" +
        1 +
        "&lang=" +
        this.langToBEAPIs,
        {}
      )
      .subscribe(
        (res: any) => {
          this.showLoading = false;
          this.vehicleIMG = res.Vehicle.FormatedMakerCode;
          this.vehicleDesc = res.Vehicle.Maker;
          this.vehicleModelYear = res.Vehicle.ModelYear;
          this.vehicleModel = res.Vehicle.Model;
          this.carPlateEN = res.Vehicle.CarPlate.CarPlateNumberEn;
          this.carPlateAR = res.Vehicle.CarPlate.CarPlateNumberAr;
          this.CarPlateTextAr = res.Vehicle.CarPlate.CarPlateTextAr;
          this.CarPlateTextEn = res.Vehicle.CarPlate.CarPlateTextEn;
          this.vehicleNCDFree = res.NCDFreeYearsAr;
          this.vehicleNCDFreeEn = res.NCDFreeYearsEn;

          this.data.setVehicleDetails(res);
          localStorage.setItem(
            "VehicleDetailsFrmQuotPage",
            JSON.stringify(res)
          );
        },
        (err) => {
          console.log("Error occured");
        }
      );
  }

  changeDeductables(detailsCompany, event) {
    this.formdata.controls.deductables.disable();
    this.deductDisabled = true;
    console.log(detailsCompany);
    let prod = detailsCompany.products.filter(
      (x) => x.deductableValue == event
    )[0];
    let firstProd = detailsCompany.products[0];
    let prodIndx = detailsCompany.products.indexOf(prod);
    detailsCompany.products[0] = prod;
    detailsCompany.products[prodIndx] = firstProd;
    this.deductDisabled = false;
    this.formdata.controls.deductables.enable();
  }

  changeDeductablesTaw(detailsCompany, event) {
    this.formdata.controls.deductables.disable();
    this.deductDisabled = true;
    console.log(detailsCompany);
    let prod = detailsCompany.products.filter((x) => x.deductableValue == event)[0];
    let firstProd = detailsCompany.products[2];
    let prodIndx = detailsCompany.products.indexOf(prod);
    detailsCompany.products[2] = prod;
    detailsCompany.products[prodIndx] = firstProd;
    this.deductDisabled = false;
    this.formdata.controls.deductables.enable();
  }

  changeDeductablesMedGulf(detailsCompany, event) {
    this.formdata.controls.deductablesmedgulf.disable();
    this.deductDisabled = true;
    console.log(detailsCompany);
    if (
      detailsCompany.insurancecompanyid == 8 &&
      detailsCompany.insuranceTypeCode == 2
    ) {
      this.requestOneGetQuots = this.http
        .get(
          environment.quotation +
            "/quote?" +
            "insuranceCompanyId=" +
            8 +
            "&" +
            "qtRqstExtrnlId=" +
            this.quotationRequestExternalId +
            "&" +
            "parentRequestId=" +
            this.parentReqIdFromFE +
            "&" +
            "insuranceTypeCode=" +
            2 +
            "&" +
            "vehicleAgencyRepair=" +
            false +
            "&" +
            "deductibleValue=" +
            event.value
        )
        .subscribe(
          (res: any) => {
            this.deductDisabled = false;
            this.formdata.controls.deductablesmedgulf.enable();
            if (res.errors != null) {
              this.showQuotationError = true;
              this.quotationServererror = res.errors[0].description;
              this.showLoadingSmall = false;
            } else {
              let firstProd = res.data.products[0];
              detailsCompany.products[0] = firstProd;
            }
          },
          (err) => {
            this.formdata.controls.deductablesmedgulf.enable();
            this.deductDisabled = false;
            console.log("err");
          }
        );
    }
  }
  changeDeductablesArabianShield(detailsCompany, event) {
    //deductablesshield
    this.formdata.controls.deductablesshield.disable();
    this.deductDisabled = true;
    console.log(detailsCompany);
    if (
      detailsCompany.insurancecompanyid == 9 &&
      detailsCompany.insuranceTypeCode == 2
    ) {
      this.requestOneGetQuots = this.http
        .get(
          environment.quotation +
            "/quote?" +
            "insuranceCompanyId=" +
            9 +
            "&" +
            "qtRqstExtrnlId=" +
            this.quotationRequestExternalId +
            "&" +
            "parentRequestId=" +
            this.parentReqIdFromFE +
            "&" +
            "insuranceTypeCode=" +
            2 +
            "&" +
            "vehicleAgencyRepair=" +
            false +
            "&" +
            "deductibleValue=" +
            event.value
        )
        .subscribe(
          (res: any) => {
            this.formdata.controls.deductablesshield.enable();
            this.deductDisabled = false;
            if (res.errors != null) {
              this.showQuotationError = true;
              this.quotationServererror = res.errors[0].description;
              this.showLoadingSmall = false;
            } else {
              let firstProd = res.data.products[0];
              detailsCompany.products[0] = firstProd;
            }
          },
          (err) => {
            this.formdata.controls.deductablesshield.enable();
            this.deductDisabled = false;
            console.log("err");
          }
        );
    }
  }
  changeDeductablesACIG(detailsCompany, event) {
    //deductablesAcig
    this.formdata.controls.deductablesAcig.disable();
    this.deductDisabled = true;
    console.log(detailsCompany);
    if (
      detailsCompany.insurancecompanyid == 2 &&
      detailsCompany.insuranceTypeCode == 2
    ) {
      this.requestOneGetQuots = this.http
        .get(
          environment.quotation +
            "/quote?" +
            "insuranceCompanyId=" +
            2 +
            "&" +
            "qtRqstExtrnlId=" +
            this.quotationRequestExternalId +
            "&" +
            "parentRequestId=" +
            this.parentReqIdFromFE +
            "&" +
            "insuranceTypeCode=" +
            2 +
            "&" +
            "vehicleAgencyRepair=" +
            false +
            "&" +
            "deductibleValue=" +
            event.value
        )
        .subscribe(
          (res: any) => {
            this.formdata.controls.deductablesAcig.enable();
            this.deductDisabled = false;
            if (res.errors != null) {
              this.showQuotationError = true;
              this.quotationServererror = res.errors[0].description;
              this.showLoadingSmall = false;
            } else {
              let firstProd = res.data.products[0];
              detailsCompany.products[0] = firstProd;
            }
          },
          (err) => {
            this.formdata.controls.deductablesAcig.enable();
            this.deductDisabled = false;
            console.log("err");
          }
        );
    }
  }

  
  // IProductBenefit :any = [];
  // // onBenfitChange = new EventEmitter();
  // // @Input() companyKey;
  // benefitsList = {
  //   0: 'pin',
  //   1: 'svg-driver',
  //   2: 'driver-passenger',
  //   3: 'geographic-coverage',
  //   4: 'theft-fire-frontglass',
  //   5: 'roadside-assistance',
  //   6: 'car-replacement',
  //   7: 'AgencyRepairs',
  //   8: 'svg-noclaim',
  //   9: 'geographicbahrain-coverage',
  //   10: 'geographicbahraingcc-coverage',
  //   11: 'geographicbahrainnorth-coverage',
  //   12: 'waiver',
  //   13: 'theft-fire-frontglass',
  //   14: '14',
  //   15: '15',
  //   16: '16',
  //   17: '17',
  //   18: '18',
  //   19:'19'
  // }
  // isOverWeight = false;
  // isFull = false;
  // JSON = JSON;
  // TokioMarineGeographicalExtensionGCCBenefitsList = ['2101','2102','2103'];
  // TokioMarineGeographicalExtensionNonGCCBenefitsList = ['2104','2105','2106'];
  // changeSelected(index) {
  //   let selectedBenefit = this.benefits[index];
  //   if (!this.benefits[index].isReadOnly && !this.benefits[index].isDisabled) {
  //     this.benefits[index].isSelected = !this.benefits[index].isSelected;

  //     // console.log('changeSelected ', this.companyKey);
  //     // console.log(this.companyKey);
  //     if(this.companyKey == 'Tawuniya') {
  //       if (selectedBenefit.benefitExternalId === 'PA-DP') {
  //         if (selectedBenefit.isSelected) {
  //           const driverCoverage = this.benefits.find(b => b.benefitExternalId === 'PA-PO');
  //           driverCoverage.isSelected = false;
  //           driverCoverage.isDisabled = true;
  //           const passengersCoverage = this.benefits.find(b => b.benefitExternalId === 'PA-DO');
  //           passengersCoverage.isSelected = false;
  //           passengersCoverage.isDisabled = true;
  //         } else {
  //           const driverCoverage = this.benefits.find(b => b.benefitExternalId === 'PA-PO');
  //           driverCoverage.isDisabled = false;
  //           const passengersCoverage = this.benefits.find(b => b.benefitExternalId === 'PA-DO')
  //           passengersCoverage.isDisabled = false;
  //         }
  //       }
  //     } else {
  //       if (this.benefits[index].benefit.code === 2) {
  //         if (this.benefits[index].isSelected) {
  //           const driverCoverage = this.benefits.find(b => b.benefit.code === 1);
  //           driverCoverage.isSelected = false;
  //           driverCoverage.isDisabled = true;
  //           const passengersCoverage = this.benefits.find(b => b.benefit.code === 8);
  //           passengersCoverage.isSelected = false;
  //           passengersCoverage.isDisabled = true;
  //         } else {
  //           const driverCoverage = this.benefits.find(b => b.benefit.code === 1);
  //           driverCoverage.isDisabled = false;  
  //           const passengersCoverage = this.benefits.find(b => b.benefit.code === 8)
  //           passengersCoverage.isDisabled = false;
  //         }
  //       }
  //     }

  //     if (this.benefits[index].isSelected) {
  //       let selectedBenefitExternalId = this.benefits[index].benefitExternalId;
  //       if(this.TokioMarineGeographicalExtensionGCCBenefitsList.includes(selectedBenefitExternalId))
  //       {
  //         this.selectOnlyOneBenefitFromList(this.TokioMarineGeographicalExtensionGCCBenefitsList,selectedBenefitExternalId);
  //       }
  //       else if(this.TokioMarineGeographicalExtensionNonGCCBenefitsList.includes(selectedBenefitExternalId))
  //       {
  //         this.selectOnlyOneBenefitFromList(this.TokioMarineGeographicalExtensionNonGCCBenefitsList,selectedBenefitExternalId);
  //       }
  //     }

  //     let benefitsValue = 0;
  //     let benefitsVat = 0;
  //     this.benefits.filter(b => b.isSelected).forEach(benefit => {
  //         benefitsValue += benefit.benefitPrice * 1.15;
  //         benefitsVat += benefit.benefitPrice * 0.15;//benefitsValue - benefit.benefitPrice;
  //     });
  //       // this.onBenfitChange.emit({ benefitsValue: benefitsValue, benefitsVat: benefitsVat, benefitId: this.benefits[index].benefitId});
  //   }
  //       this.checkForInclude(selectedBenefit.benefit.code);
  // }

  //   isIncluded= true;
  //   checkForInclude(benefitCode: any) {
  //     console.log('checkForInclude --> this.benefits');
  //     console.log(benefitCode);
  //     console.log(this.benefits);

  //     if(benefitCode == 8 && this.benefits.filter(x => x.isReadOnly && x.isSelected).length == 0) {
  //       this.isIncluded = this.benefits.filter(x => x.benefitId == 1 || x.benefitId == 8 && x.isSelected && !x.isReadOnly).length != 2;
  //     } else if(this.benefits.filter(x => x.benefitId == 1 && !x.isSelected && !x.isReadOnly).length == 1) {
  //       this.isIncluded = this.benefits.filter(x => x.benefitId == 1 && x.isSelected).length != 1;
  //     }else {
  //       this.isIncluded = this.benefits.filter(x => x.benefitId == 1 || x.benefitId == 8 && x.isSelected).length != 2;
  //     }
  //   }

  //   selectOnlyOneBenefitFromList(benefitList,selectedBenefit){
  //     benefitList.forEach(value => {
  //       if(selectedBenefit != value){
  //         const benefit = this.benefits.find(b => b.benefitExternalId == value);
  //         benefit.isSelected = false;
  //       }
  //     }); 
  //   }

  test : boolean;
  tempObj : any = {};
  temparr : any = [];
  currentObj : any = {};
  
  addBenifitToTotal(e, benifitDetail, detailsCompany, productTotalPrice, customIndex, benefitIdToDownload) {


    if(benifitDetail.benefitId === 1 || benifitDetail.benefitId === 2) {

      this.currentObj = {
        e: e,
           benifitDetail : benifitDetail,
           detailsCompany: detailsCompany,
           productTotalPrice: productTotalPrice,
           customIndex: customIndex,
           benefitIdToDownload: benefitIdToDownload
          };

      let compObj = this.temparr.filter(item => item.detailsCompany.products[0].id == this.currentObj.detailsCompany.products[0].id);
      console.log(compObj);
      if(compObj.length == 0) {
        console.log("emptyyyyyy");
        this.temparr.push(this.currentObj);
        if (e.target.checked) {
          this.addBenifit(this.currentObj.benifitDetail,this.currentObj.detailsCompany,
            this.currentObj.productTotalPrice,this.currentObj.customIndex,this.currentObj.benefitIdToDownload);
        } else {
            console.log("dont need");

        }

      } else{
        this.temparr = this.temparr.filter(item => item.detailsCompany.products[0].id != compObj[0].detailsCompany.products[0].id);
        if(e.target.checked){
          this.temparr.push(this.currentObj);
          productTotalPrice = productTotalPrice - compObj[0].benifitDetail.benefitPrice - compObj[0].benifitDetail.benefitPrice * (15 / 100);
          this.sumbenifitAndTotal = productTotalPrice;
          this.removeBenifit(compObj[0].benifitDetail, compObj[0].detailsCompany, 
          productTotalPrice, compObj[0].customIndex, compObj[0].benefitIdToDownload,"from inside 1 , 8 remove");   
          compObj[0].e.target.checked = false;
         this.addBenifit(benifitDetail,detailsCompany,productTotalPrice,customIndex,benefitIdToDownload);
        }else {

          this.removeBenifit(benifitDetail, detailsCompany, productTotalPrice, customIndex, benefitIdToDownload,"from inside normal remove");
        }
      }

      // console.log(this.tempObj);
      // let isDriver = benifitDetail.benefitId === 1 && this.SelectedProductBenfitId.includes(benifitDetail.id);
      // let isPassenger = benifitDetail.benefitId === 8 && this.SelectedProductBenfitId.includes(benifitDetail.id);

      //  console.log("driver" + isDriver);
      //  console.log("passenger" + isPassenger);

      //  if (e.target.checked) {
        
      //    if(Object.keys(this.tempObj).length > 0){
      //     productTotalPrice = productTotalPrice - this.tempObj.benifitDetail.benefitPrice - this.tempObj.benifitDetail.benefitPrice * (15 / 100);
      //     this.sumbenifitAndTotal = productTotalPrice;
      //     this.removeBenifit(this.tempObj.benifitDetail, this.tempObj.detailsCompany, 
      //     productTotalPrice, this.tempObj.customIndex, this.tempObj.benefitIdToDownload,"from inside 1 , 8 remove");   
      //    this.tempObj.e.target.checked = false;
         
      //     }
          

      //     // var benifitDetailClone = _.cloneDeep(benifitDetail);
      //     // var detailsCompanyClone = _.cloneDeep(detailsCompany);

          
      //     // this.tempObj = {
      //     //   e: e,
      //     //  benifitDetail : benifitDetail,
      //     //  detailsCompany: detailsCompany,
      //     //  productTotalPrice:productTotalPrice,
      //     //  customIndex: customIndex,
      //     //  benefitIdToDownload:benefitIdToDownload
      //     // };

      //   //  console.log(this.tempObj);
      //    this.addBenifit(benifitDetail,detailsCompany,productTotalPrice,customIndex,benefitIdToDownload);
      //   //  this.temparr = this.temparr.filter(item => item !== this.tempObj);
      //   //  this.temparr.push(this.tempObj);
      
      // } else {
      //   // this.temparr = this.temparr.filter(item => item !== this.tempObj);

      //   // this.tempObj={};
      //   this.removeBenifit(benifitDetail, detailsCompany, productTotalPrice, customIndex, benefitIdToDownload,"from inside normal remove");
       
      // }

    } else {
      if (e.target.checked) {
        this.benifitValueLikeLive = benifitDetail.benefitPrice * (15 / 100);
        this.sumbenifitAndTotal =
          (
            benifitDetail.benefitPrice +
            productTotalPrice +
            this.benifitValueLikeLive
          ).toFixed(2) * 1;
        detailsCompany.products[0].productPrice =
          this.sumbenifitAndTotal.toFixed(2) * 1;
        //draw calculated vat
  
        for (let i = 0; i < detailsCompany.products[0].priceDetails.length; i++) {
          if (detailsCompany.products[0].priceDetails[i].priceType.code == 8) {
            detailsCompany.products[0].priceDetails[i].priceValue =
              detailsCompany.products[0].priceDetails[i].priceValue +
              this.benifitValueLikeLive.toFixed(2) * 1;
          }
        }
  
        detailsCompany.testprice = this.sumbenifitAndTotal.toFixed(2) * 1;
        this.SelectedProductBenfitId.push(customIndex);
  
        let testNew = {
          bennifitId: customIndex,
          productNewId: detailsCompany.products[0].id,
        };
        this.NewBinifitList.push(testNew);
        this.SelectedProductBenfitIdToDownload.push(benefitIdToDownload);
        let productID = benifitDetail.productId;
        let benifitProduc = this.totalValuesBenefitsToQuotationForm.filter(
          (x) => x.productId == productID
        );
        if (benifitProduc.length > 0) {
          let index = this.totalValuesBenefitsToQuotationForm.indexOf(
            benifitProduc[0]
          );
          this.totalValuesBenefitsToQuotationForm[index].benfitIds.push(
            benefitIdToDownload
          );
        } else {
          let arrToDownloadCheckOut;
          arrToDownloadCheckOut = {
            productId: productID,
            benfitIds: [benefitIdToDownload],
          };
          this.totalValuesBenefitsToQuotationForm.push(arrToDownloadCheckOut);
        }
      
      } else {
  
        this.removeBenifit(benifitDetail, detailsCompany, productTotalPrice, customIndex, benefitIdToDownload,"from outside normal remove");
       
      }
    }
  } 
  
  addBenifitToTotalTawSandPlus(
    e,
    benifitDetail,
    detailsCompany,
    productTotalPrice,
    customIndex,
    benefitIdToDownload
  ) {
    if (e.target.checked) {
      this.benifitValueLikeLive = benifitDetail.benefitPrice * (15 / 100);
      this.sumbenifitAndTotal =
        (
          benifitDetail.benefitPrice +
          productTotalPrice +
          this.benifitValueLikeLive
        ).toFixed(2) * 1;
      detailsCompany.products[1].productPrice =
        this.sumbenifitAndTotal.toFixed(2) * 1;
      //draw calculated vat

      for (let i = 0; i < detailsCompany.products[1].priceDetails.length; i++) {
        if (detailsCompany.products[1].priceDetails[i].priceType.code == 8) {
          detailsCompany.products[1].priceDetails[i].priceValue =
            detailsCompany.products[1].priceDetails[i].priceValue +
            this.benifitValueLikeLive.toFixed(2) * 1;
        }
      }

      detailsCompany.testprice = this.sumbenifitAndTotal.toFixed(2) * 1;
      this.SelectedProductBenfitId.push(customIndex);

      let testNew = {
        bennifitId: customIndex,
        productNewId: detailsCompany.products[1].id,
      };
      this.NewBinifitList.push(testNew);
      this.SelectedProductBenfitIdToDownload.push(benefitIdToDownload);
      let productID = benifitDetail.productId;
      let benifitProduc = this.totalValuesBenefitsToQuotationForm.filter(
        (x) => x.productId == productID
      );
      if (benifitProduc.length > 0) {
        let index = this.totalValuesBenefitsToQuotationForm.indexOf(
          benifitProduc[0]
        );
        this.totalValuesBenefitsToQuotationForm[index].benfitIds.push(
          benefitIdToDownload
        );
      } else {
        let arrToDownloadCheckOut;
        arrToDownloadCheckOut = {
          productId: productID,
          benfitIds: [benefitIdToDownload],
        };
        this.totalValuesBenefitsToQuotationForm.push(arrToDownloadCheckOut);
      }
    } else {
      let ben_index = this.NewBinifitList.indexOf(
        this.NewBinifitList.filter((x) => x.benefitId == customIndex)[0]
      );
      this.NewBinifitList.splice(ben_index, 1);
      this.benifitValueLikeLive = benifitDetail.benefitPrice * (15 / 100);
      this.SelectedProductBenfitId.splice(
        this.SelectedProductBenfitId.indexOf(customIndex),
        1
      );
      this.sumbenifitAndTotal = benifitDetail.benefitPrice + productTotalPrice;
      this.sumbenifitAndTotal.toFixed(2) * 1;
      detailsCompany.products[1].productPrice =
        detailsCompany.products[1].productPrice -
        benifitDetail.benefitPrice -
        this.benifitValueLikeLive.toFixed(2) * 1;
      for (let i = 0; i < detailsCompany.products[1].priceDetails.length; i++) {
        if (detailsCompany.products[1].priceDetails[i].priceType.code == 8) {
          detailsCompany.products[1].priceDetails[i].priceValue =
            detailsCompany.products[1].priceDetails[i].priceValue -
            this.benifitValueLikeLive.toFixed(2) * 1;
        }
      }
      detailsCompany.testprice = this.sumbenifitAndTotal;
      this.SelectedProductBenfitIdToDownload.splice(
        this.SelectedProductBenfitIdToDownload.indexOf(benefitIdToDownload),
        1
      );

      let productID = benifitDetail.productId;
      let benifitProduc = this.totalValuesBenefitsToQuotationForm.filter(
        (x) => x.productId == productID
      );
      let index = this.totalValuesBenefitsToQuotationForm.indexOf(
        benifitProduc[0]
      );
      this.totalValuesBenefitsToQuotationForm[index].benfitIds.splice(
        this.totalValuesBenefitsToQuotationForm[index].benfitIds.indexOf(
          benefitIdToDownload
        ),
        1
      );
    }
  }
  addBenifitToTotalTawComperhnsive(
    e,
    benifitDetail,
    detailsCompany,
    productTotalPrice,
    customIndex,
    benefitIdToDownload
  ) {
    if (e.target.checked) {
      this.benifitValueLikeLive = benifitDetail.benefitPrice * (15 / 100);
      this.sumbenifitAndTotal =
        (
          benifitDetail.benefitPrice +
          productTotalPrice +
          this.benifitValueLikeLive
        ).toFixed(2) * 1;
      detailsCompany.products[2].productPrice =
        this.sumbenifitAndTotal.toFixed(2) * 1;
      //draw calculated vat

      for (let i = 0; i < detailsCompany.products[2].priceDetails.length; i++) {
        if (detailsCompany.products[2].priceDetails[i].priceType.code == 8) {
          detailsCompany.products[2].priceDetails[i].priceValue =
            detailsCompany.products[2].priceDetails[i].priceValue +
            this.benifitValueLikeLive.toFixed(2) * 1;
        }
      }

      detailsCompany.testprice = this.sumbenifitAndTotal.toFixed(2) * 1;
      this.SelectedProductBenfitId.push(customIndex);

      let testNew = {
        bennifitId: customIndex,
        productNewId: detailsCompany.products[2].id,
      };
      this.NewBinifitList.push(testNew);
      this.SelectedProductBenfitIdToDownload.push(benefitIdToDownload);
      let productID = benifitDetail.productId;
      let benifitProduc = this.totalValuesBenefitsToQuotationForm.filter(
        (x) => x.productId == productID
      );
      if (benifitProduc.length > 0) {
        let index = this.totalValuesBenefitsToQuotationForm.indexOf(
          benifitProduc[0]
        );
        this.totalValuesBenefitsToQuotationForm[index].benfitIds.push(
          benefitIdToDownload
        );
      } else {
        let arrToDownloadCheckOut;
        arrToDownloadCheckOut = {
          productId: productID,
          benfitIds: [benefitIdToDownload],
        };
        this.totalValuesBenefitsToQuotationForm.push(arrToDownloadCheckOut);
      }
    } else {
      let ben_index = this.NewBinifitList.indexOf(
        this.NewBinifitList.filter((x) => x.benefitId == customIndex)[0]
      );
      this.NewBinifitList.splice(ben_index, 1);
      this.benifitValueLikeLive = benifitDetail.benefitPrice * (15 / 100);
      this.SelectedProductBenfitId.splice(
        this.SelectedProductBenfitId.indexOf(customIndex),
        1
      );
      this.sumbenifitAndTotal = benifitDetail.benefitPrice + productTotalPrice;
      this.sumbenifitAndTotal.toFixed(2) * 1;
      detailsCompany.products[2].productPrice =
        detailsCompany.products[2].productPrice -
        benifitDetail.benefitPrice -
        this.benifitValueLikeLive.toFixed(2) * 1;
      for (let i = 0; i < detailsCompany.products[2].priceDetails.length; i++) {
        if (detailsCompany.products[2].priceDetails[i].priceType.code == 8) {
          detailsCompany.products[2].priceDetails[i].priceValue =
            detailsCompany.products[2].priceDetails[i].priceValue -
            this.benifitValueLikeLive.toFixed(2) * 1;
        }
      }
      detailsCompany.testprice = this.sumbenifitAndTotal;
      this.SelectedProductBenfitIdToDownload.splice(
        this.SelectedProductBenfitIdToDownload.indexOf(benefitIdToDownload),
        1
      );

      let productID = benifitDetail.productId;
      let benifitProduc = this.totalValuesBenefitsToQuotationForm.filter(
        (x) => x.productId == productID
      );
      let index = this.totalValuesBenefitsToQuotationForm.indexOf(
        benifitProduc[0]
      );
      this.totalValuesBenefitsToQuotationForm[index].benfitIds.splice(
        this.totalValuesBenefitsToQuotationForm[index].benfitIds.indexOf(
          benefitIdToDownload
        ),
        1
      );
    }
  }


  addBenifit(benifitDetail,detailsCompany,productTotalPrice,customIndex,benefitIdToDownload){
    this.benifitValueLikeLive = benifitDetail.benefitPrice * (15 / 100);
        this.sumbenifitAndTotal =
          (
            benifitDetail.benefitPrice +
            productTotalPrice +
            this.benifitValueLikeLive
          ).toFixed(2) * 1;
        detailsCompany.products[0].productPrice =
          this.sumbenifitAndTotal.toFixed(2) * 1;
        //draw calculated vat
  
        for (let i = 0; i < detailsCompany.products[0].priceDetails.length; i++) {
          if (detailsCompany.products[0].priceDetails[i].priceType.code == 8) {
            detailsCompany.products[0].priceDetails[i].priceValue =
              detailsCompany.products[0].priceDetails[i].priceValue +
              this.benifitValueLikeLive.toFixed(2) * 1;
          }
        }
  
        detailsCompany.testprice = this.sumbenifitAndTotal.toFixed(2) * 1;
        this.SelectedProductBenfitId.push(customIndex);
  
        let testNew = {
          bennifitId: customIndex,
          productNewId: detailsCompany.products[0].id,
        };
        this.NewBinifitList.push(testNew);
        this.SelectedProductBenfitIdToDownload.push(benefitIdToDownload);
        let productID = benifitDetail.productId;
        let benifitProduc = this.totalValuesBenefitsToQuotationForm.filter(
          (x) => x.productId == productID
        );
        if (benifitProduc.length > 0) {
          let index = this.totalValuesBenefitsToQuotationForm.indexOf(
            benifitProduc[0]
          );
          this.totalValuesBenefitsToQuotationForm[index].benfitIds.push(
            benefitIdToDownload
          );
        } else {
          let arrToDownloadCheckOut;
          arrToDownloadCheckOut = {
            productId: productID,
            benfitIds: [benefitIdToDownload],
          };
          this.totalValuesBenefitsToQuotationForm.push(arrToDownloadCheckOut);
        }

        
  }


  removeBenifit(benifitDetail, detailsCompany, productTotalPrice, customIndex, benefitIdToDownload,source){
    console.log(source);
    console.log(benifitDetail);
    console.log(detailsCompany);
    console.log(productTotalPrice);
    console.log(customIndex);
    console.log(benefitIdToDownload);
    
    let ben_index = this.NewBinifitList.indexOf(
      this.NewBinifitList.filter((x) => x.benefitId == customIndex)[0]
    );
    this.NewBinifitList.splice(ben_index, 1);
    this.benifitValueLikeLive = benifitDetail.benefitPrice * (15 / 100);
    this.SelectedProductBenfitId.splice(
      this.SelectedProductBenfitId.indexOf(customIndex),
      1
    );
    this.sumbenifitAndTotal = benifitDetail.benefitPrice + productTotalPrice;
    this.sumbenifitAndTotal.toFixed(2) * 1;
    detailsCompany.products[0].productPrice =
      detailsCompany.products[0].productPrice -
      benifitDetail.benefitPrice -
      this.benifitValueLikeLive.toFixed(2) * 1;
    for (let i = 0; i < detailsCompany.products[0].priceDetails.length; i++) {
      if (detailsCompany.products[0].priceDetails[i].priceType.code == 8) {
        detailsCompany.products[0].priceDetails[i].priceValue =
          detailsCompany.products[0].priceDetails[i].priceValue -
          this.benifitValueLikeLive.toFixed(2) * 1;
      }
    }
    detailsCompany.testprice = this.sumbenifitAndTotal;
    this.SelectedProductBenfitIdToDownload.splice(
      this.SelectedProductBenfitIdToDownload.indexOf(benefitIdToDownload),
      1
    );

    let productID = benifitDetail.productId;
    let benifitProduc = this.totalValuesBenefitsToQuotationForm.filter(
      (x) => x.productId == productID
    );
    let index = this.totalValuesBenefitsToQuotationForm.indexOf(
      benifitProduc[0]
    );
    this.totalValuesBenefitsToQuotationForm[index].benfitIds.splice(
      this.totalValuesBenefitsToQuotationForm[index].benfitIds.indexOf(
        benefitIdToDownload
      ),
      1
    );}

    
  editApi() {
    let eid = this.quotationRequestExternalId;
    this.router.navigate(["/edit/" + this.quotationRequestExternalId]);
  }

  openForgetPasswordPopup() {
    this.forgetPassOpenPopup = true;
  }
  closePopup() {
    this.forgetPassOpenPopup = false;
  }

  resetPassword(email) {
    this.loadingSendLink = true;

    this.http
      .post(environment.identity + "ForgetPassword", {
        Email: email,
      })
      .subscribe(
        (res: any) => {
          if (res.ErrorCode != 1) {
            this.showForgetPassErr = true;
            this.serverForgetPassError = res.ErrorDescription;
            this.loadingSendLink = false;
          } else {
            this.loadingSendLink = false;
            this.showForgetPassErr = false;
            let result = res.Result;
            this.forgetPassOpenPopup = false;
          }
        },
        (err) => {
          console.log("Error occured");
        }
      );
  }

  // https://bcare.com.sa/QuotationApi/api/quotation/getCompaniesGrades
  getCompaniesGrades() {
    this.http
      .get(environment.quotation + "/quotation/getCompaniesGrades", {})
      .subscribe(
        (res: any) => {
          this.companiesGrade = res.data;
        },
        (err) => {
          console.log("error occured");
        }
      );
  }

  getInsuranceCompaniesByProduct() {
    //  this.showLoadingSmall = false;
    this.showLoading = true;
    this.arrayOfData = [];
    this.productsARR = [];
    this.http
      .get(
        environment.portalUrl + "AdministrationApi/api/insurance-company/all",
        {}
      )
      .subscribe(
        (res: any) => {
          if (res.errors != null) {
            alert(res.errorDescription);
            console.log("Error occured");
            if (this.myLanguageCus != "English") {
              this.quotationServererror = "حدث خطأ";
            } else {
              this.quotationServererror = "Something went wrong";
            }
            this.showLoading = true;
          } else {
            if (res.data) {
              this.companiesList = res.data;
              this.companyCount = this.companiesList.length;
              for (let i = 0; i < this.companiesList.length; i++) {
                const companyIDVALue = this.companiesList[i].id;
                this.companyIDVAL = companyIDVALue;
                this.companyIdArray.push(this.companyIDVAL);
                this.logo = this.companiesList[i].key;
                this.activeTPL = this.companiesList[i].isActiveTPL;
                this.activeComprehensive = this.companiesList[
                  i
                ].isActiveComprehensive;
                this.isActive = this.companiesList[i].isActive;
                if (this.isActive == true) {
                  this.getQuotations(this.companyIDVAL, this.logo);
                }
              }
            } else if (res.data.length == 0) {
              this.noCompaniesFound = true;
              this.showLoading = false;
            } else if (res.data.length < 0) {
              this.noCompaniesFound = true;
              this.showLoading = false;
            } else {
              this.noCompaniesFound = true;
              this.showLoading = false;
            }
          }
        },
        (err) => {
          this.showLoadingSmall = false;
          this.noCompaniesFound = true;
          console.log("error occured");
        }
      );
  }

  getQuotations(companyId, key) {
    this.counter = 0;
    this.counterSecond = 0;
    this.noCompaniesFound = false;
    this.isDone = false;
    this.showLoading = false;
    this.showLoadingSmall = true;

    if (companyId == 2) {
      this.defaultDeductableValues = 5000;
      //ACIGDeductableValue
    } else if (companyId == 8) {
      //medGulfDeductableValue
      this.defaultDeductableValues = 4000;
    } else if (companyId == 9) {
      //ArabianShieldDeductableValue
      this.defaultDeductableValues = 5000;
    } else {
      this.defaultDeductableValues = 2000;
    }

    if (this.activeComprehensive == true || companyId != 12) {
      this.requestOneGetQuots = this.http
        .get(
          environment.quotation +
            "/quote?" +
            "insuranceCompanyId=" +
            this.companyIDVAL +
            "&" +
            "qtRqstExtrnlId=" +
            this.quotationRequestExternalId +
            "&" +
            "parentRequestId=" +
            this.parentReqIdFromFE +
            "&" +
            "insuranceTypeCode=" +
            2 +
            "&" +
            "vehicleAgencyRepair=" +
            false +
            "&" +
            "deductibleValue=" +
            this.defaultDeductableValues
        )
        .subscribe(
          (res: any) => {
            this.counter++;
            if (res.errors != null) {
              this.showQuotationError = true;
              this.quotationServererror = res.errors[0].description;
              this.showLoadingSmall = false;
            } else {
              let responseArrayData = res.data;
              this.companyLogo = responseArrayData.insurancecompanyid;
              this.arrayOfData.push(responseArrayData);
              if (responseArrayData && responseArrayData.products.length > 0) {
                for (let i = 0; i < this.arrayOfData.length; i++) {
                
                  this.productsARR = this.arrayOfData;
                  this.showLoading = false;
                  this.prodCards = this.productsARR[i].products;
                  if (this.companyLogo == companyId) {
                    var companyLogos = this.productsARR.filter(
                      (x) => x.insurancecompanyKey == null
                    );
                    responseArrayData.insurancecompanyKey = key;
                    this.logoKey = responseArrayData.insurancecompanyKey;
                  }

                  this.data.setFirstProduct(this.productsARR[i].products[0]);
                  // this.selectedDeductableValue = this.productsARR[i].deductibleValuesList[0];
                  // this.changeDeductables(this.productsARR[i])
                }
                // debugger
                // var prodd = this.prodCards[0].productBenefits.filter((x) => x.isSelected == true && x.isReadOnly == true)
              
                var deductables = this.prodCards
                  .filter(
                    (x) => x.deductableValue != null || x.deductableValue != 0
                  )
                  .map((x) => x.deductableValue);
                responseArrayData.deductibleValuesList = deductables;
                for (let j = 0; j < this.prodCards.length; j++) {
                  this.loading[this.prodCards[j].id] = false;
                  this.showMoreBenfits[this.prodCards[j].id] = false;
                  this.hideMoreBenfits[this.prodCards[j].id] = true;
                }

                // debugger
                var testGrad = this.companiesGrade.filter(
                  (j) => j.CompanyId == companyId
                );
                if (testGrad.length > 0) {
                  for (let k = 0; k < this.productsARR.length; k++) {
                    var CompanyGrade = this.companiesGrade.filter(
                      (j) => j.CompanyId == companyId
                    )[0].Grade;
                    this.productsARR[k].autoLeasingBulkSelectedBenfits.push({
                      CompanyGrade: CompanyGrade,
                    });
                  }
                } else {
                  this.testVar = "NoGrade";
                }

                let custControl = new FormControl("");
                this.formdata.addControl(
                  "deductables" + companyId,
                  custControl
                );
                this.formdata.controls["deductables" + companyId].setValue(
                  responseArrayData.deductibleValuesList[0]
                );
                console.log(responseArrayData.deductibleValuesList[0]);
                this.isDone = false;
              }
              if (this.counter == this.companyCount) {
                this.isDone = true;
                this.showLoadingSmall = false;
              }
            }
          },
          (err) => {
            this.counter++;
            if (this.counter == this.companyCount) {
              this.isDone = true;
              this.showLoadingSmall = false;
            }
          }
        );
    }
    if (this.activeTPL == true) {
      this.requestTwoGetQuots = this.http
        .get(
          environment.quotation +
            "/quote?" +
            "insuranceCompanyId=" +
            this.companyIDVAL +
            "&" +
            "qtRqstExtrnlId=" +
            this.quotationRequestExternalId +
            "&" +
            "parentRequestId=" +
            this.parentReqIdFromFE +
            "&" +
            "insuranceTypeCode=" +
            1 +
            "&" +
            "vehicleAgencyRepair=" +
            false
        )
        .subscribe(
          (res: any) => {
            this.counterSecond++;
            if (res.errors != null) {
              this.showQuotationError = true;
              this.quotationServererror = res.errors[0].description;
              this.showLoadingSmall = false;
            } else {
              let responseArrayData = res.data;
              this.companyLogo = responseArrayData.insurancecompanyid;
              this.arrayOfData.push(responseArrayData);
              if (responseArrayData && responseArrayData.products.length > 0) {
                for (let i = 0; i < this.arrayOfData.length; i++) {    
                  this.productsARR = this.arrayOfData;
                  this.showLoading = false;
                  this.prodCards = this.productsARR[i].products;
                  if (this.companyLogo == companyId) {
                    var companyLogos = this.productsARR.filter(
                      (x) => x.insurancecompanyKey == null
                    );
                    responseArrayData.insurancecompanyKey = key;
                    this.logoKey = responseArrayData.insurancecompanyKey;
                  }
                  for (let j = 0; j < this.prodCards.length; j++) {
                    this.loading[this.prodCards[j].id] = false;
                    this.showMoreBenfits[this.prodCards[j].id] = false;
                    this.hideMoreBenfits[this.prodCards[j].id] = true;
                  }
                }
                if(companyId == 12)
                {
                  var deductables = this.prodCards.filter((x) => x.deductableValue != null || x.deductableValue != 0)
                  .map((x) => x.deductableValue);
                  
                  responseArrayData.deductibleValuesList = deductables;
                  responseArrayData.deductibleValuesList.splice(0, 1);
                  responseArrayData.deductibleValuesList.splice(0, 1);
                  let custControl = new FormControl("");
                  this.formdata.addControl(
                    "deductables" + companyId,
                    custControl
                  );
                  this.formdata.controls["deductables" + companyId].setValue(
                    responseArrayData.deductibleValuesList[0]
                  );
                  console.log(responseArrayData.deductibleValuesList[0]);
                }

                this.isDone = false;
              }
              if (this.counterSecond == this.companyCount) {
                this.isDone = true;
                this.showLoadingSmall = false;
              }
            }
          },
          (err) => {
            this.counterSecond++;
            if (this.counterSecond == this.companyCount) {
              this.isDone = true;
              this.showLoadingSmall = false;
            }
          }
        );
    }
  }

  AgencyRepair() {
    this.noCompaniesFound = false;
    this.showLoadingSmall = true;
    // this.showLoading = true;
    this.isDone = false;
    this.productsARR = [];
    this.arrayOfData = [];
    this.http
      .get(
        environment.portalUrl + "AdministrationApi/api/insurance-company/all",
        {}
      )
      .subscribe(
        (res: any) => {
          if (res.errors != null) {
            alert(res.errorDescription);
            console.log("Error occured");
            if (this.myLanguageCus != "English") {
              this.quotationServererror = "حدث خطأ";
            } else {
              this.quotationServererror = "Something went wrong";
            }
            //  this.showLoading = false;
          } else {
            if (res.data) {
              this.companiesList = res.data;
              this.companyCount = this.companiesList.length;
              for (let i = 0; i < this.companiesList.length; i++) {
                const companyIDVALue = this.companiesList[i].id;
                this.companyIDVAL = companyIDVALue;
                this.logo = this.companiesList[i].key;
                this.activeTPL = this.companiesList[i].isActiveTPL;
                this.activeComprehensive = this.companiesList[
                  i
                ].isActiveComprehensive;
                this.isActive = this.companiesList[i].isActive;
                if (this.isActive == true) {
                  this.getQuotationsAgencyRepair(this.companyIDVAL, this.logo);
                }
              }
            } else if (res.data.length == 0) {
              this.noCompaniesFound = true;
              this.showLoading = false;
            } else if (res.data.length < 0) {
              this.noCompaniesFound = true;
              this.showLoading = false;
            } else {
              this.noCompaniesFound = true;
              this.showLoading = false;
            }
          }
        },
        (err) => {
          this.showLoading = false;
          this.noCompaniesFound = true;
          console.log("error occured");
        }
      );
  }

  getQuotationsAgencyRepair(companyId, key) {
    this.counter = 0;
    this.counterSecond = 0;
    this.noCompaniesFound = false;
    this.isDone = false;
    this.showLoadingSmall = true;
    this.showLoading = false;
    if (this.activeTPL == true) {
      this.requestAgencyGetQuots = this.http
        .get(
          environment.quotation +
            "/quote?" +
            "insuranceCompanyId=" +
            this.companyIDVAL +
            "&" +
            "qtRqstExtrnlId=" +
            this.quotationRequestExternalId +
            "&" +
            "parentRequestId=" +
            this.parentReqIdFromFE +
            "&" +
            "insuranceTypeCode=" +
            1 +
            "&" +
            "vehicleAgencyRepair=" +
            true
        )
        .subscribe(
          (res: any) => {
            this.counterSecond++;
            if (res.errors != null) {
              this.showQuotationError = true;
              this.quotationServererror = res.errors[0].description;
              this.showLoadingSmall = false;
            } else {
              let responseArrayData = res.data;
              this.companyLogo = responseArrayData.insurancecompanyid;
              this.arrayOfData.push(responseArrayData);
              if (responseArrayData && responseArrayData.products.length > 0) {
                for (let i = 0; i < this.arrayOfData.length; i++) {
                  this.productsARR = this.arrayOfData;
                  this.prodCards = this.productsARR[i].products;
                  this.productsARR = this.productsARR.filter(
                    (x) => x.insuranceTypeCode == 2
                  );
                  this.companyDetailsPush.push(this.productsARR);
                  if (this.companyLogo == companyId) {
                    var companyLogos = this.productsARR.filter(
                      (x) => x.insurancecompanyKey == null
                    );
                    responseArrayData.insurancecompanyKey = key;
                    this.logoKey = responseArrayData.insurancecompanyKey;
                  }
                  for (let j = 0; j < this.prodCards.length; j++) {
                    this.loading[this.prodCards[j].id] = false;
                    this.showMoreBenfits[this.prodCards[j].id] = false;
                    this.hideMoreBenfits[this.prodCards[j].id] = true;
                  }
                }
              }
              if (this.counterSecond == this.companyCount) {
                this.isDone = true;
                this.showLoadingSmall = false;
              }
            }
          },
          (err) => {
            this.counterSecond++;
            if (this.counterSecond == this.companyCount) {
              this.isDone = true;
              this.showLoadingSmall = false;
            }
          }
        );
    }
    if (this.activeComprehensive == true) {
      this.requestAgencyWithDedctableGetQuots = this.http
        .get(
          environment.quotation +
            "/quote?" +
            "insuranceCompanyId=" +
            this.companyIDVAL +
            "&" +
            "qtRqstExtrnlId=" +
            this.quotationRequestExternalId +
            "&" +
            "parentRequestId=" +
            this.parentReqIdFromFE +
            "&" +
            "insuranceTypeCode=" +
            2 +
            "&" +
            "vehicleAgencyRepair=" +
            true +
            "&" +
            "deductibleValue=" +
            this.defaultDeductableValues
        )
        .subscribe(
          (res: any) => {
            this.counterSecond++;
            if (res.errors != null) {
              this.showQuotationError = true;
              this.quotationServererror = res.errors[0].description;
              this.showLoadingSmall = false;
            } else {
              let responseArrayData = res.data;
              this.companyLogo = responseArrayData.insurancecompanyid;
              this.arrayOfData.push(responseArrayData);
              if (responseArrayData && responseArrayData.products.length > 0) {
                for (let i = 0; i < this.arrayOfData.length; i++) {
                  this.productsARR = this.arrayOfData;
                  this.prodCards = this.productsARR[i].products;
                  this.productsARR = this.productsARR.filter(
                    (x) => x.insuranceTypeCode == 2
                  );
                  this.companyDetailsPush.push(this.productsARR);
                  if (this.companyLogo == companyId) {
                    var companyLogos = this.productsARR.filter(
                      (x) => x.insurancecompanyKey == null
                    );
                    responseArrayData.insurancecompanyKey = key;
                    this.logoKey = responseArrayData.insurancecompanyKey;
                  }
                  //  this.selectedDeductableValue = this.productsARR[i].deductibleValuesList[0];
                  // this.changeDeductables(this.productsARR[i])
                }
                var deductables = this.prodCards
                  .filter(
                    (x) => x.deductableValue != null || x.deductableValue != 0
                  )
                  .map((x) => x.deductableValue);
                responseArrayData.deductibleValuesList = deductables;

                for (let j = 0; j < this.prodCards.length; j++) {
                  this.loading[this.prodCards[j].id] = false;
                  this.showMoreBenfits[this.prodCards[j].id] = false;
                  this.hideMoreBenfits[this.prodCards[j].id] = true;
                }
              }
              if (this.counterSecond == this.companyCount) {
                this.isDone = true;
                this.showLoadingSmall = false;
              }
            }
          },
          (err) => {
            this.counterSecond++;
            if (this.counterSecond == this.companyCount) {
              this.isDone = true;
              this.showLoadingSmall = false;
            }
          }
        );
    }
  }

  WorkShopRepair() {
    this.noCompaniesFound = false;
    this.showLoadingSmall = true;
    // this.showLoading = true;
    this.counter = 0;
    this.counterSecond = 0;
    this.isDone = false;
    this.productsARR = [];
    this.arrayOfData = [];
    this.http
      .get(
        environment.portalUrl + "AdministrationApi/api/insurance-company/all",
        {}
      )
      .subscribe(
        (res: any) => {
          if (res.errors != null) {
            alert(res.errorDescription);
            console.log("Error occured");
            if (this.myLanguageCus != "English") {
              this.quotationServererror = "حدث خطأ";
            } else {
              this.quotationServererror = "Something went wrong";
            }
            this.showLoading = false;
          } else {
            if (res.data) {
              this.companiesList = res.data;
              this.companyCount = this.companiesList.length;
              for (let i = 0; i < this.companiesList.length; i++) {
                const companyIDVALue = this.companiesList[i].id;
                this.companyIDVAL = companyIDVALue;
                this.logo = this.companiesList[i].key;
                this.activeTPL = this.companiesList[i].isActiveTPL;
                this.activeComprehensive = this.companiesList[
                  i
                ].isActiveComprehensive;
                this.isActive = this.companiesList[i].isActive;
                if (this.isActive == true) {
                  this.getQuotationsWorkShopRepair(
                    this.companyIDVAL,
                    this.logo
                  );
                }
              }
            } else if (res.data.length == 0) {
              this.noCompaniesFound = true;
              this.showLoading = false;
            } else if (res.data.length < 0) {
              this.noCompaniesFound = true;
              this.showLoading = false;
            } else {
              this.noCompaniesFound = true;
              this.showLoading = false;
            }
          }
        },
        (err) => {
          this.showLoading = false;
          this.noCompaniesFound = true;
          console.log("error occured");
        }
      );
  }

  getQuotationsWorkShopRepair(companyId, key) {
    this.counter = 0;
    this.counterSecond = 0;
    this.noCompaniesFound = false;
    this.isDone = false;
    this.showLoading = false;
    this.showLoadingSmall = true;
    if (this.activeTPL == true) {
      this.requestWorkShopGetQuots = this.http
        .get(
          environment.quotation +
            "/quote?" +
            "insuranceCompanyId=" +
            this.companyIDVAL +
            "&" +
            "qtRqstExtrnlId=" +
            this.quotationRequestExternalId +
            "&" +
            "parentRequestId=" +
            this.parentReqIdFromFE +
            "&" +
            "insuranceTypeCode=" +
            1 +
            "&" +
            "vehicleAgencyRepair=" +
            false
        )
        .subscribe(
          (res: any) => {
            this.counterSecond++;
            if (res.errors != null) {
              this.showQuotationError = true;
              this.quotationServererror = res.errors[0].description;
              this.showLoadingSmall = false;
            } else {
              let responseArrayData = res.data;
              this.companyLogo = responseArrayData.insurancecompanyid;
              this.arrayOfData.push(responseArrayData);
              if (responseArrayData && responseArrayData.products.length > 0) {
                for (let i = 0; i < this.arrayOfData.length; i++) {
                  this.productsARR = this.arrayOfData;
                  this.prodCards = this.productsARR[i].products;
                  this.productsARR = this.productsARR.filter(
                    (x) => x.insuranceTypeCode == 2
                  );
                  this.companyDetailsPush.push(this.productsARR);
                  if (this.companyLogo == companyId) {
                    var companyLogos = this.productsARR.filter(
                      (x) => x.insurancecompanyKey == null
                    );
                    responseArrayData.insurancecompanyKey = key;
                    this.logoKey = responseArrayData.insurancecompanyKey;
                  }
                  for (let j = 0; j < this.prodCards.length; j++) {
                    this.loading[this.prodCards[j].id] = false;
                    this.showMoreBenfits[this.prodCards[j].id] = false;
                    this.hideMoreBenfits[this.prodCards[j].id] = true;
                  }
                }
              }
              if (this.counterSecond == this.companyCount) {
                this.isDone = true;
                this.showLoadingSmall = false;
              }
            }
          },
          (err) => {
            this.counterSecond++;
            if (this.counterSecond == this.companyCount) {
              this.isDone = true;
              this.showLoadingSmall = false;
            }
          }
        );
    }
    if (this.activeComprehensive == true) {
      this.requestTwoGetQuots = this.http
        .get(
          environment.quotation +
            "/quote?" +
            "insuranceCompanyId=" +
            this.companyIDVAL + "&" +
            "qtRqstExtrnlId=" +
            this.quotationRequestExternalId +
            "&" +
            "parentRequestId=" +
            this.parentReqIdFromFE +
            "&" +
            "insuranceTypeCode=" +
            2 +
            "&" +
            "vehicleAgencyRepair=" +
            false +
            "&" +
            "deductibleValue=" +
            this.defaultDeductableValues
        )
        .subscribe(
          (res: any) => {
            this.counterSecond++;
            if (res.errors != null) {
              this.showQuotationError = true;
              this.quotationServererror = res.errors[0].description;
              this.showLoadingSmall = false;
            } else {
              let responseArrayData = res.data;
              this.companyLogo = responseArrayData.insurancecompanyid;
              this.arrayOfData.push(responseArrayData);
              if (responseArrayData && responseArrayData.products.length > 0) {
                for (let i = 0; i < this.arrayOfData.length; i++) {
                  this.productsARR = this.arrayOfData;
                  this.prodCards = this.productsARR[i].products;
                  this.productsARR = this.productsARR.filter(
                    (x) => x.insuranceTypeCode == 2
                  );
                  this.companyDetailsPush.push(this.productsARR);
                  if (this.companyLogo == companyId) {
                    var companyLogos = this.productsARR.filter(
                      (x) => x.insurancecompanyKey == null
                    );
                    responseArrayData.insurancecompanyKey = key;
                    this.logoKey = responseArrayData.insurancecompanyKey;
                  }
                  //  this.selectedDeductableValue = this.productsARR[i].deductibleValuesList[0];
                  // this.changeDeductables(this.productsARR[i])
                }
                var deductables = this.prodCards
                  .filter(
                    (x) => x.deductableValue != null || x.deductableValue != 0
                  )
                  .map((x) => x.deductableValue);
                responseArrayData.deductibleValuesList = deductables;
                for (let j = 0; j < this.prodCards.length; j++) {
                  this.loading[this.prodCards[j].id] = false;
                  this.showMoreBenfits[this.prodCards[j].id] = false;
                  this.hideMoreBenfits[this.prodCards[j].id] = true;
                }
              }
              if (this.counterSecond == this.companyCount) {
                this.isDone = true;
                this.showLoadingSmall = false;
              }
            }
          },
          (err) => {
            this.counterSecond++;
            if (this.counterSecond == this.companyCount) {
              this.isDone = true;
              this.showLoadingSmall = false;
            }
          }
        );
    }
  }

  buyNowCheckOut(referenceId, productId, benfits) {
    this.benefits = benfits;
    for (var j = 0; j < this.benefits.length; j++) {
      if (this.benefits[j].isSelected == true) {
        this.includedBenfitId = this.benefits[j].id;
        this.SelectedProductBenfitId.push(this.includedBenfitId);
      }
    }
    console.log(this.SelectedProductBenfitId + "bbbbbbbbbb");
    this.loading[productId] = true;
    let myStorage = window.localStorage;
    this.myLoogedUser = myStorage.getItem("authenticatedUSer");
    $(".buy-now").attr("disabled", "disabled");
    this.selectedBenifitsToBuyNowAPI = this.NewBinifitList.filter(
      (x) => x.productNewId == productId
    ).map(function (a) {
      return a.bennifitId;
    });
    if (this.myLoogedUser) {
      let UserId = localStorage.getItem("UserId");
      this.http
        .post(environment.identity + "GetAccessToken", {
          UserId: UserId,
        })
        .subscribe(
          (res: any) => {
            if (res.ErrorCode != 1) {
              $(".buy-now").removeAttr("disabled");
              this.loading[productId] = false;
            } else {
              this.loading[productId] = true;
              this.accessToken = res.Result.access_token;
              localStorage.setItem("accessToken", this.accessToken);
              this.http
                .post(environment.checkout + "AddToCart", {
                  QuotaionRequestExternalId: this.quotationRequestExternalId,
                  ReferenceId: referenceId,
                  ProductId: productId,
                  SelectedProductBenfitId: this.SelectedProductBenfitId,
                  lang: this.langToBEAPIs,
                  Channel: "portal",
                })
                .subscribe(
                  (AddToCardres: any) => {
                    if (
                      AddToCardres.data.ErrorCode != 1 &&
                      AddToCardres.data.ErrorCode != 22
                    ) {
                      $(".buy-now").removeAttr("disabled");
                      this.loading[productId] = false;
                      this.showAddtoCardError = true;
                      this.showCheckoutDetailsError = false;
                      this.showQuotationError = false;
                      this.addtoCardServererror = AddToCardres.ErrorDescription;
                    } else if (AddToCardres.data.ErrorCode == 22) {
                      this._document.defaultView.location.reload();
                      $(".buy-now").removeAttr("disabled");
                    } else {
                      this.loading[productId] = true;
                      this.showAddtoCardError = false;
                      this.hashed = AddToCardres.data._hValue;
                      const req = this.http
                        .get(
                          environment.checkout +
                          "CheckoutDetails?" +
                          "ReferenceId=" +
                          referenceId +
                          "&" +
                          "QtRqstExtrnlId=" +
                          this.quotationRequestExternalId +
                          "&" +
                          "lang=" +
                          this.langToBEAPIs +
                          "&" +
                          "Channel=" +
                          "portal" +
                          "&" +
                          "ProductId=" +
                          productId +
                          "&" +
                          "hashed=" +
                          this.hashed +
                          "&" +
                          "selectedProductBenfitId=" +
                          this.SelectedProductBenfitId
                        )
                        .subscribe(
                          (res: any) => {
                            if (res.data.ErrorCode != 1) {
                              $(".buy-now").removeAttr("disabled");
                              this.loading[productId] = false;
                              this.showCheckoutDetailsError = true;
                              this.showAddtoCardError = false;
                              this.showQuotationError = false;
                              this.checkoutDetailsServererror =
                                res.data.ErrorDescription;
                            } else {
                              $(".buy-now").removeAttr("disabled");
                              this.loading[productId] = true;
                              localStorage.setItem(
                                "checkOutDetailsData",
                                JSON.stringify(res.data)
                              );
                              console.log(res.data);
                              this.checkoutData.checkoutDetails(res.data);
                              this.router.navigate(["/checkout"]);
                            }
                          },
                          (err) => {
                            $(".buy-now").removeAttr("disabled");
                            console.log("Error occured");
                          }
                        );
                    }
                  },
                  (err) => {
                    console.log("Error occured");
                    $(".buy-now").removeAttr("disabled");
                  }
                );
            }
          },
          (err) => {
            console.log("Error occured");
          }
        );
    } else {
      const mediaQuery = window.matchMedia("(max-width: 480px)");
      if (mediaQuery.matches) {
        this.checkoutData.setCheckoutParameters([
          this.langToBEAPIs,
          referenceId,
          this.quotationRequestExternalId,
          productId,
          this.SelectedProductBenfitId,
        ]);
        this.openPpUpInMobile = true;
        this.openPpUpInweb = false;
        this.checkoutData.setCheckoutParameters([
          this.langToBEAPIs,
          referenceId,
          this.quotationRequestExternalId,
          productId,
          this.SelectedProductBenfitId,
        ]);
      } else {
        this.openPpUpInMobile = false;
        this.openPpUpInweb = true;
        this.checkoutData.setCheckoutParameters([
          this.langToBEAPIs,
          referenceId,
          this.quotationRequestExternalId,
          productId,
          this.SelectedProductBenfitId,
        ]);
      }
    }
  }
  copyUrl() {
    var dummy = document.createElement("input"),
      text = window.location.href;
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
  }

  closeLoginPopup() {
    this.openPpUpInMobile = false;
  }

  closeLoginPopupInWeb() {
    this.openPpUpInweb = false;
  }

  checkLogin() {
    this.showLogin = true;
    this.showReg = false;
    this.checkLoginLabel = false;
    this.checkRegLabel = true;
    $('.flower-bg').removeClass('custom-float-left')
    $('.logo-size').removeClass('custom-float-left')
    $('.flower-bg').addClass('custom-float-right')
    $('.logo-size').addClass('custom-float-right')
  }
  checkReg() {
    this.showLogin = false;
    this.showReg = true;
    this.checkLoginLabel = true;
    this.checkRegLabel = false;
    $('.flower-bg').removeClass('custom-float-right')
    $('.logo-size').removeClass('custom-float-right')
    $('.flower-bg').addClass('custom-float-left')
    $('.logo-size').addClass('custom-float-left')
  }
}