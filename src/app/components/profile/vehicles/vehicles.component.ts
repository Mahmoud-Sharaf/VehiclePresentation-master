import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
declare var $: any;
import { Slick } from 'ngx-slickjs';


@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css']
})
export class VehiclesComponent implements OnInit {
  vehicles: any;
  mycurrentLangu: any;
  myLanguageCus: any;
  langToBEAPIs: any;
  showLoading = false;
  openPpUp: any;
  vehicleId: any;
  vehicleCount: any;
  @Input() totalRecords = 0;
  @Input() recordsPerPage = 0;
  pagesCountMoreThanten = false;
  noOfPagesLabels: any;
  arrayNoOfPages: any[] = [];
  arrayLength = 10;
  config: Slick.Config = {
    infinite: true,
    slidesToShow: 20,
    slidesToScroll: 10,
    dots: false,
    autoplay: false,
   
  }

  @Output() onPageChange: EventEmitter<number> = new EventEmitter();

  public pages: number[] = [];
  activePage: number;

  pageNumber =1;
  constructor(private http: HttpClient, private cdRef: ChangeDetectorRef) { }



  getArray(count: number) {
    return new Array(count)
  }

  ngOnInit() {
    this.getAllVehicles(this.pageNumber);
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

  getAllVehicles(pageNumber) {
    this.showLoading = true;
    this.mycurrentLangu = window.localStorage.getItem("currentLanguage");
    this.myLanguageCus = this.mycurrentLangu;
    if (this.myLanguageCus == 'English') {
      this.langToBEAPIs = "en";
    } else {
      this.langToBEAPIs = "ar";
    }
    let UserId = localStorage.getItem("UserId");
    this.http.post(environment.profile + "vehicles?userId=" + UserId + "&" + 'channel=' + 'portal' + "&" + 'language=' + this.langToBEAPIs
      + "&" + "pageNumber="+pageNumber, {
    }).subscribe(
      (res: any) => {
        if (res) {
          this.vehicles = res.Result.VehiclesList;
          this.vehicleCount = res.Result.VehiclesTotalCount;
          if (this.vehicleCount > 10) {
            this.pagesCountMoreThanten = true;
            this.noOfPagesLabels = ((this.vehicleCount / 10) + 1);
            this.noOfPagesLabels.toFixed(2) * 1;
            for (let i = 1; i < this.noOfPagesLabels; i++) {
              this.arrayNoOfPages.push(i);
            }
          }
          this.showLoading = false;
        }
        else {
        }
      },
      err => {
        console.log("Error occured");
      })

  }

  reCallGetVehicles(pageNumber) {
    this.showLoading = true;
    if (this.myLanguageCus == 'English') {
      this.langToBEAPIs = "en";
    } else {
      this.langToBEAPIs = "ar";
    }
    let UserId = localStorage.getItem("UserId");
    this.http.post(environment.profile + "vehicles?userId=" + UserId + "&" + 'channel=' + 'portal' + "&" + 'language=' + this.langToBEAPIs
      + "&" + "pageNumber="+pageNumber, {
    }).subscribe(
      (res: any) => {
        if (res) {     
          this.vehicles = res.Result.VehiclesList;
          this.showLoading = false;
        } else {
        }
      },
      err => {
        console.log("Error occured");
      })

  }

  searchGetAllVehicles() {
    if (this.myLanguageCus == 'English') {
      this.langToBEAPIs = "en";
    } else {
      this.langToBEAPIs = "ar";
    }
    let UserId = localStorage.getItem("UserId");
    this.http.post(environment.profile + "vehicles?userId=" + UserId + "&" + 'channel=' + 'portal' + "&" + 'language=' + this.langToBEAPIs, {
    }).subscribe(
      (res: any) => {
        if (res) {
          this.vehicles = res.Result.VehiclesList;
          console.log(this.vehicles);
        } else {

        }
      },
      err => {
        console.log("Error occured");
      })

  }

  filterAllVehicles() {
    if (this.myLanguageCus == 'English') {
      this.langToBEAPIs = "en";
    } else {
      this.langToBEAPIs = "ar";
    }
    let SequenceOrCustomCardNumber = $("#SequenceOrCustomCardNumber").val();
    let UserId = localStorage.getItem("UserId");
    this.http.post(environment.profile + "vehicles?userId=" + UserId + "&" + 'channel=' + 'portal' + "&" + 'language=' + this.langToBEAPIs, {
      SequenceOrCustomCardNumber: SequenceOrCustomCardNumber
    }).subscribe(
      (res: any) => {
        if (res) {
          this.vehicles = res.Result.VehiclesList;
          console.log(this.vehicles)
        } else {

        }
      },
      err => {
        console.log("Error occured");
      })

  }

  openDeleteVehiclePopup(vehicleId) {
    this.openPpUp = true;
    this.vehicleId = vehicleId;
  }

  confirmDeleteVehicle() {
    this.vehicles.splice(this.vehicleId, 1);
    //.splice(driver, 1);
    this.openPpUp = false;
  }

  closePopup() {
    this.openPpUp = false;
  }

  ngOnChanges(): any {
    const pageCount = this.getPageCount();
    this.pages = this.getArrayOfPage(pageCount);
    this.activePage = 1;
    this.onPageChange.emit(1);
  }

  private getPageCount(): number {
    let totalPage = 0;

    if (this.totalRecords > 0 && this.recordsPerPage > 0) {
      const pageCount = this.totalRecords / this.recordsPerPage;
      const roundedPageCount = Math.floor(pageCount);

      totalPage = roundedPageCount < pageCount ? roundedPageCount + 1 : roundedPageCount;
    }

    return totalPage;
  }

  private getArrayOfPage(pageCount: number): number[] {
    const pageArray = [];

    if (pageCount > 0) {
      for (let i = 1; i <= pageCount; i++) {
        pageArray.push(i);
      }
    }

    return pageArray;
  }

  onClickPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.pages.length) {
      this.activePage = pageNumber;
      this.onPageChange.emit(this.activePage);
    }
  }

}
