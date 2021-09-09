import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
declare var $: any;
import { Slick } from 'ngx-slickjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-national-address',
  templateUrl: './national-address.component.html',
  styleUrls: ['./national-address.component.css']
})
export class NationalAddressComponent implements OnInit {
  mycurrentLangu: any;
  myLanguageCus: any;
  langToBEAPIs: any;
  loading = false;
  modelToUpdate:any;
  elemId:any;
  nationalAddresses: any;
  showLoading = false;
  pagesCountMoreThanten = false;
  noOfPagesLabels: any;
  nationalAddressesCount: any;
  address: any;
  allCities: any;
  cityName: any;
  formdata: FormGroup;
  pageNumber = 1;
  serverError = false;
  arrayNoOfPages: any[] = [];
  arrayLength = 10;
  config: Slick.Config = {
    infinite: true,
    slidesToShow: 20,
    slidesToScroll: 10,
    dots: false,
    autoplay: false,
  }
  updateNationalAddress: any = [true];
  saveUpdationgAddress:any = [false];
  city:any;

  @Output() onPageChange: EventEmitter<number> = new EventEmitter();

  constructor(private http: HttpClient, private cdRef: ChangeDetectorRef, public fb: FormBuilder,) { }

  ngOnInit() {
    this.getNationalAddress(this.pageNumber)
    this.getAllCities()
  }

  getArray(count: number) {
    return new Array(count)
  }

  ngAfterViewChecked() {
    this.mycurrentLangu = window.localStorage.getItem("currentLanguage");
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
        console.log( this.allCities)    
      },
      err => {
        console.log("Error occured");
      })
  }

  changeCity(cityCode, cityName,id) {
    this.city = cityCode;
    this.cityName = cityName;
    this.updateNationalAddress[id] = true;
  }

  getNationalAddress(pageNumber) {
    this.showLoading = true;
    this.mycurrentLangu = window.localStorage.getItem("currentLanguage");
    this.myLanguageCus = this.mycurrentLangu;
    if (this.myLanguageCus == 'English') {
      this.langToBEAPIs = "en";
    } else {
      this.langToBEAPIs = "ar";
    }

    this.http.get(environment.profile + "getNationalAddressesByUserId?channel=" + 'portal' + "&" + 'lang=' + this.langToBEAPIs
      + "&" + 'pageIndx=' + pageNumber + "&" + "pageSize=" + 10, {
    }).subscribe(
      (res: any) => {
        if (res.ErrorCode != 1) {
          this.showLoading = false;
        }
        else {
          this.showLoading = false;
          this.nationalAddresses = res.Result.Addresses;
          this.nationalAddressesCount = res.Result.TotalCount;
          for(var i= 0; i< this.nationalAddresses.length; i++)
          {
            this.updateNationalAddress[this.nationalAddresses[i].Id] = true;
            this.saveUpdationgAddress[this.nationalAddresses[i].Id] = false;
          }
          if (this.nationalAddressesCount > 10) {
            this.pagesCountMoreThanten = true;
            this.noOfPagesLabels = ((this.nationalAddressesCount / 10) + 1);
            this.noOfPagesLabels.toFixed(2) * 1;
            for (let i = 1; i < this.noOfPagesLabels; i++) {
              this.arrayNoOfPages.push(i);
            }
            
          }
        }
      },
      err => {
        console.log("Error occured");
      })
  }

  recallGetNationalAddress(pageNumber) {
    this.showLoading = true;
    this.mycurrentLangu = window.localStorage.getItem("currentLanguage");
    this.myLanguageCus = this.mycurrentLangu;
    if (this.myLanguageCus == 'English') {
      this.langToBEAPIs = "en";
    } else {
      this.langToBEAPIs = "ar";
    }

    this.http.get(environment.profile + "getNationalAddressesByUserId?channel=" + 'portal' + "&" + 'lang=' + this.langToBEAPIs
      + "&" + 'pageIndx=' + pageNumber + "&" + "pageSize=" + 10, {
    }).subscribe(
      (res: any) => {
        if (res.ErrorCode != 1) {
          this.showLoading = false;
        }
        else {
          this.showLoading = false;
          this.nationalAddresses = res.Result.Addresses;
          for(var i= 0; i< this.nationalAddresses.length; i++)
          {
            this.updateNationalAddress[this.nationalAddresses[i].Id] = true;
            this.saveUpdationgAddress[this.nationalAddresses[i].Id] = false;
          }
        }
      },
      err => {
        console.log("Error occured");
      })
  }

  updateAddInteg(){
    
    
   let buildingNo = $("#buildingNo" + this.elemId).val();
   let streetName = $("#streetName" + this.elemId).val();
   let postalCode = $("#postalCode" + this.elemId).val();
   let district = $("#district" + this.elemId).val();
   let additionalNo  = $("#additionalNo" + this.elemId).val();

    
    console.log(this.modelToUpdate);
   this.address = {
      Id: this.elemId,
      AdditionalNumber: additionalNo,
      BuildingNumber: buildingNo,
      City:this.cityName,
      CityId: this.city,
      District: district,
      PostCode:postalCode,
      Street:streetName,
    }
    this.updateNationalAddress[this.elemId] = true;
    this.saveUpdationgAddress[this.elemId] = false;
    this.http.post(environment.profile + "updateNationalAddress", {
      Address: this.address,
      Lang: this.langToBEAPIs,
      Channel: 'portal'
    }).subscribe(
      (res: any) => {
        if (res.ErrorCode != 1) {
          this.showLoading = false;
          $(".disAll").attr('disabled', 'disabled');
          $(".disAll").css("border","0px solid red");
        }
        else {
          $(".disAll").css("border","none");
          this.showLoading = false;
          // this.nationalAddresses = res.Result;
          this.getNationalAddress(1);
        }
      },
      err => {
        console.log("Error occured");
      })

  }

  updateAddress(data, id) {    
    
    $(".disAll").attr('disabled', 'disabled');
    $(".disAll").css("border","0px solid grey");  
    $(".inputEdit" + id).css("border","2px solid #c5c4c4");
    $(".inputEdit" + id).removeAttr("disabled");
    this.updateNationalAddress[id] = false;
    this.saveUpdationgAddress[id] = true;

    this.modelToUpdate = data;
    this.elemId =id;
  }

}
