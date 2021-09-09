import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  Inject,
  ChangeDetectorRef,
} from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { DOCUMENT } from "@angular/common";
import { ShareDataService } from "src/app/services/share-data.service";
import { TranslateService } from "@ngx-translate/core";
import { EventEmitterService } from "src/app/core/events/eventEmitter";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.prod";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.css"],
})
export class HomepageComponent implements OnInit {
  accessToken: any;
  cardsViewMode = true;
  firstCard = false;
  secondCard = false;
  thirdCard = false;
  fourthCard = false;
  fifthCard = false;
  sixCard = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getAccessToken();
  }
  showCard(item) {
    if (item == "firstCard") {
      this.firstCard = true;
      this.secondCard = false;
      this.thirdCard = false;
      this.fourthCard = false;
      this.fifthCard = false;
      this.sixCard = false;
      this.cardsViewMode = false;
    } else if (item == "secondCard") {
      this.firstCard = false;
      this.secondCard = true;
      this.thirdCard = false;
      this.fourthCard = false;
      this.fifthCard = false;
      this.sixCard = false;
      this.cardsViewMode = false;
    } else if (item == "thirdCard") {
      this.firstCard = false;
      this.secondCard = false;
      this.thirdCard = true;
      this.fourthCard = false;
      this.fifthCard = false;
      this.sixCard = false;
      this.cardsViewMode = false;
    } else if (item == "fourthCard") {
      this.firstCard = false;
      this.secondCard = false;
      this.thirdCard = false;
      this.fourthCard = true;
      this.fifthCard = false;
      this.sixCard = false;
      this.cardsViewMode = false;
    } else if (item == "fourthCard") {
      this.firstCard = false;
      this.secondCard = false;
      this.thirdCard = false;
      this.fourthCard = true;
      this.fifthCard = false;
      this.sixCard = false;
      this.cardsViewMode = false;
    } else if (item == "fifthCard") {
      this.firstCard = false;
      this.secondCard = false;
      this.thirdCard = false;
      this.fourthCard = false;
      this.fifthCard = true;
      this.sixCard = false;
      this.cardsViewMode = false;
    } else if (item == "sixCard") {
      this.firstCard = false;
      this.secondCard = false;
      this.thirdCard = false;
      this.fourthCard = false;
      this.fifthCard = false;
      this.sixCard = true;
      this.cardsViewMode = false;
    }
  }
  hideAll() {
    this.firstCard = false;
    this.secondCard = false;
    this.thirdCard = false;
    this.fourthCard = false;
    this.fifthCard = false;
    this.sixCard = false;
    this.cardsViewMode = true;
  }
  //get access token
  getAccessToken() {
    let UserId = localStorage.getItem("UserId");
    if (UserId == null) {
      UserId = "00000000-0000-0000-0000-000000000000";
    }

    this.http
      .post(environment.identity + "GetAccessToken", {
        UserId: UserId,
      })
      .subscribe(
        (res: any) => {
          this.accessToken = res.Result.access_token;
          localStorage.setItem("accessToken", this.accessToken);
        },
        (err) => {
          console.log("Error occured");
        }
      );
  }
}
