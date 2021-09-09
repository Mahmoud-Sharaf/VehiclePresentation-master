import { ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { DOCUMENT } from "@angular/common";
import { Inject } from "@angular/core";
import { Router } from "@angular/router";
import { ShareDataService } from "../../../services/share-data.service";
import { DateAdapter } from "@angular/material";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.prod";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
 
  curLang: any;
  mycurrentLangu: any;
  myLoogedUser: any;
  displayUSer = false;
  lang = "arabic";
  langCheckerAr = true;
  langCheckerEn = false;
  showProfileTab = false;
  showLogin = true;
  showReg = false;
  checkLoginLabel = false;
  checkRegLabel = true;
  openPpUpInMobile: any;
  openPpUpInweb: any;
  @Input() screenTitleEn : String;
  @Input() screenTitleAr : String;


  constructor(
    private data: ShareDataService,
    private translateService: TranslateService,
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private dateAdapter: DateAdapter<any>,
    private http: HttpClient,
    private cdRef: ChangeDetectorRef,
    @Inject(DOCUMENT) private _document: Document
  ) {
    this.setArabicCalendar();
    let myStorage = window.localStorage;
    this.mycurrentLangu = myStorage.getItem("currentLanguage");
    this.translateService.setDefaultLang(this.mycurrentLangu);
    let htmlTag = this.document.getElementsByTagName(
      "html"
    )[0] as HTMLHtmlElement;
    htmlTag.dir = this.mycurrentLangu === "Arabic" ? "rtl" : "ltr";
    this.changeCssFile(this.mycurrentLangu);
  }

  setArabicCalendar() {
    this.dateAdapter.setLocale("ar");
  }
  setEnglishCalendar() {
    this.dateAdapter.setLocale("en");
  }

  changeLangage(lang: string) {
    if (lang == "Arabic") {
      this.langCheckerAr = false;
      this.langCheckerEn = true;
      // return
    } else if (lang == "English") {
      this.langCheckerAr = true;
      this.langCheckerEn = false;
      // return
    }
    let htmlTag = this.document.getElementsByTagName(
      "html"
    )[0] as HTMLHtmlElement;
    htmlTag.dir = lang === "Arabic" ? "rtl" : "ltr";
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
    this.changeCssFile(lang);
    this.data.changeCurrentLanguage(lang);
    let myStorage = window.localStorage;
    myStorage.setItem("currentLanguage", lang);
    if (lang == "Arabic") {
      this.setArabicCalendar();
    } else {
      this.setEnglishCalendar();
    }
  }
  changeCssFile(lang: string) {
    let headTag = this.document.getElementsByTagName(
      "head"
    )[0] as HTMLHeadElement;
    let existingLink = this.document.getElementById(
      "langCss"
    ) as HTMLLinkElement;

    let bundleName = lang === "Arabic" ? "arabicStyle.css" : "englishStyle.css";

    if (existingLink) {
      existingLink.href = bundleName;
    } else {
      let newLink = this.document.createElement("link");
      newLink.rel = "stylesheet";
      newLink.id = "langCss";
      newLink.href = bundleName;
      headTag.appendChild(newLink);
    }
  }
  ngAfterViewChecked() {
    let myStorage = window.localStorage;

    this.myLoogedUser = myStorage.getItem("authenticatedUSer");

    if (this.myLoogedUser == null) {
      this.displayUSer = false;
    } else {
      this.displayUSer = true;

      this.myLoogedUser = myStorage.getItem("authenticatedUSer");
    }
    this.cdRef.detectChanges();
  }
  ngOnInit() {
    $('.flower-bg').addClass('custom-float-right')
    $('.logo-size').addClass('custom-float-right')
    const mediaQuery = window.matchMedia("(max-width: 480px)");
    if (mediaQuery.matches) {
      $('.flower-bg').addClass('custom-float-right')
      $('.logo-size').addClass('custom-float-right')
    }
    let loggedInUser = localStorage.getItem("authenticatedUSer");
    if (loggedInUser != null) {
      this.showProfileTab = true;
    } else {
      this.showProfileTab = false;
    }

    $(".menu-btn").click(function () {
      $("#nav-home").toggleClass("activeX");
      //
    });
    $(".close-btn").click(function () {
      $("#nav-home").removeClass("activeX");
    });

    $(".menu-btn").click(function () {
      $("#testID").toggleClass("activeX");
      //
    });
    $(".close-btn").click(function () {
      $("#testID").removeClass("activeX");
    });

    // $('body').click(function (event) {
    //   if (!$(event.target).is('.menu-btn')) {
    //     $('#nav-home').removeClass("active");
    //   }
    // });

    /***************/

    let myStorage = window.localStorage;

    this.myLoogedUser = myStorage.getItem("authenticatedUSer");
    if (this.mycurrentLangu == "English") {
      this.changeLangage("English");
    } else if (this.mycurrentLangu == "Arabic") {
      this.changeLangage("Arabic");
    } else {
      this.changeLangage("English");
    }

    // this.formdata = this.fb.group({
    //   email: new FormControl("", [Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]),
    //  password: new FormControl("", Validators.required),
    //  });

    // let VehicleDetailsFrmQuotPage = localStorage.getItem('VehicleDetailsFrmQuotPage');
    // if(VehicleDetailsFrmQuotPage){
    //   // alert(VehicleDetailsFrmQuotPage);
    //   this.VehicleDetailsFrmQuotPageX = VehicleDetailsFrmQuotPage;
    // }
  }

  logOut() {
    window.localStorage.removeItem("authenticatedUSer");
    window.localStorage.removeItem("userToken");
    localStorage.clear();
    localStorage.setItem("currentLanguage", "Arabic");
    this.displayUSer = false;
    this._document.defaultView.location.reload();
    this.router.navigate(["/"]);
  }

  goTopersonalAcc() {
    let UserId = localStorage.getItem("UserId");
    if (UserId == null) {
      this.router.navigate(["/account-g"]);
    } else {
      this.router.navigate(["/profile"]);
    }
  }

  goToHomePage() {
    this.router.navigate(["/"]);
  }

  goToTermsconditions() {
    this.router.navigate(["/termsandconditions"]);
  }

  goToPrivacyPolicy() {
    this.router.navigate(["/privacy-policy"]);
  }

  goTopPrintPolicy() {
    this.router.navigate(["/print-policy"]);
  }

  goToContactUs() {
    this.router.navigate(["/contact-us"]);
  }

  goToEmployment() {
    this.router.navigate(["/careers"]);
  }

  goToAboutus() {
    this.router.navigate(["/about-us"]);
  }

  loginPage() {
    this.router.navigate(["/login"]);
  }

  openLoginPopup() {
    this.openPpUpInMobile = true;
    this.openPpUpInweb = false;
  }

  closeLoginPopup() {
    this.openPpUpInMobile = false;
    this.openPpUpInweb = false;
  }

  openLoginPopupInWeb() {
    this.openPpUpInweb = true;
    this.openPpUpInMobile = false;
  }

  closeLoginPopupInWeb() {
    this.openPpUpInweb = false;
    this.openPpUpInMobile = false;
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
    const mediaQuery = window.matchMedia("(max-width: 480px)");
    if (mediaQuery.matches) {
      $('.flower-bg').removeClass('custom-float-left')
    $('.logo-size').removeClass('custom-float-left')
    $('.flower-bg').addClass('custom-float-right')
    $('.logo-size').addClass('custom-float-left')
    }
 

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
    const mediaQuery = window.matchMedia("(max-width: 480px)");
    if (mediaQuery.matches) {
      $('.flower-bg').removeClass('custom-float-right')
      $('.logo-size').removeClass('custom-float-right')
      $('.flower-bg').addClass('custom-float-left')
      $('.logo-size').addClass('custom-float-right')
    }
    
  }

  goToProfile() {
    let UserId = localStorage.getItem("UserId");
    if (UserId == null) {
      this.openPpUpInMobile = true;
    } else {
      this.router.navigate(["/profile"]);
    }
  }
}
