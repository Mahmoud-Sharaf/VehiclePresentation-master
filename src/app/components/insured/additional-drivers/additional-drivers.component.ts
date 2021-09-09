import {Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef} from "@angular/core";
import { FormGroup, FormBuilder , FormArray, FormControl} from '@angular/forms';
import { ShareDataService } from 'src/app/services/share-data.service';
import { EventEmitterService } from 'src/app/core/events/eventEmitter';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';



@Component({
  selector: "app-additional-drivers",
  templateUrl: "./additional-drivers.component.html",
  styleUrls: ["./additional-drivers.component.css"]
})
export class AdditionalDriversComponent implements OnInit {
  relationsShips:any;
  licenseYearsList:any;
  violations:any;
  allCities:any;
  allCountries:any;
  kilometers:any;
  @Input() isEditMode: boolean;
  @Input() formdataDrivers: FormGroup;
  @Input() index;
  @Output() messageToEmit = new EventEmitter<[][]>();
  multiDriversArray = [];
  addNewDriversContainer;
  addNewDriver;
  showViolations = false;
  medicalConditions:any;
  gregorianMonthsAr = [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر"
  ];
  gregorianMonthsEn = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  hijriMonthsAr = [
    { "id": 1, "value": "1 -محرم" },
    { "id": 2, "value": "2 -صفر" },
    { "id": 3, "value": "3 -ربيع الأول" },
    { "id": 4, "value": "4 -ربيع الثاني" },
    { "id": 5, "value": "5 -جمادي الأول" },
    { "id": 6, "value": "6 -جمادي الثاني" },
    { "id": 7, "value": "7 -رجب" },
    { "id": 8, "value": "8 -شعبان" },
    { "id": 9, "value": "9 -رمضان" },
    { "id": 10, "value": "10 -شوال" },
    { "id": 11, "value": "11 -ذو القعدة" },
    { "id": 12, "value": "12 -ذو الحجة" }

  ];
  hijriMonthsEn = [
    { "id": 1, "value": "1- Muharram" },
    { "id": 2, "value": "2- Safar" },
    { "id": 3, "value": "3- Rabi’ al-awal" },
    { "id": 4, "value": "4- Rabi’ al-thani" },
    { "id": 5, "value": "5- Jumada al-awal" },
    { "id": 6, "value": "6- Jumada al-thani" },
    { "id": 7, "value": "7- Rajab" },
    { "id": 8, "value": "8- Sha’aban" },
    { "id": 9, "value": "9- Ramadan" },
    { "id": 10, "value": "10- Shawwal" },
    { "id": 11, "value": "11- Duh al-Qidah" },
    { "id": 12, "value": "12- Duh al-Hijjah" }];
  meladiMonthsAr = [
    { "id": 1, "value": "1 - يناير" },
    { "id": 2, "value": "2 -فبراير" },
    { "id": 3, "value": "3 -مارس" },
    { "id": 4, "value": "4 -ابريل" },
    { "id": 5, "value": "5 -مايو" },
    { "id": 6, "value": "6 -يونيو" },
    { "id": 7, "value": "7 -يوليو" },
    { "id": 8, "value": "8 -اغسطس" },
    { "id": 9, "value": "9 -سبتمبر" },
    { "id": 10, "value": "10 -اكتوبر" },
    { "id": 11, "value": "11 -نوفمبر" },
    { "id": 12, "value": "12 -ديسيمبر" },

  ];
  meladiMonthsEN = [
    { "id": 1, "value": "1- Jan" },
    { "id": 2, "value": "2- Feb" },
    { "id": 3, "value": "3- Mar" },
    { "id": 4, "value": "4- Apr" },
    { "id": 5, "value": "5- May" },
    { "id": 6, "value": "6- Jun" },
    { "id": 7, "value": "7- Jul" },
    { "id": 8, "value": "8- Aug" },
    { "id": 9, "value": "9- Sep" },
    { "id": 10, "value": "10- Oct" },
    { "id": 11, "value": "11- Nov" },
    { "id": 12, "value": "12- Dec" }
  ];
  testAr = [];
  showAddDriverForm = true;
  selectedMont: any;
  currentYear: number = new Date().getFullYear();
  langToBEAPIs: any;
  lang: any;
  months;
  years: any[] = [];
  meladiyears: any[] = [];
  minYears: number = Math.round((this.currentYear - 622) * (33 / 32)) - 112;
  maxYears: number = Math.round((this.currentYear - 622) * (33 / 32)) - 0;
  educationCodes;
  medicalCondations;
  violationsCodes;
  childrenCountAr = [
    { id: 0, name: "0" },
    { id: 1, name: "1" },
    { id: 2, name: "2" },
    { id: 3, name: "3" },
    { id: 4, name: "4" },
    { id: 5, name: "5 او اكثر " }
  ];
  childrenCountEn = [
    { id: 0, name: "0" },
    { id: 1, name: "1" },
    { id: 2, name: "2" },
    { id: 3, name: "3" },
    { id: 4, name: "4" },
    { id: 5, name: "5 or more " }
  ];
  
  drivingPercentageList = [
    { id: 0, name: "25%"},
    { id: 1, name: "50%" },
    { id: 2, name: "75%" },
    { id: 3, name: "100%" },
  ];
  myLanguageCus: any;
  accordionIsActive = true;
  childrenCountError;
  localDrivingPercentageList;
  numberOfAccidentLast5YearsList;
  isHomeCitySameAsWorkCity = true;
  cities;
  countries;
  licenseYearsLookup;
  isEditDriver = false;
  ninRequired = false;
  mycurrentLangu: any;
  birthMonthRequired = false;
  birthYearRequired = false;
  drivingPercentageError = false;
  @Input() hijrimonth;
  @Input() hijriyear;
  @Input() meladimonth;
  driversForm: boolean;
  educationLVL: any;
  NumberOfAccident: any;
  medicalCondition: any;
  eduLVLSelected: any;
  mainDriverDrivingPErcentage: any;
  firstCharacterCheck: any;
  showHijriCalendar = true;
  showMeladiCalendar = false;
  nonSaudiMElai: any[] = [];
  minNonSaudiMeladi: number = Math.round((this.currentYear) * (33 / 32)) - 163;
  maxNonSaudiMeladi: number = Math.round((this.currentYear) * (33 / 32)) - 63;
  meladiyear: any;
  nonSaudiMeladi: any;
  customFullDate: any;
  selectedYearr: any;
  customDay: any;
  numberOfAccidentLast5YearsRange:any;
  minmeladiYears: number = Math.round((this.currentYear) * (33 / 32)) - 123;
  maxmeladiYears: number = Math.round((this.currentYear) * (33 / 32));
  currentYyear: number = new Date().getFullYear();
  currentMmonth: number = new Date().getMonth() + 1;
  currentDday: number = new Date().getDay() + 1;
  maxcurrentYyear: number = new Date().getFullYear();
  maxcurrentMmonth: number = new Date().getMonth() + 4;
  maxcurrentDday: number = new Date().getDay() + 1;
  currentMmonth1: number = new Date().getMonth() + 1;
  currentDday1: number = new Date().getDay() + 1;
  maxcurrentMmonth1: number = new Date().getMonth() + 7;
  maxcurrentDday1: number = new Date().getDay() + 1;
  firstBlueTab=false;
  secondBlueTab=false;
  thirdBlueTab=false;
  @Input() mainDriverPercentagDriving;
  transimissiontypes:any;
  showErrorMsg= false;
  driversDrawGridEdited:any;
  driversDrawGridDeleted:any;
  drivingPercentageVal:any;
  totalPercentage:any;
  allowedPercentage:any;
  drivingPercentage:any;
  mainDriverData:any;
  homeCityName:any;
  workCityName:any;
  @Input() additionalDriverViolation: any[] = [];
  driverIDRepeated = false;
  duplicatedDriverId:any;
  driverIDFPrefilled:any;
  driverIDValue:any;
  driversRetrivedArray:any;
  retriveDrivers :any;
  editDataRetrived:any;
  retrievedNewAdditionalDriver:any;
  @Input() isEdit: boolean;
  constructor(public fb: FormBuilder, private cdRef: ChangeDetectorRef,
    private eventEmitterService: EventEmitterService,
    private data: ShareDataService, private http: HttpClient) {
  }

  ngOnInit() {
    this.generateYears(this.minYears, this.maxYears);
    this.generatemeladiYears(this.minmeladiYears, this.maxmeladiYears);
    this.generateNonSaudiYEars(this.minNonSaudiMeladi, this.maxNonSaudiMeladi);
    this.getLicenseYearsList();
    this.getAllRelationShips();
    this.getEducationLevel();
    this.getNumberOfAccidentLast5YearsRange();
    this.getViolations();
    this.getAllCities();
    this.getAllCountries();
    this.getkilometers();
    this.getAlltransimissiontypes();
    this.getAllmedicalConditions();
    this.data.getResponseMainDriverData()
    this.mainDriverData = this.data.getResponseMainDriverData()
    this.retriveDrivers = this.data.getEditDrivers().value
    console.log(this.retriveDrivers)
    console.log(this.isEdit)
    
  
  }

  // licenseYearsArray() : FormArray {
  //   return this.formdataDrivers.get("licenseYearsArray") as FormArray
  // }
   
  // newlicense(): FormGroup {
  //   return this.fb.group({
  //     allCountries: new FormControl(null),
  //     licenseYearsList: new FormControl(null),
  //   })
  // }
   
  // addLicense() {
  //   debugger
  //   this.licenseYearsArray().push(this.newlicense());
  // }
   
  // removeLicense(i:number) {
  //   this.licenseYearsArray().removeAt(i);
  // }

  ngOnChanges() {
    if (this.hijrimonth != null && Number(this.hijrimonth) > 0) {
      this.hijrimonth = this.hijriMonthsAr[this.hijrimonth];
    }
    if (this.hijrimonth != null && Number(this.hijrimonth) > 0) {
      this.hijrimonth = this.hijriMonthsEn[this.hijrimonth];
    }
    if (this.meladimonth != null && Number(this.meladimonth) > 0) {
      this.meladimonth = this.meladiMonthsAr[this.meladimonth];
    }
  }

  ngAfterViewChecked() {
    this.data.currentCustomLanguage.subscribe(lang => this.lang = lang);
    let myStorage = window.localStorage;
    this.mycurrentLangu = myStorage.getItem("currentLanguage");
    this.myLanguageCus = this.mycurrentLangu;
    if (this.myLanguageCus == 'English') {
      this.langToBEAPIs = 1;
    } else {
      this.langToBEAPIs = 0;
    }
    this.cdRef.detectChanges();
    if (this.formdataDrivers.controls["nationalId"].value != null) {
      if (this.formdataDrivers.controls["nationalId"].value.charAt(0) == 1) {
        this.showHijriCalendar = true;
        this.showMeladiCalendar = false;
      }
      else {
        this.showMeladiCalendar = true;
        this.showHijriCalendar = false;

      }
    }
  }

  getAlltransimissiontypes(){
    this.http.get(environment.inquiry + "all-transimission-types", {
    }).subscribe(
      (res: any) => {
        
        if (res.errorCode == 12) {
        } else {
          this.transimissiontypes = res.data;
        }
      },
      err => {
        console.log("Error occured");
      }) 
  }

  getAllmedicalConditions(){
    this.http.get(environment.inquiry + "all-medical-conditions", {
    }).subscribe(
      (res: any) => {
        
        if (res.errorCode == 12) {
        } else {
          this.medicalConditions = res.data;
        }
      },
      err => {
        console.log("Error occured");
      })
    
  }

  getAllRelationShips(){
    this.http.get(environment.inquiry + "all-relationsShip", {
    }).subscribe(
      (res: any) => {
        
        if (res.errorCode == 12) {
        } else {
          this.relationsShips = res.data;
        }
      },
      err => {
        console.log("Error occured");
      })
    
  }

  fillDateYearmeld() {
    this.selectedYearr = this.formdataDrivers.controls["meladiyear"].value;
    this.fullDateToSend();
  }

  fillDateMonthmelad(e) {
    this.selectedMont = this.formdataDrivers.controls["meladimonth"].value;
  }

  fullDateToSend() {
    this.customFullDate = this.selectedYearr + '-' + this.selectedMont;
  }

  RemoveBeforeAdd() {
    if (this.isEditMode == true) {
      this.driversForm = true;
      this.multiDriversArray.push(this.formdataDrivers.value);
      this.data.setCityName([this.workCityName, this.homeCityName])
      this.data.setAdditionalDriverViolations(this.additionalDriverViolation)
      this.messageToEmit.emit(this.multiDriversArray);
      this.isEditMode = false;
      this.multiDriversArray = [];
      this.formdataDrivers.controls["nationalId"].reset();
      this.formdataDrivers.controls["meladimonth"].reset();
      this.formdataDrivers.controls["meladiyear"].reset();
      this.formdataDrivers.controls["hijrimonth"].reset();
      this.formdataDrivers.controls["hijriyear"].reset();
      this.formdataDrivers.controls["violation"].reset();
      this.formdataDrivers.controls["homeCity"].reset();
      this.formdataDrivers.controls["workCity"].reset();
      this.formdataDrivers.controls["allCountries"].reset();
      this.formdataDrivers.controls["licenseYearsList"].reset();
      this.formdataDrivers.controls["educationLevel"].setValue(1);
      this.formdataDrivers.controls["medicalConditions"].setValue(1);
      this.formdataDrivers.controls["numberOfAccidentLast5YearsRange"].setValue(0);
      this.formdataDrivers.controls["noOfchildrenDriver"].setValue(0);
      this.formdataDrivers.controls["drivingPercentage"].setValue("25%");
      this.formdataDrivers.controls["relationsShip"].setValue(0);
     
    }
    this.eventEmitterService.onFirstComponentButtonClick();
  }

  generateYears(min, max) {
    for (let i = min; i <= max; i++) {
      this.years.push(i);
    }
    if (!this.years.includes(this.hijriyear)) {
      this.hijriyear = null;
    }
  }

  generatemeladiYears(min, max) {
    for (let i = min; i <= max; i++) {
      this.meladiyears.push(i);
    }
    if (!this.meladiyears.includes(this.meladiyear)) {
      this.meladiyear = null;
    }
  }
  
  generateNonSaudiYEars(min, max) {
    for (let i = min; i <= max; i++) {
      this.nonSaudiMElai.push(i);
    }
    if (!this.nonSaudiMElai.includes(this.nonSaudiMeladi)) {
      this.nonSaudiMeladi = null;
    }
  }

  getEducationLevel() {
    this.http.get(environment.inquiry + "all-educations", {
    }).subscribe(
      (res: any) => {
        let myarray = res.data;
        this.educationLVL = res.data;
        for (let i = 0; i < myarray.length; i++) {
        }
      },
      err => {
        console.log("Error occured");
      })
  }

  getLicenseYearsList() {
     this.http.get(environment.inquiry + "getLicenseYearsList", {
     }).subscribe(
       (res: any) => {
         this.licenseYearsList = res.data;
       },
       err => {
         console.log("Error occured");
       })
  }

  getNumberOfAccidentLast5YearsRange() {
     this.http.get(environment.inquiry + "getNumberOfAccidentLast5YearsRange", {
     }).subscribe(
       (res: any) => {
         this.numberOfAccidentLast5YearsRange = res.data;
       },
       err => {
         console.log("Error occured");
       })
  }
 
  getViolations() {
     this.http.get(environment.inquiry + "violations", {
     }).subscribe(
       (res: any) => {
         this.violations = res.data;
       },
       err => {
         console.log("Error occured");
       })
  }
 
  getAllCities() {
    this.http.get(environment.inquiry + "all-cities", {
    }).subscribe(
      (res: any) => {
        this.allCities = res.data;
       },
       err => {
         console.log("Error occured");
       })
  }
   
  getAllCountries() {
    this.http.get(environment.inquiry + "all-countries", {
    }).subscribe(
      (res: any) => {
        this.allCountries = res.data;   
      },
      err => {
        console.log("Error occured");
      })
  }

  getkilometers() {
    this.http.get(environment.inquiry + "Kilometers", {
    }).subscribe(
      (res: any) => {
        this.kilometers = res.data;
      },
      err => {
        console.log("Error occured");
      })
  }

  detectChangeNoAddition(e) {
    this.showHijriCalendar = true;
    this.firstCharacterCheck = e.target['value'].charAt(0)
    if (this.firstCharacterCheck == 1) {
      this.showHijriCalendar = true;
      this.showMeladiCalendar = false;
      this.formdataDrivers.get("meladimonth").clearValidators();
      this.formdataDrivers.get("meladimonth").setValidators(null);
      this.formdataDrivers.get("meladimonth").updateValueAndValidity();
      this.formdataDrivers.get("meladiyear").clearValidators();
      this.formdataDrivers.get("meladiyear").setValidators(null);
      this.formdataDrivers.get("meladiyear").updateValueAndValidity();
    }
    else {
      this.showMeladiCalendar = true;
      this.showHijriCalendar = false;
      this.formdataDrivers.get("hijrimonth").clearValidators();
      this.formdataDrivers.get("hijrimonth").setValidators(null);
      this.formdataDrivers.get("hijrimonth").updateValueAndValidity();
      this.formdataDrivers.get("hijriyear").clearValidators();
      this.formdataDrivers.get("hijriyear").setValidators(null);
      this.formdataDrivers.get("hijriyear").updateValueAndValidity();

    }
  }

  fillDateMonth(e) {
    this.selectedMont = this.formdataDrivers.controls["hijrimonth"].value;
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

  fillDateYear() {
    console.log('fillDateYear')
  }

  homeCityChange(homeCityName)
  {
    this.homeCityName =  homeCityName;
  }
  workCityChange(workCityName)
  {
    this.workCityName =  workCityName;
  }

  addNewDriverSubmit(data) {}

  ChangeDrivingPercentage()
  {
    this.drivingPercentageVal = this.formdataDrivers.controls['drivingPercentage'].value;
     var ret = this.drivingPercentageVal.replace('%','');
    this.drivingPercentageVal = JSON.parse(ret)
  }

  firstClickedBlueTab(){
    this.firstBlueTab=true;
    this.secondBlueTab=false;
    this.thirdBlueTab=false;
  }
  secondClickedBlueTab(){
    this.firstBlueTab=false;
    this.secondBlueTab=true;
    this.thirdBlueTab=false;
  }
  thirdClickedBlueTab(){
    this.firstBlueTab=false;
    this.secondBlueTab=false;
    this.thirdBlueTab=true;
  }

  violationChange(e,id){
    if(e.srcElement.checked == true){
      this.additionalDriverViolation.push(id);
    }
   
    else
    {
      this.additionalDriverViolation = this.arrayRemove(this.additionalDriverViolation,  e.target.value);
      this.displayCheckBoxes();
    }
  }

  displayCheckBoxes(){
  this.additionalDriverViolation.forEach(function(element) {
    console.log(element);
  });
  }

  arrayRemove(arr, value) {
    return arr.filter(function(ele){
        return ele != value;
    });
  }

 
  
  sendMessageToParent() {
    debugger
   this.driversForm = true;
   this.isEdit = false;
   this.data.getDrivingPercentage();
   this.driversDrawGridEdited = this.data.getDrivingPercentage()
   if(this.driversDrawGridEdited.value != "" )
   {
    var total = 0;
    // for (var i = 0; i < this.mainDriverData.value[0].drivers.length; i++) {
    //   total += this.mainDriverData.value[0].drivers.drivingPercentage;
    // }
    if(this.isEditMode == false)
    {
      for (var j = 0; j < this.driversDrawGridEdited.value.length; j++) {
        var percentage = this.driversDrawGridEdited.value[j];
       this.drivingPercentage = percentage
       total = total + this.drivingPercentage;
     }
    }
    else{
      if(this.driversDrawGridEdited.value.length == 1)
      {
        this.driversDrawGridEdited.value.splice(0);
      }
      else{
        this.driversDrawGridEdited.value.splice(1);
      }  
      for (var j = 0; j < this.driversDrawGridEdited.value.length; j++) {
        var percentage = this.driversDrawGridEdited.value[j];
       this.drivingPercentage = percentage
       total = total + this.drivingPercentage;
      }
    }
   
    this.totalPercentage = this.drivingPercentageVal  + total;
    if (this.totalPercentage > 100 || this.drivingPercentageVal < 1) {
      this.showErrorMsg = true;
        this.formdataDrivers.controls["drivingPercentage"].setValue("");
        $('.showLimtPrercentageVal').show();
        $('.additionaDriversSave').attr('disabled', 'disabled');
        $('.additionaDriversSave').css('cursor', 'not-allowed');
        return false;
    }
 
    else {
      this.showErrorMsg = false;
      $('.showLimtPrercentageVal').hide();
      $('.additionaDriversSave').removeAttr('disabled');
      $('.additionaDriversSave').css('cursor', 'pointer');
    }
   }

    if (!this.formdataDrivers.controls["nationalId"].valid || !this.formdataDrivers.controls["educationLevel"].valid
        || !this.formdataDrivers.controls["medicalConditions"].valid || !this.formdataDrivers.controls["numberOfAccidentLast5YearsRange"].valid
        || !this.formdataDrivers.controls["noOfchildrenDriver"].valid || !this.formdataDrivers.controls["drivingPercentage"].valid
        || !this.formdataDrivers.controls["relationsShip"].valid) {
      return false;
    }
   
    if (!this.formdataDrivers.controls["hijrimonth"].valid || !this.formdataDrivers.controls["hijriyear"].valid) {
      return false;
    }

  
    if(!this.formdataDrivers.controls["meladimonth"].valid || !this.formdataDrivers.controls["meladiyear"].valid) {
      return false;
    }

    if (this.formdataDrivers.controls["nationalId"].value.charAt(0) == 1) {
      this.formdataDrivers.get("meladimonth").setValue(null);
      this.formdataDrivers.get("meladiyear").setValue(null);
    }
    else {
      this.formdataDrivers.get("hijrimonth").setValue(null)
      this.formdataDrivers.get("hijriyear").setValue(null)
    }

    this.multiDriversArray.push(this.formdataDrivers.value);
    this.data.setCityName([this.workCityName, this.homeCityName])
    this.data.setAdditionalDriverViolations(this.additionalDriverViolation)
    this.messageToEmit.emit(this.multiDriversArray);
    this.multiDriversArray = [];
    this.formdataDrivers.controls["nationalId"].reset();
    this.formdataDrivers.controls["meladimonth"].reset();
    this.formdataDrivers.controls["meladiyear"].reset();
    this.formdataDrivers.controls["hijrimonth"].reset();
    this.formdataDrivers.controls["hijriyear"].reset();
    this.formdataDrivers.controls["violation"].reset();
    this.formdataDrivers.controls["homeCity"].reset();
    this.formdataDrivers.controls["workCity"].reset();
    this.formdataDrivers.controls["allCountries"].reset();
    this.formdataDrivers.controls["licenseYearsList"].reset();
    this.formdataDrivers.controls["educationLevel"].setValue(1);
    this.formdataDrivers.controls["medicalConditions"].setValue(1);
    this.formdataDrivers.controls["numberOfAccidentLast5YearsRange"].setValue(0);
    this.formdataDrivers.controls["noOfchildrenDriver"].setValue(0);
    this.formdataDrivers.controls["drivingPercentage"].setValue("25%");
    this.formdataDrivers.controls["relationsShip"].setValue(0);
    this.isEditMode = false;
  }
}
