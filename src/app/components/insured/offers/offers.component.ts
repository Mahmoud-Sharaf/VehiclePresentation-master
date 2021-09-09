import { HttpClient } from "@angular/common/http";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment.prod";
import * as FileSaver from "file-saver";

@Component({
  selector: "app-offers",
  templateUrl: "./offers.component.html",
  styleUrls: ["./offers.component.css"],
})
export class OffersComponent implements OnInit {
  checkOptions = true;
  postWork = true;
  idNumber = false;
  codePromotion = false;
  uploadCardNumber = false;
  promotionPrograms: any;
  typeIDPromo: any;
  WorkPlace;
  promotionVal;
  nationalIDNum;
  promotionTxt;
  responseMessages: any;
  responseMessagesSuccess: any;
  promoCheck = false;
  nationalID: any;
  files: string[] = [];
  showFile = false;
  numField = 0;
  maxField = 5;
  myLanguageCus: any;
  mycurrentLangu: any;
  langToBEAPIs: any;
  promotionProgram: any;
  promotionCodeVal: any;
  ifNotExist: any;
  joinedBefore: any;
  servererror = "";
  showErrorServer: any;
  promotionValForUploadCard: any;
  showErrDesc = false;
  showSeccussDesc = false;
  promotionName: any;
  imageSrc: string = "";
  uploadedFileName: any;

  constructor(private http: HttpClient, private cdRef: ChangeDetectorRef) {}
  ngOnInit() {
    this.nationalID = localStorage.getItem("nationalID");
    this.getPromoCodesCheck();
  }

  handleInputChange(e) {
    console.log("input change");
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    // var pattern = /image-*/;
    var reader = new FileReader();
    // if (!file.type.match(pattern)) {
    //     alert('invalid format');
    //     return;
    // }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
    console.log(file);
    this.uploadedFileName = file;
  }
  _handleReaderLoaded(e) {
    var reader = e.target;
    this.imageSrc = reader.result;
    console.log(this.imageSrc);
  }

  ngAfterViewChecked() {
    let myStorage = window.localStorage;
    this.mycurrentLangu = myStorage.getItem("currentLanguage");
    this.myLanguageCus = this.mycurrentLangu;
    if (this.myLanguageCus == "English") {
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

  allowOnlyChar(e) {
    let input;

    if (e.which >= 65) {
      return true;
    }

    if (e.which < 65) {
      return false;
    }

    if (97 <= e.which && e.which <= 122) {
      return true;
    }

    input = String.fromCharCode(e.which);
    return !!/[\d\s]/.test(input);
  }

  checkRadio() {
    $(".options .orange-radio").click(function () {
      $(".options .orange-radio").removeClass("responsive-active");
      $(this).toggleClass("responsive-active");
    });
  }
  showOptions(mode) {
    this.responseMessages = "";
    this.responseMessagesSuccess = "";
    if (mode == "postWork") {
      this.postWork = true;
      this.idNumber = false;
      this.codePromotion = false;
      this.uploadCardNumber = false;
    } else if (mode == "idNumber") {
      this.typeIDPromo = 1;
      this.getAllPromotionProgramsByTypeId();
      this.postWork = false;
      this.idNumber = true;
      this.codePromotion = false;
      this.uploadCardNumber = false;
    } else if (mode == "codePromotion") {
      this.typeIDPromo = 0;
      this.postWork = false;
      this.idNumber = false;
      this.codePromotion = true;
      this.uploadCardNumber = false;
    } else if (mode == "uploadCardNumber") {
      this.typeIDPromo = 2;
      this.getAllPromotionProgramsByTypeId();
      this.postWork = false;
      this.idNumber = false;
      this.codePromotion = false;
      this.uploadCardNumber = true;
    }
  }
  closePromo() {
    this.checkOptions = true;
    this.postWork = true;
    this.idNumber = false;
    this.codePromotion = false;
    this.uploadCardNumber = false;
  }

  getAllPromotionProgramsByTypeId() {
    this.http
      .get(
        environment.promotions +
          "/promotion-programsByTypeId?typeId=" +
          this.typeIDPromo +
          "&channel=portal&lang=en"
      )
      .subscribe((res: any) => {
        console.log(res);
        if (res.ErrorCode != 1) {
        } else {
          this.promotionPrograms = res.Result;
        }
      });
  }
  confirm() {
    let emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    emailPattern.test(this.WorkPlace);
    this.responseMessages = "";
    if (this.WorkPlace == null || !emailPattern.test(this.WorkPlace)) {
      this.showErrDesc = true;
      if (this.myLanguageCus == "English") {
        this.responseMessages = "Enter Valid Email";
      } else {
        this.responseMessages = "الرجاء إدخال بريد إلكتروني صحيح";
      }
      return;
    } else {
      this.showErrDesc = false;
      this.responseMessages = "";
      let req = this.http
        .post(environment.profile + "join-program-new", {
          UserEmail: this.WorkPlace,
          Nin: this.nationalID,
          Channel: "portal",
          Lang: "ar",
          JoinTypeId: 0,
        })
        .subscribe(
          (res: any) => {
            if (res.ErrorCode != 1) {
              this.showErrDesc = true;
              this.showSeccussDesc = false;
              this.responseMessages = res.ErrorDescription;
            } else {
              this.showErrDesc = false;
              this.showSeccussDesc = true;
              this.responseMessagesSuccess = res.ErrorDescription;
            }
          },
          (err) => {
            console.log("Error occured");
          }
        );
    }
  }

  confirmByNIN() {
    this.responseMessages = "";
    console.log(this.WorkPlace);
    let req = this.http
      .post(environment.profile + "join-program-new", {
        Nin: this.nationalIDNum,
        Channel: "portal",
        Lang: "ar",
        ProgramId: this.promotionVal,
        JoinTypeId: 1,
      })
      .subscribe(
        (res: any) => {
          if (res.ErrorCode != 1) {
            this.showErrDesc = true;
            this.showSeccussDesc = false;
            this.responseMessages = res.ErrorDescription;
          } else {
            this.showErrDesc = false;
            this.showSeccussDesc = true;
            this.responseMessagesSuccess = res.ErrorDescription;
          }
        },
        (err) => {
          console.log("Error occured");
        }
      );
  }

  confirmCodePromotion(promotionCode) {
    this.promotionCodeVal = promotionCode;
  }

  promotionUploadCard(event) {
    this.promotionName = event.Name;
  }

  confirmAttach() {
    this.responseMessages = "";
    console.log(this.WorkPlace);
    let req = this.http
      .post(environment.profile + "join-program-new", {
        Nin: this.nationalID,
        Channel: "portal",
        Lang: "ar",
        ProgramId: this.promotionValForUploadCard,
        ProgramName: this.promotionName,
        FileBase64String: this.imageSrc.substring(
          this.imageSrc.lastIndexOf(",") + 1
        ),
        FileName: this.uploadedFileName.name,
        FileExt: this.uploadedFileName.type.substring(
          this.uploadedFileName.type.lastIndexOf("/") + 1
        ),
        FileSize: this.uploadedFileName.size,
        JoinTypeId: 2,
      })
      .subscribe(
        (res: any) => {
          if (res.ErrorCode != 1) {
            this.showErrDesc = true;
            this.showSeccussDesc = false;
            this.responseMessages = res.ErrorDescription;
          } else {
            this.showErrDesc = false;
            this.showSeccussDesc = true;
            this.responseMessagesSuccess = res.ErrorDescription;
          }
        },
        (err) => {
          console.log("Error occured");
        }
      );
  }

  getPromoCodesCheck() {
    this.mycurrentLangu = window.localStorage.getItem("currentLanguage");
    this.myLanguageCus = this.mycurrentLangu;
    let NIN = localStorage.getItem("nationalID");
    if (this.myLanguageCus == "English") {
      this.langToBEAPIs = "en";
    } else {
      this.langToBEAPIs = "ar";
    }

    this.http
      .post(environment.promotions + "/promotion-program-checkEnrolled", {
        Nin: this.nationalID,
        Channel: "portal",
        Lang: this.langToBEAPIs,
      })
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res.ErrorCode != 1) {
            //  this.showErrorServer = true;
            //  this.servererror =  res.ErrorDescription;
            this.ifNotExist = true;
            this.joinedBefore = false;
          } else {
            //   this.showErrorServer = false;
            this.promotionProgram = res.Result;
            this.ifNotExist = false;
            this.joinedBefore = true;
          }
        },
        (err) => {
          console.log("Error occured");
        }
      );
  }
}
