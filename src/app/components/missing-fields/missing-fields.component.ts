import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material';
import { Router } from '@angular/router';
import { EventEmitterService } from 'src/app/core/events/eventEmitter';
import { ShareDataService } from 'src/app/services/share-data.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-missing-fields',
  templateUrl: './missing-fields.component.html',
  styleUrls: ['./missing-fields.component.css']
})
export class MissingFieldsComponent implements OnInit {
  missingFields: any;
  modelDDL: any;
  vehicleModelIDMake: any;
  formdata: FormGroup;
  showLoading = false;
  quotationRequestExternalId: any;
  servererror = "";
  showErrDescInitInq = false;
  myLanguageCus: any;
  mycurrentLangu: any;
  lang: any;
  langToBEAPIs: any;

  constructor(public fb: FormBuilder, private http: HttpClient, private router: Router,
    private data: ShareDataService, public datepipe: DatePipe,
    private eventEmitterService: EventEmitterService,
    private cdRef: ChangeDetectorRef,) { }

  ngOnInit() {
    this.quotationRequestExternalId = this.router.url.substr(this.router.url.lastIndexOf('/') + 1);

    this.data.MissingFieldsObservable.subscribe(res => {
      if (res != null) {
        this.missingFields = res;
        console.log(this.missingFields)
      }
       this.formdata = this.fb.group([]);
      this.missingFields.forEach(element => {
        if (element.required && ( element.key !="VehicleModel" && element.key !="VehicleMaker")) {
          this.formdata.addControl(element.key, new FormControl(element.value, Validators.required));
        }
        else {
          this.formdata.addControl(element.key, new FormControl(element.value));
        }

      });

    })
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

  
  public restrictNumeric(e) {
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


  @ViewChild('policyStartDateToFocus', { static: false }) _policyStartDateInput: ElementRef;

  _openCalendarPolicyStartDt(picker1: MatDatepicker<Date>) {
    picker1.open();
    setTimeout(() => this._policyStartDateInput.nativeElement.focus());
  }
  _closeCalendarPolicyStartDt(e) {
    setTimeout(() => this._policyStartDateInput.nativeElement.blur());
  }
  

  makeDDlChange(e,key) {
    if(key == "VehicleMakerCode"){        
      this.vehicleModelIDMake = e.id;
      this.getAllModels();  
      let makers = this.missingFields.filter(a => a.key == 'VehicleMakerCode')[0].options;
      let makerName = makers.filter( x=> x.id ==this.formdata.controls["VehicleMakerCode"].value);
      this.formdata.controls["VehicleMakerCode"].setValue(makerName[0].id) ;
      }
     }

  getAllModels() {
    this.http.get(environment.inquiry + "vehcileModels?" +"id=" + this.vehicleModelIDMake, {
    }).subscribe(
      (res: any) => {
        this.modelDDL = res.data;
        var index = this.missingFields.indexOf(this.missingFields.filter(x => x.key == 'VehicleModel')[0])
        this.missingFields[index].options = [];
        this.modelDDL.forEach(element => {
          this.missingFields[index].options.push({
            id: element.id,
            name: element.name
          });
        });

      },
      err => {
        console.log("Error occured");
      })

  }


  onClickSubmit() {
    this.showLoading = true;
    var request = this.formdata.value;
    var reqBody = {
      quotationRequestExternalId: this.quotationRequestExternalId,
      yakeenMissingFields:this.formdata.value
    }

    const req = this.http.post(environment.inquiry + "submit-yakeen-missing-fields", reqBody).subscribe(
      (res: any) => {
        console.log(res);
        this.showLoading = false;
        if ( res.errors !=null && res.errors.length > 0 ) {
          this.servererror = res.errorDescription;
          this.showErrDescInitInq = true;
        }
        else {
          this.router.navigate(['/quotations/' + this.quotationRequestExternalId]);
        }
      },
      err => {
        this.showLoading = false;
        this.servererror = err;
        this.showErrDescInitInq = true;
        console.log("Error occured");

      }
    )
  }

}
