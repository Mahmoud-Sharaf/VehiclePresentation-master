import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { EventEmitterService } from 'src/app/core/events/eventEmitter';
import { ShareDataService } from 'src/app/services/share-data.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.css']
})
export class AdditionalInfoComponent implements OnInit {
  firstBlueTab = false;
  secondBlueTab = false;
  thirdBlueTab = false;
 fourthBlueTab = false;
  relationsShips:any;
  licenseYearsList:any;
  violations:any;
  allCities:any;
  allCountries:any;
  kilometers:any;
  myLanguageCus: any;
  mycurrentLangu: any;
  educationLVL: any;
  numberOfAccidentLast5YearsRange:any;
  transimissiontypes:any;
  medicalConditions:any;
  langToBEAPIs: any;
  lang: any;
  educationLevel:any;
  noOfchildren:any;
  parkingLocations:any;
  noOfAccident:any;
  medicalConditionsSelect:any;
  transimissiontypesSelect:any;
  parkingLocation:any;
  kilometersSelect:any;
  workCitySelect: any;
  countrySelect: any;
  licenseYears: any;
  updates: any;
  workCityName:any;
  @Input() additionalInfoDataForm: FormGroup;
  @Input() index;
  @Input() mainDriverViolation: any[] = [];
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

  constructor(public fb: FormBuilder, @Inject(DOCUMENT) private document: Document, private cdRef: ChangeDetectorRef,
    private translateService: TranslateService, private eventEmitterService: EventEmitterService,
    private data: ShareDataService, private http: HttpClient) {
  }

  ngOnInit() {
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
    this.getParkingLocation();
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

  getParkingLocation() {
    this.http.get(environment.inquiry + "parking-locations", {
    }).subscribe(
      (res: any) => {
        this.parkingLocations = res.data;
      },
      err => {
        console.log("Error occured");
      })
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

  firstClickedBlueTab(){
    this.firstBlueTab=true;
    this.secondBlueTab=false;
    this.thirdBlueTab=false;
    this.fourthBlueTab = false;
  }

  secondClickedBlueTab(){
    this.firstBlueTab=false;
    this.secondBlueTab=true;
    this.thirdBlueTab=false;
    this.fourthBlueTab = false;
  }

  thirdClickedBlueTab(){
    this.firstBlueTab = false;
    this.secondBlueTab = false;
    this.thirdBlueTab = true;
    this.fourthBlueTab = false;
  }

  fourthClickedBlueTab(){
    this.firstBlueTab = false;
    this.secondBlueTab = false;
    this.thirdBlueTab = false;
    this.fourthBlueTab = true;
    this.data.setCheckUpdates(this.fourthBlueTab)
  }

  levelEducationChange() {
    this.educationLevel = this.additionalInfoDataForm.controls["educationLevel"].value;
  }

  noOfchildrenChange() {
    this.noOfchildren = this.additionalInfoDataForm.controls["noOfchildren"].value;
  }

  noOfAccidentChange() {
    this.noOfAccident = this.additionalInfoDataForm.controls["numberOfAccidentLast5Years"].value;
  }

  medicalConditionsChange() {
    this.medicalConditionsSelect = this.additionalInfoDataForm.controls["medicalConditions"].value;
  }

  transimissionTypesChange() {
    this.transimissiontypesSelect = this.additionalInfoDataForm.controls["transimissiontypes"].value;
  }

  parkingLocationChange() {
    this.parkingLocation = this.additionalInfoDataForm.controls["parkingLocation"].value;
  }
  
  kilometersChange() {
    this.kilometersSelect = this.additionalInfoDataForm.controls["kilometers"].value;
  }
  
  violationChange(e,id){
      if(e.srcElement.checked == true){
        this.mainDriverViolation.push(id);
      }
     
      else
      {
        this.mainDriverViolation = this.arrayRemove(this.mainDriverViolation,  e.target.value);
        this.displayCheckBoxes();
      }
      this.data.setMainDriverViolations(this.mainDriverViolation)
  }

  displayCheckBoxes(){
    this.mainDriverViolation.forEach(function(element) {
      console.log(element);
    });
  }

  arrayRemove(arr, value) {
      return arr.filter(function(ele){
          return ele != value;
      });
  }

  workCityChange(workCityName)
  {
    this.workCitySelect = this.additionalInfoDataForm.controls["workCityAddInfo"].value;
    this.workCityName =  workCityName;
    this.data.setworkCityAddInfo(this.workCityName)
  }

  countryChange()
  {
    this.countrySelect = this.additionalInfoDataForm.controls["countryAddInfo"].value;
  }

  licenseYearsListChange()
  {
    this.licenseYears = this.additionalInfoDataForm.controls["licenseYearsListAddInfo"].value;
  }
  
  updatesChange()
  {
    this.updates = this.additionalInfoDataForm.controls["updates"].value;
  }

  addAdditionalInfoSubmit(data){
  }

}
