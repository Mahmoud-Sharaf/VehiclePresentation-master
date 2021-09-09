import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formtemplate',
  templateUrl: './formtemplate.component.html',
  styleUrls: ['./formtemplate.component.css']
})
export class FormtemplateComponent implements OnInit {

  hijriMonthsAr = [
    { id: 1, value: "1 -محرم" },
    { id: 2, value: "2 -صفر" },
    { id: 3, value: "3 -ربيع الأول" },
    { id: 4, value: "4 -ربيع الثاني" },
    { id: 5, value: "5 -جمادي الأول" },
    { id: 6, value: "6 -جمادي الثاني" },
    { id: 7, value: "7 -رجب" },
    { id: 8, value: "8 -شعبان" },
    { id: 9, value: "9 -رمضان" },
    { id: 10, value: "10 -شوال" },
    { id: 11, value: "11 -ذو القعدة" },
    { id: 12, value: "12 -ذو الحجة" },
  ];
  addingDriverChecker = true;
  otherDriverChecker = false;
  constructor() {}

  ngOnInit() {}

  changeToOtherDriver() {
    this.otherDriverChecker = true;
    this.addingDriverChecker = false;
  }
  changeToAddDriver() {
    this.otherDriverChecker = false;
    this.addingDriverChecker = true;
  }
}

