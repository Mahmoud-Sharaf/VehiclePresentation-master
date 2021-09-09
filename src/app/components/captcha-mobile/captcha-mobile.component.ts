import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { environment } from "src/environments/environment.prod";
import { Observable, Observer, pipe, timer } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-captcha-mobile",
  templateUrl: "./captcha-mobile.component.html",
  styleUrls: ["./captcha-mobile.component.css"],
  providers: [],
})
export class CaptchaMobileComponent implements OnInit {
  visability: any;
  captchaImgPath: any;
  @Input() CaptchaFormMobile;
  @ViewChild(CaptchaMobileComponent, { static: true })
  captchaComponent: CaptchaMobileComponent;
  constructor(private http: HttpClient) {}
  ngOnInit() {
    localStorage.removeItem("captchaInputTOKENMobile");
    localStorage.removeItem("captchaInputImgMobile");
    this.visability = false;
    this.getCaptchaIMG();
    timer(600000).subscribe(() => {
      this.visability = true;
      $(".icon-refresh").addClass("animated pulse infinite animatespan");
      $(".captchImg").addClass("shakeImage");
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

  getCaptchaIMG() {
    console.log("dddddddddd");
    this.http.get(environment.identity + "captcha", {}).subscribe(
      (res: any) => {
        let myarray = res;
        this.captchaImgPath = res.data.image;
        let myStorage = window.localStorage;
        myStorage.setItem("captchaInputTOKENMobile", res.data.token);
      },
      (err) => {}
    );
    this.visability = false;
    $(".icon-refresh").removeClass("animated pulse infinite animatespan");
    $(".captchImg").removeClass("shakeImage");
  }
  captchTXTSav(e) {
    console.log(e.target["value"]);
    let captchaTXT = e.target["value"];
    let myStorage = window.localStorage;
    myStorage.setItem("captchaInputImgMobile", captchaTXT);
  }
}
