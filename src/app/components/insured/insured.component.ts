import {
  Component,
  OnInit,
  Input,
  Inject,
  ChangeDetectorRef,
  Output,
  EventEmitter,
  AbstractType,
} from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from "@angular/forms";
import { environment } from "src/environments/environment.prod";
import { DOCUMENT } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";
import { ShareDataService } from "../../services/share-data.service";
import { DatePipe } from "@angular/common";
import { EventEmitterService } from "src/app/core/events/eventEmitter";
import { isNullOrUndefined } from "util";
import { properties } from "../../core/models/additionalD.model";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";
@Component({
  selector: "bcare-insured",
  templateUrl: "./insured.component.html",
  styleUrls: ["./insured.component.css"],
})
export class InsuredComponent implements OnInit {
  showAdditionalDriversBool = false;
  showAdditionalInfoBool = false;
  showOffersBool = false;
  @Input() isLastStep: boolean;
  isEditMode: boolean;
  isEdit: boolean;
  errorUpdateMsg:boolean;
  @Output() nextStep = new EventEmitter();
  @Output() prevStep = new EventEmitter();
  driversArray: any[] = [];
  violationsCodes;
  additionalDrivers: properties[];
  additionalDriversList: any[] = [];
  additionalINfo: any[] = [];
  showLoading = false;
  driversValid = true;
  isCompanyFlag = false;
  countries;
  hideViolations = false;
  updateRequired:any;
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
  hijriMonthsEn = [
    { id: 1, value: "1- Muharram" },
    { id: 2, value: "2- Safar" },
    { id: 3, value: "3- Rabi’ al-awal" },
    { id: 4, value: "4- Rabi’ al-thani" },
    { id: 5, value: "5- Jumada al-awal" },
    { id: 6, value: "6- Jumada al-thani" },
    { id: 7, value: "7- Rajab" },
    { id: 8, value: "8- Sha’aban" },
    { id: 9, value: "9- Ramadan" },
    { id: 10, value: "10- Shawwal" },
    { id: 11, value: "11- Duh al-Qidah" },
    { id: 12, value: "12- Duh al-Hijjah" },
  ];
  meladiMonthsAr = [
    { id: 1, value: "1 - يناير" },
    { id: 2, value: "2 -فبراير" },
    { id: 3, value: "3 -مارس" },
    { id: 4, value: "4 -ابريل" },
    { id: 5, value: "5 -مايو" },
    { id: 6, value: "6 -يونيو" },
    { id: 7, value: "7 -يوليو" },
    { id: 8, value: "8 -اغسطس" },
    { id: 9, value: "9 -سبتمبر" },
    { id: 10, value: "10 -اكتوبر" },
    { id: 11, value: "11 -نوفمبر" },
    { id: 12, value: "12 -ديسيمبر" },
  ];
  meladiMonthEN = [
    { id: 1, value: "1- Jan" },
    { id: 2, value: "2- Feb" },
    { id: 3, value: "3- Mar" },
    { id: 4, value: "4- Apr" },
    { id: 5, value: "5- May" },
    { id: 6, value: "6- Jun" },
    { id: 7, value: "7- Jul" },
    { id: 8, value: "8- Aug" },
    { id: 9, value: "9- Sep" },
    { id: 10, value: "10- Oct" },
    { id: 11, value: "11- Nov" },
    { id: 12, value: "12- Dec" },
  ];
  hijriyears: any[] = [];
  meladiyears: any[] = [];
  selectedMont: any;
  currentYear: number = new Date().getFullYear();
  minYears: number = Math.round((this.currentYear - 622) * (33 / 32)) - 112;
  maxYears: number = Math.round((this.currentYear - 622) * (33 / 32)) - 0;
  firstCharacterCheck: any;
  showHijriCalendar = true;
  showMeladiCalendar = false;
  nonSaudiMElai: any[] = [];
  minNonSaudiMeladi: number = Math.round(this.currentYear * (33 / 32)) - 163;
  maxNonSaudiMeladi: number = Math.round(this.currentYear * (33 / 32)) - 63;
  meladiyear: any;
  nonSaudiMeladi: any;
  customFullDate: any;
  selectedYear: any;
  customDay: any;
  numberOfAccidentLast5YearsRange: any;
  minmeladiYears: number = Math.round(this.currentYear * (33 / 32)) - 123;
  maxmeladiYears: number = Math.round(this.currentYear * (33 / 32));
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
  showFixedHijriCalendar = false;
  showFixedMeladiCalendar = false;
  birthdateLabel = false;
  birthDateMonth: any;
  birthdateYear: any;
  formdataDrivers: FormGroup;
  additionalInfoDataForm: FormGroup;
  educationCodes: any[] = [];
  mainDriverDrivingPercentage: any;
  relationsShips: any;
  licenseYearsAr = ["سنة واحدة", "سنتان", "ثلاث سنوات", "عشر سنوات أو أكثر"];
  licenseYearsEn = [
    "One year",
    "Two years",
    "Three years",
    "Ten years or more",
  ];

  licenseYearsLookup;
  numberOfAccidentLast5YearsList;
  cities;
  isWorkCitySameAsDriveCity = true;
  isEditRequest: boolean;
  showAdditionalDriverToggleBtn = true;
  showAdditionalDriverGrid = false;
  showDriverDetailsInfo = false;
  showDetailsContentInfo = false;
  showCompanyMainDriverDetailsInfo = false;
  showEditedAdditionalDriverForm = false;
  isEditDriver = false;
  formdata: FormGroup;
  fixedFormData: FormGroup;
  brakingSystems: any[] = [];
  cruiseControlTypes: any[] = [];
  parkingSensors: any[] = [];
  cameraTypes: any[] = [];
  transimissionTypes: any[] = [];
  parkingLocations: any[] = [];
  driverArrayToDrawGrid = [];
  kilometers: any[] = [];
  driverIndex = 0;
  defaultNationaLId = "";
  defaultBirthDate = "";
  defaultDrivingPercentage = "";
  showBirthMonth = true;
  showBirthYear = true;
  manufacturingYears: any[] = [];
  isAdditionalDriver = false;
  addNewDriversContainer = false;
  message: any;
  driverDataSource: any;
  vehicleData: any;
  mainDriverArrayDetails: any[] = [];
  mainDrivrID: any;
  bankInsuredID: any;
  mainDriverBirthDate: any;
  policyEffectiveDate: any;
  additionalDriverMonth: any;
  additionalDriverYear: any;
  showErrDescSubmitInq = false;
  vehicleValueFromUI: any;
  receivedChildMessage: string;
  receivedinfoDriverMessage: string;
  additionalFromChildToParent: any[] = [];
  servererror = "";
  myLanguageCus: any;
  mycurrentLangu: any;
  lang: any;
  langToBEAPIs: any;
  parentReqIdFromFE: any;
  mainDriverData: any;
  singleadditionalDriverListToSubmit: any;
  listOfAdditionalDriversToSubmit: any[] = [];
  insuredDriverData: any;
  fixedMainDriverData: any;
  vehicleVal: any;
  otherInfoDriver: any;
  infoDriverData: any;
  @Input() submitted;
  @Input() hijrimonth;
  @Input() hijriyear;
  @Input() meladimonth;
  educationLevel: any;
  noOfchildren: any;
  noOfAccident: any;
  medicalConditionsSelect: any;
  transimissiontypesSelect: any;
  parkingLocation: any;
  kilometersSelect: any;
  workCityAddInfo: any;
  countryAddInfo: any;
  licenseYearsListAddInfo: any;
  updates: any;
  violationSelected = [];
  driverExtraLicenses: any;
  ownerTransfer: any;
  ownerNationalId: any;
  driverExtraLicenseDrivers: any;
  drivingPercentageVal: any;
  educationLevelInit: any;
  noOfchildrenInit: any;
  noOfAccidentInit: any;
  medicalConditionsInit: any;
  drivingPercentageInit: any;
  relationsShipInit: any;
  drivingsPercentage: any[] = [];
  drivingPercentArray: any[] = [];
  drivingPercentageFromList: any;
  drivingPercentageAfterDelete: any;
  duplicatedNationalId: any;
  driverID: any;
  isCustomerCurrentOwnerVal: any;
  isVehicleExistVal: any;
  oldOwnerNin: any;
  hasModification: any;
  workCityName: any;
  homeCityName: any;
  mainDriverViolation: any;
  additionalDriverViolation: any;
  loading = false;
  vehicleIinitDetails: any;
  vehicleMakerCode: any;
  vehicleMaker: any;
  model: any;
  vehicleModelYear: any;
  plateColor: any;
  carPlateText1: any;
  carPlateText2: any;
  carPlateText3: any;
  carPlateNumber: any;
  carPlateNumberAr: any;
  carPlateNumberEn: any;
  carPlateTextAr: any;
  carPlateTextEn: any;
  PlateTypeCode: any;
  id: any;
  sequenceNumber: any;
  customCardNumber: any;
  cylinders: any;
  licenseExpiryDate: any;
  majorColor: any;
  minorColor: any;
  registerationPlace: any;
  vehicleBodyCode: any;
  vehicleWeight: any;
  vehicleLoad: any;
  chassisNumber: any;
  vehicleModelCode: any;
  brakeSystemId: any;
  cruiseControlTypeId: any;
  parkingSensorId: any;
  cameraTypeId: any;
  currentMileageKM: any;
  hasAntiTheftAlarm: any;
  hasFireExtinguisher: any;
  carImage: any;
  driversID: any[] = [];
  driverNationalID: any;
  manufactureYear: any;
  manufactureYearInit: any;
  cardsViewMode = true;
  firstCard = false;
  secondCard = false;
  thirdCard = false;
  fourthCard = false;
  fifthCard = false;
  sixCard = false;
  updatesCheck:any;
  retriveDrivers:any =[];
  retriveAdditionalDrivers:any ;
  retriveDriversArray:any =[];
  cityCode:any;
  driverExtraLicensesArray:any =[];
  driverIDRepeated = false;
  duplicatedDriverId:any;
  driverIDFPrefilled:any;
  driverIDValue:any;
  driversRetrivedArray:any;
  editDataRetrived:any;
  retrievedNewAdditionalDriver:any;
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
  //get acc

  getMessage(message: any) {
    debugger
    this.receivedChildMessage = message;
    console.log(this.receivedChildMessage)
        

    this.retrievedNewAdditionalDriver =this.data.getNewAdditionalDriver().value;
    console.log(this.retrievedNewAdditionalDriver)
   
    for (let i = 0; i < message.length; i++) {
      this.driverNationalID = message[i].nationalId;
      if (message[0].nationalId.charAt(0) == "1") {
        this.additionalDriverMonth = message[0].hijrimonth;
        this.additionalDriverYear = message[0].hijriyear;
      }
       else {
        this.additionalDriverMonth = message[0].meladimonth;
        this.additionalDriverYear = message[0].meladiyear;
      }
      this.drivingPercentageVal = message[i].drivingPercentage;
      if(this.retrievedNewAdditionalDriver != "" )
      {
        for(var j =0; j< this.retrievedNewAdditionalDriver.length; j++)
        {
          if(this.driverNationalID == this.retrievedNewAdditionalDriver[j].nationalId)
          {
            if(this.retrievedNewAdditionalDriver[j].nationalId.charAt(0) == "1")
            {
              this.retrievedNewAdditionalDriver[j].hijrimonth = this.additionalDriverMonth
              this.retrievedNewAdditionalDriver[j].hijriyear = this.additionalDriverYear
            }
            else
            {   
              this.retrievedNewAdditionalDriver[j].meladimonth = this.additionalDriverMonth
              this.retrievedNewAdditionalDriver[j].meladiyear = this.additionalDriverYear
            }
            this.retrievedNewAdditionalDriver[j].nationalId = this.driverNationalID

            this.retrievedNewAdditionalDriver[j].drivingPercentage = this.drivingPercentageVal
            this.retrievedNewAdditionalDriver[j].edcuationId = message[i].educationLevel
            this.retrievedNewAdditionalDriver[j].childrenBelow16Years = message[i].noOfchildrenDriver
            this.retrievedNewAdditionalDriver[j].driverNOALast5Years = message[i].numberOfAccidentLast5YearsRange
            this.retrievedNewAdditionalDriver[j].medicalConditionId = message[i].medicalConditions
            this.retrievedNewAdditionalDriver[j].relationShipId = message[i].relationsShip
            this.driverArrayToDrawGrid.splice(message[i], 1);
            message[i] = this.retrievedNewAdditionalDriver[j]
            this.driverArrayToDrawGrid.push(message[i]);
            console.log(this.driverArrayToDrawGrid)
          }
          else
          {
            this.driverArrayToDrawGrid.push(message[i]);
          }
        }
      }
      else{
        this.driverArrayToDrawGrid.push(message[i]);
      }
    
      var ret = this.drivingPercentageVal.replace("%", "");
      this.drivingPercentageVal = JSON.parse(ret);
      this.drivingsPercentage.push(this.drivingPercentageVal);
      this.data.setDrivingPercentage(this.drivingsPercentage);

      this.mainDriverBirthDate =
        this.additionalDriverMonth + "-" + this.additionalDriverYear;
      if (
        message[0].allCountries == null ||
        message[0].licenseYearsList == null
      ) {
        this.driverExtraLicenseDrivers = null;
      } else {
        this.driverExtraLicenseDrivers = {
          countryId: message[0].allCountries,
          licenseYearsId: message[0].licenseYearsList,
        };
      }
      this.data.getCityName();
      this.workCityName = this.data.getCityName().value[0];
      this.homeCityName = this.data.getCityName().value[1];
      console.log(this.data.getAdditionalDriverViolations().value);

      this.singleadditionalDriverListToSubmit = {
        nationalId: message[0].nationalId,
        medicalConditionId: message[0].medicalConditions,
        //  violationIds: message[0].violation,
        violationIds: this.data.getAdditionalDriverViolations().value,
        licenseExpiryMonth: null,
        licenseExpiryYear: null,
        edcuationId: message[0].educationLevel,
        childrenBelow16Years: message[0].noOfchildrenDriver,
        drivingPercentage: this.drivingPercentageVal,
        birthDateMonth: this.additionalDriverMonth,
        birthDateYear: this.additionalDriverYear,
        mobileNo: null,
        driverExtraLicenses: this.driverExtraLicenseDrivers,
        driverNOALast5Years: message[0].numberOfAccidentLast5YearsRange,
        driverWorkCityCode: message[0].workCity,
        driverWorkCity: this.workCityName,
        driverHomeCityCode: message[0].homeCity,
        driverHomeCity: this.homeCityName,
        isCompanyMainDriver: false,
        relationShipId: message[0].relationsShip,
      };
      this.listOfAdditionalDriversToSubmit.push(
        this.singleadditionalDriverListToSubmit
      );
      this.currectDriver = null;
    }
    if (this.driverArrayToDrawGrid.length >= 3) {
      this.showAdditionalDriverToggleBtn = false;
    } else {
      this.showAdditionalDriverToggleBtn = true;
    }

    this.data.setNewAdditionalDriver(this.listOfAdditionalDriversToSubmit)
  }

  constructor(
    public fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    private data: ShareDataService,
    public datepipe: DatePipe,
    private cdRef: ChangeDetectorRef,
    private eventEmitterService: EventEmitterService
  ) {
    if (this.eventEmitterService.subsVar == undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.invokeFirstComponentFunction.subscribe(
        (name: string) => {
          this.toggleDriver(false);
        }
      );
    }

    // this.router.events
    // .pipe(filter((rs): rs is NavigationEnd => rs instanceof NavigationEnd))
    // .subscribe(event => {
    //   if (
    //     event.id === 1 &&
    //     event.url === event.urlAfterRedirects
    //   ) {
    //     this.router.navigate(['/']);
    //   }
    // })
  }

  ngOnInit() {
    $("#vehicleFocus").focus();
    localStorage.setItem("editDriver", "false");
    this.manufactureYear = localStorage.getItem("manufactureYear");
    this.generateYears(this.minYears, this.maxYears);
    this.generatemeladiYears(this.minmeladiYears, this.maxmeladiYears);
    this.generateNonSaudiYEars(this.minNonSaudiMeladi, this.maxNonSaudiMeladi);
    this.data.getMainDriverData();
    this.fixedMainDriverData = this.data.getMainDriverData();
    console.log(this.fixedMainDriverData.value);
    this.data.getResponseMainDriverData();
    this.mainDriverData = this.data.getResponseMainDriverData();
    console.log(this.mainDriverData.value);
    this.vehicleIinitDetails = this.mainDriverData.value.vehicle;
    this.data.getOtherInfoDriverData();
    this.otherInfoDriver = this.data.getOtherInfoDriverData();
    this.fixedMainDriverData.value[2] == null;
    let elem = new properties();
    this.additionalDriversList.push(elem);
    let mobileNumber = window.localStorage.getItem("mobileNumber");
    
    this.fixedFormData = this.fb.group({
      vehicleValue: new FormControl("", [
        Validators.required,
        this.minValueFiledsvehicleValue.bind(this),
      ]),
      hijrimonth: new FormControl(null, Validators.required),
      hijriyear: new FormControl(null, Validators.required),
      meladimonth: new FormControl(null, Validators.required),
      meladiyear: new FormControl(null, Validators.required),
    });

    this.additionalInfoDataForm = this.fb.group({
      educationLevel: new FormControl(null, Validators.required),
      noOfchildren: new FormControl(null, Validators.required),
      numberOfAccidentLast5Years: new FormControl(null, Validators.required),
      medicalConditions: new FormControl(null, Validators.required),
      transimissiontypes: new FormControl(null, Validators.required),
      parkingLocation: new FormControl(null, Validators.required),
      kilometers: new FormControl(null, Validators.required),
      violationAddInfo: new FormControl(null),
      workCityAddInfo: new FormControl(null),
      countryAddInfo: new FormControl(null),
      licenseYearsListAddInfo: new FormControl(null),
      updates: new FormControl(null),
    });
   

    this.formdataDrivers = this.fb.group({
      nationalId: new FormControl(null, [
        Validators.required,
        this.minValueMaxValue.bind(this),
      ]),
      hijrimonth: new FormControl(null, [Validators.required]),
      hijriyear: new FormControl(null, [Validators.required]),
      meladimonth: new FormControl(null, [Validators.required]),
      meladiyear: new FormControl(null, [Validators.required]),
      educationLevel: new FormControl(this.educationLevelInit, [
        Validators.required,
      ]),
      medicalConditions: new FormControl(this.medicalConditionsInit, [
        Validators.required,
      ]),
      numberOfAccidentLast5YearsRange: new FormControl(this.noOfAccidentInit, [
        Validators.required,
      ]),
      noOfchildrenDriver: new FormControl(this.noOfchildrenInit, [
        Validators.required,
      ]),
      drivingPercentage: new FormControl(this.drivingPercentageInit, [
        Validators.required,
      ]),
      relationsShip: new FormControl(this.relationsShipInit, [
        Validators.required,
      ]),
      violation: new FormControl(null),
      homeCity: new FormControl(null),
      workCity: new FormControl(null),
      allCountries: new FormControl(null),
      licenseYearsList: new FormControl(null),
      // licenseYearsArray :this.fb.array([])
    });


    this.retriveDrivers = this.data.getEditDrivers()
    console.log(this.retriveDrivers)
    
    if(this.retriveDrivers.value != "")
    {
      this.showAdditionalDrivers()

      for(var i =0; i<this.retriveDrivers.value.length; i++)
      {
        if(this.retriveDrivers.value[i].nationalId.charAt(0) == "1")
        {
          this.retriveAdditionalDrivers = {
            nationalId:  this.retriveDrivers.value[i].nationalId,
            hijrimonth :this.retriveDrivers.value[i].birthDateMonth,
            hijriyear: this.retriveDrivers.value[i].birthDateYear,
            drivingPercentage: this.retriveDrivers.value[i].drivingPercentage,
            educationLevel:this.retriveDrivers.value[i].edcuationId,
            medicalConditions: this.retriveDrivers.value[i].medicalConditionId,
            numberOfAccidentLast5YearsRange: this.retriveDrivers.value[i].driverNOALast5Years,
            noOfchildrenDriver: this.retriveDrivers.value[i].childrenBelow16Years,
            relationsShip: this.retriveDrivers.value[i].relationShipId,
          }

        }
        else
        {
          this.retriveAdditionalDrivers = {
            nationalId:  this.retriveDrivers.value[i].nationalId,
            meladimonth :this.retriveDrivers.value[i].birthDateMonth,
            meladiyear: this.retriveDrivers.value[i].birthDateYear,
            drivingPercentage: this.retriveDrivers.value[i].drivingPercentage,
            educationLevel:this.retriveDrivers.value[i].edcuationId,
            medicalConditions: this.retriveDrivers.value[i].medicalConditionId,
            numberOfAccidentLast5YearsRange: this.retriveDrivers.value[i].driverNOALast5Years,
            noOfchildrenDriver: this.retriveDrivers.value[i].childrenBelow16Years,
            relationsShip: this.retriveDrivers.value[i].relationShipId,
          }
        }

        this.retriveDriversArray.push(this.retriveAdditionalDrivers);
        this.listOfAdditionalDriversToSubmit.push(this.retriveDrivers.value[i]);
      
        console.log(this.listOfAdditionalDriversToSubmit)
       
      }
      this.driverArrayToDrawGrid = this.retriveDriversArray ;
      
     
     
      
    }

    if (this.mainDriverData.value.drivers != null) {
      // var RetrivedDrivers = {
      //   nationalId: this.otherInfoDriver.DrivernationalID,
      //   mainDriverBirthDate: this.otherInfoDriver.birthDate,
      //   policyEffectiveDate: this.driverDataSource.policyEffectiveDate,
      //   hijriyear: null,
      //   hijrimonth: null,
      //   meladimonth: null,
      //   meladiyear: null
      // };

      //     this.driverArrayToDrawGrid = [];
      //     this.driverArrayToDrawGrid.push(RetrivedDrivers);
      //     this.mainDrivrID = this.driverDataSource.DrivernationalID;
      //     this.mainDriverBirthDate = this.driverDataSource.birthDate;
      //     this.policyEffectiveDate = this.driverDataSource.policyEffectiveDate;
      //     let splitDate = this.mainDriverBirthDate.split("-", 3);
      //     this.birthDateMonth = Number(splitDate[1]);
      //     this.birthdateYear = Number(splitDate[2]);

      if (
        this.mainDriverData.value.drivers[0].birthDateMonth != null &&
        this.mainDriverData.value.drivers[0].birthDateYear != null
      ) {
        this.showFixedHijriCalendar = false;
        this.showFixedMeladiCalendar = false;
        this.selectedMont = this.mainDriverData.value.drivers[0].birthDateMonth;
        this.selectedYear = this.mainDriverData.value.drivers[0].birthDateYear;
      }
      this.birthdateLabel = false;
      this.educationLevel = this.mainDriverData.value.drivers[0].edcuationId;
      this.additionalInfoDataForm.controls["educationLevel"].setValue(
        this.educationLevel
      );
      this.noOfchildren = this.mainDriverData.value.drivers[0].childrenBelow16Years;
      this.additionalInfoDataForm.controls["noOfchildren"].setValue(
        this.noOfchildren
      );
      this.noOfAccident = this.mainDriverData.value.drivers[0].driverNOALast5Years;
      this.additionalInfoDataForm.controls[
        "numberOfAccidentLast5Years"
      ].setValue(this.noOfchildren);
      this.medicalConditionsSelect = this.mainDriverData.value.drivers[0].medicalConditionId;
      this.additionalInfoDataForm.controls["medicalConditions"].setValue(
        this.medicalConditionsSelect
      );
      // this.violationSelected = this.mainDriverData.value.drivers[0].violationIds;
      // this.additionalInfoDataForm.controls["violationAddInfo"].setValue(this.violationSelected);
      this.workCityAddInfo = this.mainDriverData.value.drivers[0].driverWorkCityCode;
      this.additionalInfoDataForm.controls["workCityAddInfo"].setValue(
        this.workCityAddInfo
      );
      if (this.mainDriverData.value.drivers[0].driverExtraLicenses != null) {
        this.licenseYearsListAddInfo = this.mainDriverData.value.drivers[0].driverExtraLicenses[0].licenseYearsId;
        this.additionalInfoDataForm.controls[
          "licenseYearsListAddInfo"
        ].setValue(this.licenseYearsListAddInfo);
        this.countryAddInfo = this.mainDriverData.value.drivers[0].driverExtraLicenses[0].countryId;
        this.additionalInfoDataForm.controls["countryAddInfo"].setValue(
          this.countryAddInfo
        );
      }
    } 
    else {
      this.additionalInfoDataForm.controls["educationLevel"].setValue(
        this.educationLevelInit
      );
      this.additionalInfoDataForm.controls["noOfchildren"].setValue(
        this.noOfchildrenInit
      );
      this.additionalInfoDataForm.controls[
        "numberOfAccidentLast5Years"
      ].setValue(this.noOfAccidentInit);
      this.additionalInfoDataForm.controls["medicalConditions"].setValue(
        this.medicalConditionsInit
      );
      this.birthdateLabel = true;

      if (this.fixedMainDriverData.value != "") {
        if (this.fixedMainDriverData.value[2].charAt(0) == 1) {
          this.showFixedHijriCalendar = true;
          this.showFixedMeladiCalendar = false;
        } else {
          this.showFixedMeladiCalendar = true;
          this.showFixedHijriCalendar = false;
        }
      }
    }
    if (this.vehicleIinitDetails != null) {
      this.vehicleVal = this.vehicleIinitDetails.estimatedVehiclePrice;
      //
      this.fixedFormData.controls["vehicleValue"].setValue(
        this.vehicleVal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      );
      this.transimissiontypesSelect = this.vehicleIinitDetails.transmissionTypeId;
      this.additionalInfoDataForm.controls["transimissiontypes"].setValue(
        this.transimissiontypesSelect
      );
      this.parkingLocation = this.vehicleIinitDetails.parkingLocationId;
      this.additionalInfoDataForm.controls["parkingLocation"].setValue(
        this.parkingLocation
      );
      this.kilometersSelect = this.vehicleIinitDetails.MileageExpectedAnnualId;
      this.additionalInfoDataForm.controls["kilometers"].setValue(
        this.kilometersSelect
      );
      this.updates = this.vehicleIinitDetails.modification;
      this.additionalInfoDataForm.controls["updates"].setValue(this.updates);
      this.vehicleMakerCode = this.vehicleIinitDetails.vehicleMakerCode;
      this.vehicleMaker = this.vehicleIinitDetails.vehicleMaker;
      this.model = this.vehicleIinitDetails.model;
      this.vehicleModelYear = this.vehicleIinitDetails.vehicleModelYear;
      this.plateColor = this.vehicleIinitDetails.plateColor;
      this.carPlateText1 = this.vehicleIinitDetails.carPlateText1;
      this.carPlateText2 = this.vehicleIinitDetails.carPlateText2;
      this.carPlateText3 = this.vehicleIinitDetails.carPlateText3;
      this.carPlateNumber = this.vehicleIinitDetails.carPlateNumber;
      this.carPlateNumberAr = this.vehicleIinitDetails.carPlateNumberAr;
      this.carPlateNumberEn = this.vehicleIinitDetails.carPlateNumberEn;
      this.carPlateTextAr = this.vehicleIinitDetails.carPlateTextAr;
      this.carPlateTextEn = this.vehicleIinitDetails.carPlateTextEn;
      this.PlateTypeCode = this.vehicleIinitDetails.PlateTypeCode;
      this.id = this.vehicleIinitDetails.id;
      this.cylinders = this.vehicleIinitDetails.cylinders;
      this.licenseExpiryDate = this.vehicleIinitDetails.licenseExpiryDate;
      this.majorColor = this.vehicleIinitDetails.majorColor;
      this.minorColor = this.vehicleIinitDetails.MinorColor;
      this.registerationPlace = this.vehicleIinitDetails.registerationPlace;
      this.vehicleBodyCode = this.vehicleIinitDetails.vehicleBodyCode;
      this.vehicleWeight = this.vehicleIinitDetails.vehicleWeight;
      this.vehicleLoad = this.vehicleIinitDetails.vehicleLoad;
      this.chassisNumber = this.vehicleIinitDetails.chassisNumber;
      this.vehicleModelCode = this.vehicleIinitDetails.vehicleModelCode;
      this.brakeSystemId = this.vehicleIinitDetails.brakeSystemId;
      this.cruiseControlTypeId = this.vehicleIinitDetails.cruiseControlTypeId;
      this.parkingSensorId = this.vehicleIinitDetails.parkingSensorId;
      this.cameraTypeId = this.vehicleIinitDetails.cameraTypeId;
      this.currentMileageKM = this.vehicleIinitDetails.currentMileageKM;
      this.hasAntiTheftAlarm = this.vehicleIinitDetails.hasAntiTheftAlarm;
      this.hasFireExtinguisher = this.vehicleIinitDetails.hasFireExtinguisher;
      this.carImage = this.vehicleIinitDetails.carImage;

      this.manufactureYearInit = this.vehicleIinitDetails.manufactureYear;
    } 
    else {
      this.transimissiontypesSelect = 1;
      this.parkingLocation = 1;
      this.kilometersSelect = 1;

      this.vehicleMakerCode = null;
      this.vehicleMaker = null;
      this.model = null;
      this.vehicleModelYear = null;
      this.plateColor = null;
      this.carPlateText1 = null;
      this.carPlateText2 = null;
      this.carPlateText3 = null;
      this.carPlateNumber = null;
      this.carPlateNumberAr = null;
      this.carPlateNumberEn = null;
      this.carPlateTextAr = null;
      this.carPlateTextEn = null;
      this.PlateTypeCode = null;
      this.id = null;
      this.cylinders = null;
      this.licenseExpiryDate = null;
      this.majorColor = null;
      this.minorColor = null;
      this.registerationPlace = null;
      this.vehicleBodyCode = null;
      this.vehicleWeight = null;
      this.vehicleLoad = null;
      this.chassisNumber = null;
      this.vehicleModelCode = null;
      this.brakeSystemId = null;
      this.cruiseControlTypeId = null;
      this.parkingSensorId = null;
      this.cameraTypeId = null;
      this.currentMileageKM = null;
      this.hasAntiTheftAlarm = null;
      this.hasFireExtinguisher = null;
      this.carImage = null;
    }

    $("#loader_S").css("display", "none");
    $("img.logoInHeader").css("display", "block");
    $(".validateFire").hide();
    $("img.logoInHeader").css("display", "block");
    $("#backClicked").click(function () {
      window.history.back();
    });
    $("#mainSideBarNew").css("width", "100%");

    this.parentReqIdFromFE = localStorage.getItem("parentReqIdFromFE");
    // this.getAllRelationShips();

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }



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

  fillDateHijriMonth(e) {
    this.selectedMont = this.fixedFormData.controls["hijrimonth"].value;
  }

  fillDateHijriYear() {
    this.selectedYear = this.fixedFormData.controls["hijriyear"].value;
    this.fullDateToSend();
  }

  fillDateMeladiMonth(e) {
    this.selectedMont = this.fixedFormData.controls["meladimonth"].value;
  }

  fillDateMeladiYear() {
    this.selectedYear = this.fixedFormData.controls["meladiyear"].value;
    this.fullDateToSend();
  }

  fullDateToSend() {
    this.customFullDate = this.selectedYear + "-" + this.selectedMont;
  }

  vehicleValueChange() {
    var carValu = this.fixedFormData.controls["vehicleValue"].value;
    var removeCommaFrmVehValue = parseFloat(carValu.replace(/,/g, ""));
    this.vehicleVal = removeCommaFrmVehValue;
    console.log(this.vehicleVal);
    //
  }

  generateYears(min, max) {
    for (let i = min; i <= max; i++) {
      this.hijriyears.push(i);
    }
    if (!this.hijriyears.includes(this.hijriyear)) {
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

  getAllRelationShips() {
    this.http.get(environment.inquiry + "all-relationsShip", {}).subscribe(
      (res: any) => {
        console.log(res);
        if (res.errorCode == 12) {
        } else {
          this.relationsShips = res.data;
        }
      },
      (err) => {
        console.log("Error occured");
      }
    );
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

  minValueFiledsvehicleValue(control: FormControl): { [s: string]: boolean } {
    if (control.value != null && control.value != "") {
      if (!isNullOrUndefined(control.value)) {
        if (control.value < 20000) {
          return { vehicleValueLength: true };
        } else {
          return null;
        }
      }
    }
  }

  ngAfterViewChecked() {
    this.data.currentCustomLanguage.subscribe((lang) => (this.lang = lang));
    let myStorage = window.localStorage;
    this.mycurrentLangu = myStorage.getItem("currentLanguage");
    this.myLanguageCus = this.mycurrentLangu;
    if (this.myLanguageCus == "English") {
      this.langToBEAPIs = 1;
    } else {
      this.langToBEAPIs = 0;
    }
    this.cdRef.detectChanges();
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

  openCompanyMainDriverDetailsInfo() {
    $(".openCompanyMainDriverDetailsInfo").addClass("activeClsDriver");
    $(".iconsBGClassArrowAfter").removeClass("activeClsDriver");
    $(".iconbgInfoDetai").removeClass("activeClsDriver");
    this.showCompanyMainDriverDetailsInfo = true;
    this.showDriverDetailsInfo = false;
    this.showDetailsContentInfo = false;
    this.showAdditionalDriverGrid = false;
    this.showAdditionalDriverToggleBtn = false;
  }
  openDriverDetailsInfo() {
    $(".openCompanyMainDriverDetailsInfo").removeClass("activeClsDriver");
    $(".iconsBGClassArrowAfter").addClass("activeClsDriver");
    $(".iconbgInfoDetai").removeClass("activeClsDriver");
    this.showCompanyMainDriverDetailsInfo = true;
    this.showDetailsContentInfo = false;
    this.showAdditionalDriverGrid = true;
    this.showAdditionalDriverToggleBtn = true;
  }
  toggleDriver(e) {
    this.addNewDriversContainer = e;
  }

  next(data) {
    console.log("next " + data);
  }

  backPrev() {
    window.history.back();
  }
  addDriver() {
    this.isAdditionalDriver = true;
    this.showDriverDetailsInfo = true;
    this.showEditedAdditionalDriverForm = false;
    this.showAdditionalDriverToggleBtn = false;
  }

  deleteSelectedDriver(driver) {
    this.driverArrayToDrawGrid.splice(driver, 1);
    for (var i = 0; i < this.driverArrayToDrawGrid.length; i++) {
      this.drivingPercentageAfterDelete = this.driverArrayToDrawGrid[
        i
      ].drivingPercentage;
      var ret = this.drivingPercentageAfterDelete.replace("%", "");
      this.drivingPercentageAfterDelete = JSON.parse(ret);
      this.drivingPercentArray.push(this.drivingPercentageAfterDelete);
      this.data.setDrivingPercentage(this.drivingPercentArray);
    }
    this.listOfAdditionalDriversToSubmit.splice(driver - 1, 1);
    if (this.driverArrayToDrawGrid.length >= 3) {
      this.showAdditionalDriverToggleBtn = false;
    } else {
      this.showAdditionalDriverToggleBtn = true;
    }
  }
  currectDriver: any;
  editSelectedDriver(driver) {
    debugger
    this.isEditMode = true;
    if(this.retriveDrivers.value != "")
    {
      this.isEdit = true;
    }
    else
    {
      this.isEdit = false;
    }
    debugger
    this.showAdditionalDriverToggleBtn = true;
    this.addNewDriversContainer = true;
    if (
      this.currectDriver != null &&
      this.currectDriver.nationalId !=
        this.driverArrayToDrawGrid[driver].nationalId
    ) {
      this.driverArrayToDrawGrid.push(this.currectDriver);
      this.currectDriver = null;
    }
    this.currectDriver = null;
    this.currectDriver = this.driverArrayToDrawGrid[driver];
    this.driverArrayToDrawGrid.splice(driver, 1);
    this.listOfAdditionalDriversToSubmit.splice(driver - 1, 1);
    this.formdataDrivers = this.fb.group({
      nationalId: new FormControl(
        this.currectDriver.nationalId,
        Validators.required
      ),
      hijrimonth: new FormControl(
        this.currectDriver.hijrimonth,
        Validators.required
      ),
      hijriyear: new FormControl(
        this.currectDriver.hijriyear,
        Validators.required
      ),
      meladimonth: new FormControl(
        this.currectDriver.meladimonth,
        Validators.required
      ),
      meladiyear: new FormControl(
        this.currectDriver.meladiyear,
        Validators.required
      ),
      drivingPercentage: new FormControl(
        this.currectDriver.drivingPercentage,
        Validators.required
      ),
      educationLevel: new FormControl(this.currectDriver.educationLevel, [
        Validators.required,
      ]),
      medicalConditions: new FormControl(this.currectDriver.medicalConditions, [
        Validators.required,
      ]),
      numberOfAccidentLast5YearsRange: new FormControl(
        this.currectDriver.numberOfAccidentLast5YearsRange,
        [Validators.required]
      ),
      noOfchildrenDriver: new FormControl(
        this.currectDriver.noOfchildrenDriver,
        [Validators.required]
      ),
      relationsShip: new FormControl(this.currectDriver.relationsShip, [
        Validators.required,
      ]),
      violation: new FormControl(this.currectDriver.violation),
      homeCity: new FormControl(this.currectDriver.homeCity),
      workCity: new FormControl(this.currectDriver.workCity),
      allCountries: new FormControl(this.currectDriver.allCountries),
      licenseYearsList: new FormControl(this.currectDriver.licenseYearsList),
    });
    if (this.currectDriver.nationalId.charAt(0) == "1") {
      this.formdataDrivers.get("meladimonth").clearValidators();
      this.formdataDrivers.get("meladimonth").setValidators(null);
      this.formdataDrivers.get("meladimonth").updateValueAndValidity();
      this.formdataDrivers.get("meladiyear").clearValidators();
      this.formdataDrivers.get("meladiyear").setValidators(null);
      this.formdataDrivers.get("meladiyear").updateValueAndValidity();
    } else {
      this.formdataDrivers.get("hijrimonth").clearValidators();
      this.formdataDrivers.get("hijrimonth").setValidators(null);
      this.formdataDrivers.get("hijrimonth").updateValueAndValidity();
      this.formdataDrivers.get("hijriyear").clearValidators();
      this.formdataDrivers.get("hijriyear").setValidators(null);
      this.formdataDrivers.get("hijriyear").updateValueAndValidity();
    }
  }

  openDetailsContentInfo() {
    $(".openCompanyMainDriverDetailsInfo").removeClass("activeClsDriver");
    $(".iconsBGClassArrowAfter").removeClass("activeClsDriver");
    $(".iconbgInfoDetai").addClass("activeClsDriver");
    this.showCompanyMainDriverDetailsInfo = false;
    this.showAdditionalDriverGrid = false;
    this.showAdditionalDriverToggleBtn = false;
    this.showDriverDetailsInfo = false;
    this.showDetailsContentInfo = true;
  }

  showAdditionalDrivers() {
    this.showAdditionalDriversBool = true;
    this.showAdditionalInfoBool = false;
    this.showOffersBool = false;
    this.toggleDriver(false);
  }

  showAdditionalInfo() {
    this.toggleDriver(false);
    this.showAdditionalDriversBool = false;
    this.showAdditionalInfoBool = true;
    this.showOffersBool = false;
  }

  showOffers() {
    this.addNewDriversContainer = false;
    this.showOffersBool = true;
    this.showAdditionalDriversBool = false;
    this.showAdditionalInfoBool = false;
  }
  minValueFiledsUpdates(control: FormControl): { [s: string]: boolean } {
    if (control.value != null && control.value != "") {
      if (!isNullOrUndefined(control.value)) {
        if (control.value.length < 5) {
          return { updatesLength: true };
        }
        else {
          return null;
        }
      }
    }
  }


  submitIquiryBecare() {
    //  let vehicleIdfromInitInq = this.vehicleIinitDetails.id;
    this.data.getworkCityAddInfo();
    var workCityNameAddInfo = this.data.getworkCityAddInfo().value;
    this.submitted = true;
    this.loading = true;
    let mobileNumber = window.localStorage.getItem("MobileNo");
    let userID = window.localStorage.getItem("UserId");
    if (this.vehicleIinitDetails == null) {
      this.additionalInfoDataForm.controls["parkingLocation"].setValue(
        this.parkingLocation
      );
      this.additionalInfoDataForm.controls["transimissiontypes"].setValue(
        this.transimissiontypesSelect
      );
      this.additionalInfoDataForm.controls["kilometers"].setValue(
        this.kilometersSelect
      );
    }
    if (this.mainDriverData.value.drivers == null) {
      this.educationLevelInit = 1;
      this.noOfchildrenInit = 0;
      this.noOfAccidentInit = 0;
      this.medicalConditionsInit = 1;
      this.additionalInfoDataForm.controls["educationLevel"].setValue(
        this.educationLevelInit
      );
      this.additionalInfoDataForm.controls["noOfchildren"].setValue(
        this.noOfchildrenInit
      );
      this.additionalInfoDataForm.controls[
        "numberOfAccidentLast5Years"
      ].setValue(this.noOfAccidentInit);
      this.additionalInfoDataForm.controls["medicalConditions"].setValue(
        this.medicalConditionsInit
      );
    }

    this.educationLevel = this.additionalInfoDataForm.controls[
      "educationLevel"
    ].value;
    this.noOfchildren = this.additionalInfoDataForm.controls[
      "noOfchildren"
    ].value;
    this.noOfAccident = this.additionalInfoDataForm.controls[
      "numberOfAccidentLast5Years"
    ].value;
    this.medicalConditionsSelect = this.additionalInfoDataForm.controls[
      "medicalConditions"
    ].value;
    this.transimissiontypesSelect = this.additionalInfoDataForm.controls[
      "transimissiontypes"
    ].value;
    this.parkingLocation = this.additionalInfoDataForm.controls[
      "parkingLocation"
    ].value;
    this.kilometersSelect = this.additionalInfoDataForm.controls[
      "kilometers"
    ].value;
    this.mainDriverViolation = this.data.getMainDriverViolations().value;
    this.workCityAddInfo = this.additionalInfoDataForm.controls[
      "workCityAddInfo"
    ].value;
    this.countryAddInfo = this.additionalInfoDataForm.controls[
      "countryAddInfo"
    ].value;
    this.licenseYearsListAddInfo = this.additionalInfoDataForm.controls[
      "licenseYearsListAddInfo"
    ].value;
    this.updates = this.additionalInfoDataForm.controls["updates"].value;


      this.updatesCheck  = this.data.getCheckUpdates()

      if(this.updatesCheck.value == true )
      {
        // this.additionalInfoDataForm.get("updates").setValidators([Validators.required]);
          this.additionalInfoDataForm.get("updates").setValidators([Validators.required,
          this.minValueFiledsUpdates.bind(this),
        ]);

         if(this.additionalInfoDataForm.controls["updates"].invalid || 
          this.additionalInfoDataForm.controls["updates"].value.length < 5)
          {
            this.errorUpdateMsg = true;
            if (this.myLanguageCus == "English") {
              this.updateRequired = "updates Required";
              } 
              else {
                this.updateRequired = "التعديلات مطلوبة";
              }
              this.loading = false;
              return false;
          }

          else{
            this.errorUpdateMsg = false;
            this.updateRequired = " ";
            this.loading = true;
           }
        
      }
      

     

    if (this.mainDriverData.value.drivers != null) {
      if (
        this.mainDriverData.value.drivers[0].birthDateMonth == null &&
        this.mainDriverData.value.drivers[0].birthDateYear == null
      ) {
        if (this.mainDriverData.value.drivers[0].nationalId.charAt(0) == 1) {
          if (
            this.fixedFormData.controls["hijrimonth"].invalid ||
            this.fixedFormData.controls["hijriyear"].invalid ||
            this.fixedFormData.controls["vehicleValue"].invalid
          ) {
            this.loading = false;
            return false;
          } else {
            this.loading = true;
          }
        } else {
          if (
            this.fixedFormData.controls["meladimonth"].invalid ||
            this.fixedFormData.controls["meladiyear"].invalid ||
            this.fixedFormData.controls["vehicleValue"].invalid
          ) {
            this.loading = false;
            return false;
          } else {
            this.loading = true;
          }
        }
      } else {
        if (this.fixedFormData.controls["vehicleValue"].invalid) {
          this.loading = false;
          return false;
        } else {
          this.loading = true;
        }
      }
    } 
    else {
      if (this.fixedMainDriverData.value[2].charAt(0) == 1) {
        if (
          this.fixedFormData.controls["hijrimonth"].invalid ||
          this.fixedFormData.controls["hijriyear"].invalid ||
          this.fixedFormData.controls["vehicleValue"].invalid
        ) {
          this.loading = false;
          return false;
        } else {
          this.loading = true;
        }
      } else {
        if (
          this.fixedFormData.controls["meladimonth"].invalid ||
          this.fixedFormData.controls["meladiyear"].invalid ||
          this.fixedFormData.controls["vehicleValue"].invalid
        ) {
          this.loading = false;
          return false;
        } else {
          this.loading = true;
        }
      }
    }

    let typeVehicleId = this.fixedMainDriverData.value[0];
    let sequenceNum;
    let CustomNumber;
    let vehicleIdBs;
    let manufactureYearVal;

    if (typeVehicleId == 1) {
      localStorage.setItem("typeVehicleId", "1");
      sequenceNum = this.fixedMainDriverData.value[4];
      vehicleIdBs = sequenceNum;
      CustomNumber = null;
      manufactureYearVal = this.manufactureYearInit;
    } else {
      localStorage.setItem("typeVehicleId", "2");
      CustomNumber = this.fixedMainDriverData.value[5];
      vehicleIdBs = CustomNumber;
      sequenceNum = null;
      manufactureYearVal = this.manufactureYear;
    }
    this.driversArray = this.formdataDrivers.value;

    if (this.myLanguageCus == "Arabic") {
      this.myLanguageCus = "ar";
    } else {
      this.myLanguageCus = "en";
    }
    if (this.countryAddInfo == null || this.licenseYearsListAddInfo == null) {
      this.driverExtraLicensesArray = []
    } else {
      this.driverExtraLicenses = {
        countryId: this.countryAddInfo,
        licenseYearsId: this.licenseYearsListAddInfo,
      };
      this.driverExtraLicensesArray.push(this.driverExtraLicenses)
    }

    if (
      this.fixedMainDriverData.value[6] == null ||
      this.fixedMainDriverData.value[6] == ""
    ) {
      this.ownerTransfer = false;
      this.ownerNationalId = null;
      this.oldOwnerNin = null;
      this.isCustomerCurrentOwnerVal = true;
      this.isVehicleExistVal = true;
    } else {
      this.ownerTransfer = true;
      this.ownerNationalId = this.fixedMainDriverData.value[6];
      this.oldOwnerNin = this.fixedMainDriverData.value[6];
      this.isCustomerCurrentOwnerVal = false;
      this.isVehicleExistVal = false;
    }

    console.log(this.listOfAdditionalDriversToSubmit);

    if (this.listOfAdditionalDriversToSubmit.length == 0) {
      this.mainDriverDrivingPercentage = 100;
    } else {
      var total = 0;
      for (var i = 0; i < this.listOfAdditionalDriversToSubmit.length; i++) {
        var percentage = this.listOfAdditionalDriversToSubmit[i]
          .drivingPercentage;
        this.drivingPercentageFromList = percentage;
        total = total + this.drivingPercentageFromList;
      }
      this.mainDriverDrivingPercentage = 100 - total;
    }
    if (this.updates == "") {
      this.hasModification = false;
    } 
    else {
      this.hasModification = true;
    }

    if (this.myLanguageCus == "en") {
      this.langToBEAPIs = 2;
    } 
    else {
      this.langToBEAPIs = 1;
    }

    this.cityCode = this.mainDriverData.value.cityCode;
    if(this.cityCode == null)
    {
      this.cityCode = 1;
    }

    let submitRequest = {
      cityCode: this.cityCode,
      policyEffectiveDate: this.fixedMainDriverData.value[3],
      oldOwnerNin: this.oldOwnerNin,
      isCustomerCurrentOwner: this.isCustomerCurrentOwnerVal,
      isVehicleExist: this.isVehicleExistVal,
      isVehicleUsedCommercially: false,
      isCustomerSpecialNeed: false,
      isMainDriverExist: true,
      isRenualRequest: false,
      externalId: null,
      referenceId: null,
      language: this.langToBEAPIs,
      channel:"portal",
      isShowQuotationsDisable: true,
      drivers: [
        {
          nationalId: this.fixedMainDriverData.value[2],
          medicalConditionId: this.medicalConditionsSelect,
          violationIds: this.mainDriverViolation,
          licenseExpiryMonth: null,
          licenseExpiryYear: null,
          edcuationId: this.educationLevel,
          childrenBelow16Years: this.noOfchildren,
          drivingPercentage: this.mainDriverDrivingPercentage,
          birthDateMonth: this.selectedMont,
          birthDateYear: this.selectedYear,
          driverExtraLicenses: this.driverExtraLicensesArray,
          driverNOALast5Years: this.noOfAccident,
          driverWorkCityCode: this.workCityAddInfo,
          driverWorkCity: workCityNameAddInfo,
          driverHomeCityCode: null,
          driverHomeCity: null,
          isCompanyMainDriver: false,
          relationShipId: 0,
          mobileNo: null,
        },
      ],
      insured: {
        nationalId: this.fixedMainDriverData.value[2],
        birthDateMonth: this.selectedMont,
        birthDateYear: this.selectedYear,
        edcuationId: this.educationLevel,
        childrenBelow16Years: this.noOfchildren,
        insuredWorkCityCode: this.workCityAddInfo,
        insuredWorkCity: null,
        driverExtraLicenses: this.driverExtraLicensesArray,
      },
      vehicle: {
        vehicleMakerCode: this.vehicleMakerCode,
        vehicleMaker: this.vehicleMaker,
        model: this.model,
        vehicleModelYear: this.vehicleModelYear,
        plateColor: this.plateColor,
        carPlateText1: this.carPlateText1,
        carPlateText2: this.carPlateText2,
        carPlateText3: this.carPlateText3,
        carPlateNumber: this.carPlateNumber,
        carPlateNumberAr: this.carPlateNumberAr,
        carPlateNumberEn: this.carPlateNumberEn,
        carPlateTextAr: this.carPlateTextAr,
        carPlateTextEn: this.carPlateTextEn,
        PlateTypeCode: this.PlateTypeCode,
        id: this.id,
        sequenceNumber: this.fixedMainDriverData.value[4],
        customCardNumber: this.fixedMainDriverData.value[5],
        cylinders: this.cylinders,
        licenseExpiryDate: this.licenseExpiryDate,
        majorColor: this.majorColor,
        MinorColor: this.minorColor,
        modelYear: Number(manufactureYearVal),
        registerationPlace: this.registerationPlace,
        vehicleBodyCode: this.vehicleBodyCode,
        vehicleWeight: this.vehicleWeight,
        vehicleLoad: this.vehicleLoad,
        chassisNumber: this.chassisNumber,
        vehicleModelCode: this.vehicleModelCode,
        vehicleId: vehicleIdBs,
        estimatedVehiclePrice: this.vehicleVal,
        manufactureYear: Number(manufactureYearVal),
        VehicleIdTypeId: typeVehicleId,
        hasModification: this.hasModification,
        modification: this.updates,
        transmissionTypeId: this.transimissiontypesSelect,
        parkingLocationId: this.parkingLocation,
        ownerTransfer: this.ownerTransfer,
        ownerNationalId: this.ownerNationalId,
        brakeSystemId: this.brakeSystemId,
        cruiseControlTypeId: this.cruiseControlTypeId,
        parkingSensorId: this.parkingSensorId,
        cameraTypeId: this.cameraTypeId,
        currentMileageKM: this.currentMileageKM,
        hasAntiTheftAlarm: this.hasAntiTheftAlarm,
        hasFireExtinguisher: this.hasFireExtinguisher,
        carImage: this.carImage,
        MileageExpectedAnnualId: this.kilometersSelect,
      },
    };

    // this.retriveDrivers.value.forEach((item) => {
    //   submitRequest.drivers.push(item);
    // });
    this.listOfAdditionalDriversToSubmit.forEach((item) => {
      submitRequest.drivers.push(item);
    });

    $(".dimmedNextSubmit").attr("disabled", "disabled");
    this.showLoading = true;
    const req = this.http
      .post(environment.inquiry + "submit-inquiry-request", submitRequest)
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res.ErrorCode != 1) {
            this.showErrDescSubmitInq = true;
            this.servererror = res.ErrorDescription;
            this.showLoading = false;
            this.loading = false;
            $(".dimmedNextSubmit").removeAttr("disabled");
          } 
          else {
            this.loading = true;
            $(".dimmedNextSubmit").removeAttr("disabled");
            let quotationRequestExternalId =
              res.inquiryResponseModel.quotationRequestExternalId;
            if (res.inquiryResponseModel.yakeenMissingFields != null &&
                res.inquiryResponseModel.yakeenMissingFields.length > 0 ) 
            {
              this.data.changeMissingFields(res.inquiryResponseModel.yakeenMissingFields);
              this.router.navigate(["/missing-fields/" + quotationRequestExternalId]);
            } 
            else {
              this.router.navigate([
                "/newQuotations/" + quotationRequestExternalId,
              ]);
            }

            // this.data.setVehicleDetails(submitRequest.vehicle)
            localStorage.setItem("vehicleValue", this.vehicleVal);
            this.data.setOtherInfoDriverData([
              this.educationLevel,
              this.noOfchildren,
              this.noOfAccident,
              this.medicalConditionsSelect,
              this.transimissiontypesSelect,
              this.parkingLocation,
              this.kilometersSelect,
              this.workCityAddInfo,
              this.countryAddInfo,
              this.licenseYearsListAddInfo,
              this.updates,
            ]);
            this.showLoading = false;
          }
        },
        (err) => {
          this.loading = false;
          $(".dimmedNextSubmit").removeAttr("disabled");
          this.showErrDescSubmitInq = true;
          console.log("Error occured");
          this.showLoading = false;
          if (this.myLanguageCus != "English") {
            this.servererror = "حدث خطأ";
          } else {
            this.servererror = "Something went wrong";
          }
        }
      );
  }
}
