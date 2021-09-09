import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
  private MissingFieldsSource = new BehaviorSubject(null);
  private tokenSource = new BehaviorSubject('');
  private messageSource = new BehaviorSubject('default message');
  private individualData = new BehaviorSubject({}) ;
  private messageSourcesubmitQuot = new BehaviorSubject('default message');
  private driverDataSource = new BehaviorSubject(null);
  private initialQuoteDataSource = new BehaviorSubject(null);
  private productArrayDataSource = new BehaviorSubject('default message');
  private responseSource = new BehaviorSubject('default message');
  private mainDriverSource = new BehaviorSubject('');
  mainDriverPrefilled = this.mainDriverSource.asObservable();
  private responseMainDriverSource = new BehaviorSubject('');
  responseMainDriverPrefilled = this.responseMainDriverSource.asObservable();
  private otherInfoDriverSource = new BehaviorSubject('');
  otherInfoDriverPrefilled = this.otherInfoDriverSource.asObservable();
  currentTokenSource  = this.tokenSource.asObservable();
  currentMessage = this.messageSource.asObservable();
  individualObservable = this.individualData.asObservable();
  initialQuoteObservable = this.initialQuoteDataSource.asObservable();
  MissingFieldsObservable = this.MissingFieldsSource.asObservable();
  currentMessageSubmitQuot = this.messageSourcesubmitQuot.asObservable();
  currentDriver = this.driverDataSource.asObservable();
  currentproductArray = this.productArrayDataSource.asObservable();
  currentresponse = this.responseSource.asObservable();
   private langSource = new BehaviorSubject('Arabic');
  currentCustomLanguage = this.langSource.asObservable();
  private drivingPercentageSource = new BehaviorSubject('');
  drivingPercentagePrefilled = this.drivingPercentageSource.asObservable();
  private driversSource = new BehaviorSubject('');
  driversPrefilled = this.driversSource.asObservable();
  private fProductDetailsSource = new BehaviorSubject('');
  fProductDetails = this.fProductDetailsSource.asObservable();
  private vehicleDetalisSource = new BehaviorSubject('');
  vehicleDetalisPrefilled = this.vehicleDetalisSource.asObservable();
  private buyedProudctSource =  new BehaviorSubject('');
  selectedBuyedProudct = this.buyedProudctSource.asObservable();
  private cityNameSource = new BehaviorSubject('');
  cityNamePrefilled = this.cityNameSource.asObservable();
  private workCityAddInfoSource = new BehaviorSubject('');
  workCityAddInf = this.workCityAddInfoSource.asObservable();
  private checkoutDetailsSource = new BehaviorSubject('');
  checkoutDetailsPrefilled = this.checkoutDetailsSource.asObservable();
  private checkoutParametersSource = new BehaviorSubject('');
  checkoutParametersPrefilled = this.checkoutParametersSource.asObservable();
  private companyLogoSource = new BehaviorSubject('');
  companyLogoPrefilled = this.companyLogoSource.asObservable();
  private mainDriverViolationsSource =  new BehaviorSubject('');
  mainDriverViolationPrefilled = this.mainDriverViolationsSource.asObservable();
  private additionalDriverViolationsSource =  new BehaviorSubject('');
  additionalDriverViolationsPrefilled = this.additionalDriverViolationsSource.asObservable();
  private driverIdSource =  new BehaviorSubject('');
  driverIdPrefilled = this.driverIdSource.asObservable();
  private editDriverSource = new BehaviorSubject('');
  editDriverPrefilled = this.editDriverSource.asObservable();

  private checkoutDetailsResponse = new BehaviorSubject<CheckoutResponse>(new CheckoutResponse());
  checkoutModel = this.checkoutDetailsResponse.asObservable();

  private updatesSource =  new BehaviorSubject('');
  updatesSourcePrefilled = this.updatesSource.asObservable();

  private newAdditionalDriverSource =  new BehaviorSubject('');
  newAdditionalDriverPrefilled = this.newAdditionalDriverSource.asObservable();

  
  private quotationResSource =  new BehaviorSubject('');
  quotationResPrefilled = this.quotationResSource.asObservable();

  constructor() { }

  changecheckoutModel(checkoutResponse) {
    this.checkoutDetailsResponse.next(checkoutResponse)
  }

  changeMissingFields(data){
    this.MissingFieldsSource.next(data);
  }

  changeIndividualData(data){
    this.individualData.next(data);
  }
  changeMessage(message: any) {
    this.messageSource.next(message);  
  }
  changeMessageSubmQuot(quots: any) {
    this.messageSourcesubmitQuot.next(quots);  
  }

  //  this.messageSourcesubmitQuot.next(messageSubmit);

  changeCurrentLanguage(curLang: any) {
    this.langSource.next(curLang)
  }
 
  changeResponse(messageRes: any) {
    this.responseSource.next(messageRes);}

  changeDriverData(driverData: any) {

    this.driverDataSource.next(driverData)
  }

  changeInitialQuotationData(initData: any) {

    this.initialQuoteDataSource.next(initData)
  }

  changeprodArrayData(prodArr: any) {
    this.productArrayDataSource.next(prodArr)
  }

  changeToken(message: any) {
    this.tokenSource.next(message);  
  }

  checkoutDetails(checkoutDetails: any) {
    this.checkoutDetailsSource.next(checkoutDetails);
  }

  setCheckoutParameters(checkoutPara: any) {
    this.checkoutParametersSource.next(checkoutPara);
  }

  getCheckoutParameters() {
    return this.checkoutParametersSource
  }

  setMainDriverData(mainDriver: any) {
    this.mainDriverSource.next(mainDriver)
  }
  getMainDriverData() {
    return this.mainDriverSource 
  }

  setResponseMainDriverData(responseMainDriver: any) {
    this.responseMainDriverSource.next(responseMainDriver)
  }
  getResponseMainDriverData() {
    return this.responseMainDriverSource 
  }
  setOtherInfoDriverData(otherInfoDriver: any) {
    this.otherInfoDriverSource.next(otherInfoDriver)
  }
  getOtherInfoDriverData() {
    return this.otherInfoDriverSource 
  }

  setDrivingPercentage(drivingPercentage: any) {
    this.drivingPercentageSource.next(drivingPercentage)
  }
  getDrivingPercentage() {
    return this.drivingPercentageSource 
  }
  setDriverDrawGrid(DriverDrawGrid)
  {
    this.driversSource.next(DriverDrawGrid)
  }
  getDriverDrawGrid() {
    return this.driversSource 
  }
  setFirstProduct(firstProductDetails)
  {
    this.fProductDetailsSource.next(firstProductDetails)
  }
  getFirstProduct() {
    return this.fProductDetailsSource 
  }

  setVehicleDetails(vehicleDetalis)
  {
    this.vehicleDetalisSource.next(vehicleDetalis)
  }
  getVehicleDetails() {
    return this.vehicleDetalisSource 
  }

  setSelectedBuyedProudct(buyedProudct)
  {
    this.buyedProudctSource.next(buyedProudct)
  }
  getSelectedBuyedProudct()
  {
    return this.buyedProudctSource 
  }
  setCityName(CityName)
  {
    this.cityNameSource.next(CityName)
  }
  getCityName()
  {
    return this.cityNameSource 
  }
  
  setworkCityAddInfo(workCityAddInfo)
  {
    this.workCityAddInfoSource.next(workCityAddInfo)
  }
  getworkCityAddInfo()
  {
    return this.workCityAddInfoSource 
  }
  
  companyLogoShare(CompanyLogo: any) {
    this.companyLogoSource.next(CompanyLogo);
    let myStorage = window.localStorage;
    myStorage.setItem("logo",CompanyLogo);
  }
  setMainDriverViolations(mainDriverViolations)
  {
    this.mainDriverViolationsSource.next(mainDriverViolations)
  }
  getMainDriverViolations()
  {
    return this.mainDriverViolationsSource 
  }
  setAdditionalDriverViolations(additionalDriverViolations)
  {
    this.additionalDriverViolationsSource.next(additionalDriverViolations)
  }
  getAdditionalDriverViolations()
  {
    return this.additionalDriverViolationsSource 
  }


  setCheckUpdates(updates)
  {
    this.updatesSource.next(updates)
  }
  getCheckUpdates()
  {
    return this.updatesSource 
  }
  setEditDrivers(deivers)
  {
    this.editDriverSource.next(deivers)
  }

  getEditDrivers()
  {
    return this.editDriverSource 
  }

  setNewAdditionalDriver(newAdditionalDriver)
  {
    this.newAdditionalDriverSource.next(newAdditionalDriver)
  }

  getNewAdditionalDriver()
  {
    return this.newAdditionalDriverSource 
  }

  setquotationResponse(quotationRes)
  {
    this.quotationResSource.next(quotationRes)
  }

  getquotationResponse()
  {
    return this.quotationResSource 
  }
}

export class CheckoutResponse {
  id:string ;
  Lang: string ;
  userId: number;
  paymentMethodCode: number;
  channel:string;
}
