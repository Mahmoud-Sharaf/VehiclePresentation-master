import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-promotion-programs',
  templateUrl: './promotion-programs.component.html',
  styleUrls: ['./promotion-programs.component.css']
})
export class PromotionProgramsComponent implements OnInit {

  constructor(private http: HttpClient) { }
  promotionPrograms:any;
  typeIDPromo: any;
  WorkPlace;
  joinPromoTrue = false;
  responseMessages:any;
  @ViewChildren("boxes") private boxes: QueryList<ElementRef>;
  ngOnInit() {
    this.getAllPromotionPrograms();
  }


  
  getAllPromotionPrograms() {
    this.http.get(environment.promotionProg + "/promotion-programs",).subscribe(
      (res: any) => {
        console.log(res);
        // if (res.ErrorCode != 1) {
        // } else {
          this.promotionPrograms = res;
        // }
      })
  };

  showJoinMode(promoID,indx){
    let nativeElement = this.boxes.toArray()[indx].nativeElement;
    nativeElement.style.display =
      nativeElement.style.display === "none" || !nativeElement.style.display
        ? "block"
        : "block";
  }
  
  joinToPromo(promoID)
  {

   let userId = localStorage.getItem("UserId");
    let req = this.http.get(environment.profile + "join-programs?promotionProgramId="+ promoID
    +"&"+ "currentUserId="+ userId
    +"&"+ "userEmail="+ this.WorkPlace
    +"&"+ "lang=ar").subscribe(
      (res: any) => {
        if (res.ErrorCode != 1) {
          this.responseMessages = res.ErrorDescription;
        } else {
          this.responseMessages = res.ErrorDescription;
        }
      },
      err => {
        console.log("Error occured");
      })
  }

}
