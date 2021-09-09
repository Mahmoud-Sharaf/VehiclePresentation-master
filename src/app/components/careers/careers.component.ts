import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.css']
})
export class CareersComponent implements OnInit {
  formdata: FormGroup;
  CaptchaForm: FormGroup;
  notValidHere: any[] = [];
  @Input() submitted;
  errors: [];
  allCities:any;
  mycurrentLangu:any;
  myLanguageCus:any;
  langToBEAPIs:any;
  cityName:any;
  loading = false;
  showErrDesc = false;
  servererror = "";
  career:any;
  fileList:FileList;
  files:File[] = [];
  mobilePattern = /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;
  acceptTypes = [
    "pdf", "xls", "xlsb",
    "xlsm", "xlsx", "jpeg",
    "png", "gif","jpg",
    "psd"];
    fileSrc: string = "";
    
  constructor(public fb: FormBuilder, private http: HttpClient, private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.formdata = this.fb.group({
      fullName: new FormControl("",Validators.required ),
      email: new FormControl("",[Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]),
      phone: new FormControl("",[Validators.required,Validators.pattern(this.mobilePattern)]),
      birthDate: new FormControl("", Validators.required),
      city: new FormControl(null, Validators.required ),
      jobTitle: new FormControl("", Validators.required),
      employmentMsg: new FormControl(""),
      attachments:new FormControl("", Validators.required),
    });

    this.getAllCities()
    
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

  ngAfterViewChecked() {
    let myStorage = window.localStorage;
    this.mycurrentLangu = myStorage.getItem("currentLanguage");
    this.myLanguageCus = this.mycurrentLangu;
    if (this.myLanguageCus == 'English') {
      this.langToBEAPIs = "en";
    } else {
      this.langToBEAPIs = "ar";
    }
    this.cdRef.detectChanges();
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

  changeCity(cityName)
  {
    this.cityName = cityName
  }

  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
    console.log(file);
  }
  _handleReaderLoaded(e) {
    var reader = e.target;
    this.fileSrc = reader.result;
    console.log(this.fileSrc);
  }



  onClickSubmit(data) {
    this.loading = true;
    this.submitted = true;
    $(".send-btn").attr("disabled", "disabled"); 
    if (this.formdata.controls['fullName'].invalid || this.formdata.controls['birthDate'].invalid
    || this.formdata.controls['phone'].invalid || this.formdata.controls['email'].invalid 
    || this.formdata.controls['jobTitle'].invalid || this.formdata.controls['attachments'].invalid
    || this.formdata.controls['city'].invalid) {
      $(".send-btn").removeAttr("disabled");
      this.loading = false
      return false;
    }
    else
    {
      this.loading = true;
      $('.send-Btn').attr("disabled","disabled")
      this.http.post(environment.staticPages + "career/post", {
        fullName: data.fullName,
        email:data.email,
        mobileNo: data.phone,
        birthDate: data.birthDate,
        cityId: (data.city).toString(),
        cityName: this.cityName,
        jobTitle: data.jobTitle,
        fileToUpload: this.fileSrc.substring(this.fileSrc.lastIndexOf(",") + 1),
      }).subscribe(
        (res: any) => {
          if(res.ErrorCode != 1)
          {
            this.loading = false;
            this.showErrDesc = true;
            this.servererror = res.ErrorDescription;
            $('.send-Btn').removeAttr("disabled")
          }
          else
          {
            this.loading = false;
            this.showErrDesc = false;
            $('.send-Btn').removeAttr("disabled")
             this.career = res.Result;
          }
        },
        err => {
          console.log("Error occured");
        })
    }
  }
}
