import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ConfirmationAddTicketComponentService } from '../../confirmation-add-ticket/confirmation-add-ticket.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  tickets:any;
  openPpUp:any;
  UserTickets:any;
  uploadNewTicket:FormGroup;
  ticketType:any;
  ticketTypes: any;
  file: File;
  showLoading = false;
  mycurrentLangu: any;
  myLanguageCus: any;
  langToBEAPIs: any;
  sequenceOrCustomCardNumber:any;
  nationalId:any;
  notes:any;
  successMessage:any;
  errorDescription:any;
  submitted = false;
  showFile= false;
  loading = false;
  files:File[] = [];
  numField = 0;
  maxField = 5;
  ticketId:any;
  helloMessage:any;
  No:any;
  successMsg :any;
  error:any;
  acceptTypes = [
    "pdf", "xls", "xlsb",
    "xlsm", "xlsx", "jpeg",
    "png", "gif","jpg",
    "psd"];
    attachmentRequired = true;
    fileList:FileList;
    showFileTypeErrorMssage:any;
  constructor(private http: HttpClient , public fb: FormBuilder, private cdRef: ChangeDetectorRef,
    private ConfirmationAddTicketService: ConfirmationAddTicketComponentService) {}

  ngOnInit() {
    this.uploadNewTicket = this.fb.group({
      ticketType: new FormControl(),
      sequenceCustomerNo: new FormControl(),
      notes: new FormControl(),
      nationalId: new FormControl(),
      attachmentName: new FormControl(),
    });
    this.files = [];
    this.getAllUserTickets();
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


  getAllTickets(){
    if (this.myLanguageCus == 'English') {
      this.langToBEAPIs = "en";
    } else {
      this.langToBEAPIs = "ar";
    }
    this.http.get(environment.profile+"getAllTicketTypes?language=" +this.langToBEAPIs+ "&"+ 'channel=' + 'portal', {
    }).subscribe(
      (res: any) => {          
        if (res) {
          this.tickets = res.Result;
        } 
        else {} 
      },
      err => {
        console.log("Error occured");
      })
    
  }

  getAllUserTickets(){
    this.showLoading = true;
    this.mycurrentLangu = window.localStorage.getItem("currentLanguage");
    this.myLanguageCus = this.mycurrentLangu;
    let UserId = localStorage.getItem("UserId"); 
    if(UserId ==null){
      UserId = "00000000-0000-0000-0000-000000000000";
    }

    if (this.myLanguageCus == 'English') {
      this.langToBEAPIs = "en";
    } else {
      this.langToBEAPIs = "ar";
    }

    this.http.get(environment.profile+"getAllUserTickets?userId=" + UserId +"&"+ 'lang='+ this.langToBEAPIs +"&"+ 'channel=' + 'portal', {
    }).subscribe(
      (res: any) => {          
        if (res) {
          this.UserTickets = res.Result;
          this.showLoading = false;
        } 
        else {
        
        } 
      },
      err => {
        console.log("Error occured");
      })
  }

  OpenAddTicketPopup() {
    alert("hi");
    this.openPpUp = true;
    this.uploadNewTicket.get("ticketType").setValue(null);
    this.uploadNewTicket.get("sequenceCustomerNo").setValue(null);
    this.uploadNewTicket.get("notes").setValue(null);
    this.uploadNewTicket.get("nationalId").setValue(null);
    this.uploadNewTicket.get("attachmentName").setValue(null);
    this.uploadNewTicket.get("sequenceCustomerNo").clearValidators();
    this.uploadNewTicket.get("notes").clearValidators();
    this.uploadNewTicket.get("nationalId").clearValidators();
    this.uploadNewTicket.get("attachmentName").clearValidators();
    this.uploadNewTicket.get("sequenceCustomerNo").updateValueAndValidity();
    this.uploadNewTicket.get("notes").updateValueAndValidity();
    this.uploadNewTicket.get("nationalId").updateValueAndValidity();
    this.uploadNewTicket.get("attachmentName").updateValueAndValidity();
    this.getAllTickets();
  }

  closePopup(){
    this.openPpUp = false;
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

  changeTicket()
  {
    this.ticketType = this.uploadNewTicket.controls['ticketType'].value;
    if(this.ticketType == 1 || this.ticketType == 3)
    {
      this.uploadNewTicket.get("sequenceCustomerNo").setValidators([Validators.required]);
      this.uploadNewTicket.get("notes").setValidators(null);
      this.uploadNewTicket.get("nationalId").setValidators(null);
      this.uploadNewTicket.get("attachmentName").setValidators(null);
      this.uploadNewTicket.get("notes").setValue(null);
      this.uploadNewTicket.get("nationalId").setValue(null);
      this.uploadNewTicket.get("attachmentName").setValue(null);
      this.uploadNewTicket.get("notes").clearValidators();
      this.uploadNewTicket.get("nationalId").clearValidators();
      this.uploadNewTicket.get("attachmentName").clearValidators();
      this.uploadNewTicket.get("notes").updateValueAndValidity();
      this.uploadNewTicket.get("nationalId").updateValueAndValidity();
      this.uploadNewTicket.get("attachmentName").updateValueAndValidity();
    }
    if(this.ticketType != 6 || this.ticketType != 1  || this.ticketType != 3 )
    {
      this.uploadNewTicket.get("sequenceCustomerNo").setValidators([Validators.required]);
      this.uploadNewTicket.get("notes").setValidators([Validators.required]);
      this.uploadNewTicket.get("nationalId").setValidators(null);
      this.uploadNewTicket.get("attachmentName").setValidators(null);
      this.uploadNewTicket.get("nationalId").setValue(null);
      this.uploadNewTicket.get("attachmentName").setValue(null);
      this.uploadNewTicket.get("nationalId").clearValidators();
      this.uploadNewTicket.get("attachmentName").clearValidators();
      this.uploadNewTicket.get("nationalId").updateValueAndValidity();
      this.uploadNewTicket.get("attachmentName").updateValueAndValidity();
    }
    if(this.ticketType == 6)
    {
      this.uploadNewTicket.get("nationalId").setValidators([Validators.required, this.minValueMaxValue.bind(this)]);
      this.uploadNewTicket.get("notes").setValidators([Validators.required]);
      this.uploadNewTicket.get("sequenceCustomerNo").setValidators(null);
      this.uploadNewTicket.get("attachmentName").setValidators(null);
      this.uploadNewTicket.get("sequenceCustomerNo").setValue(null);
      this.uploadNewTicket.get("attachmentName").setValue(null);
      this.uploadNewTicket.get("sequenceCustomerNo").clearValidators();
      this.uploadNewTicket.get("attachmentName").clearValidators();
      this.uploadNewTicket.get("sequenceCustomerNo").updateValueAndValidity();
      this.uploadNewTicket.get("attachmentName").updateValueAndValidity();
    }

    if(this.ticketType == 5)
    {
      if(this.fileList  == null)
      {
        this.attachmentRequired = true;
      }
      else{
        this.attachmentRequired = false;
      }
    
      this.uploadNewTicket.get("attachmentName").setValidators([Validators.required]);
      this.uploadNewTicket.get("notes").setValidators([Validators.required]);
      this.uploadNewTicket.get("sequenceCustomerNo").setValidators([Validators.required]);
      this.uploadNewTicket.get("nationalId").setValidators(null);
      this.uploadNewTicket.get("nationalId").setValue(null);
      this.uploadNewTicket.get("nationalId").clearValidators();
      this.uploadNewTicket.get("nationalId").updateValueAndValidity();
    }
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

  AddAttachment()
  { 
    
   this.showFile =  true;
    var counter = $(this).index();
    var wrapper = $('.multipleAttchmentFile');
    if (this.myLanguageCus == 'Arabic')
    {
      var fieldHTML = '<div id="AttachmentsDiv"><div class="attchContainer"><label>اسم المرفق:</label><input  type="file" accept="application/vnd.ms-excel ,.xlsx, .xls, .csv"id="file" (change)="onFileChange($event)" style="display: inline-block;"  formControlName="attachmentName2"></div></div>';
    }
    else{
      var fieldHTML = '<div id="AttachmentsDiv"><div class="attchContainer"><label>Attachment Name:</label><input  type="file" accept="application/vnd.ms-excel ,.xlsx, .xls, .csv"id="file" (change)="onFileChange($event)" style="display: inline-block;"  formControlName="attachmentName2"></div></div>';
    }

    if (this.numField < this.maxField) {
      if (this.numField != 0) {
        this.numField++;
        $(wrapper).append(fieldHTML);
      }
      else
      {
        this.numField++; 
      }
    }

    let element = document.getElementById("attachment");
    element.click();

  }

  onFileChange(event) {
    this.fileList =  event.target.files;
    if (this.fileList.length > 0) {
      this.attachmentRequired = false;
      for (var i = 0; i < this.fileList.length; i++) {
        var ext = this.fileList[i].name.substring(this.fileList[i].name.lastIndexOf('.') + 1);
        if (this.acceptTypes.filter(x => x == ext).length > 0) {
          this.files.push(this.fileList[i]);
          this.showFileTypeErrorMssage= false;
        }
        else{
          this.showFileTypeErrorMssage = true ;
        }
      } 
    }
  }


  uploadTicket(data) {
    
    this.openPpUp = false;
    this.submitted = true;
    this.loading = true;
    let UserId = localStorage.getItem("UserId"); 
    if(UserId ==null){
      UserId = "00000000-0000-0000-0000-000000000000";
    }
    if (!this.uploadNewTicket.controls["sequenceCustomerNo"].valid || !this.uploadNewTicket.controls["nationalId"].valid ||
    !this.uploadNewTicket.controls["notes"].valid  || !this.uploadNewTicket.controls["attachmentName"].valid) 
    {
      this.loading = false;
      return false;
    }
    else {
      this.loading = true;
 
    
      let dataModel =  {
      userId:UserId,
      TicketTypeId: this.ticketType,
      SequenceOrCustomCardNumber: data.sequenceCustomerNo,
      UserNotes: data.notes,
      NIN: data.nationalId,
      };

      let bodyReq = new FormData();
      bodyReq.append("data",JSON.stringify(dataModel));
      bodyReq.append("lang",this.langToBEAPIs);
      bodyReq.append("channel","portal");
      for  (var i =  0; i <  this.files.length; i++)  {  
        bodyReq.append("files",  this.files[i]);
      } 


     this.http.post(environment.profile+"createTicket", bodyReq).subscribe(
        (res: any) => {          
          if (res.ErrorCode != 1) {
            this.loading = false;
            this.errorDescription = res.ErrorDescription;
            if(this.myLanguageCus == 'Arabic')
            {
              this.error = "حدث خطأ";
            }
            else
            {
              this.error = "An error occurred";
            }
            this.ConfirmationAddTicketService.confirm(this.error,this.errorDescription)
            .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
          }
          else {
            this.loading = false;
            this.successMessage = res.Result[0].statusName;
            this.ticketId = res.Result[0].ticketId;
            if(this.myLanguageCus == 'Arabic')
            {
              this.helloMessage = "يسعدنا خدمتك... ";
              this.No= "رقم";
              this.successMsg = "وجاري العمل عليها...يمكنك متابعة حالة الطلب بقائمة 'التنبيهات'.#بي_كير_تهتم";
              this.getAllUserTickets();
            }
            else
            {
              this.helloMessage = "We are happy to serve you ... ";
              this.No= "number";
              this.successMsg = "and it is being worked on ... You can follow the status of the request in the 'Alerts' list. # Be_care_take";
              this.getAllUserTickets();
            }
              this.ConfirmationAddTicketService.confirm(this.successMessage,this.helloMessage +''+ this.successMessage + this.No + this.ticketId + this.successMsg)
              .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
          } 
        },
        err => {
          console.log("Error occured");
      })
   
    }
   
  }
  
}
