import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-confirmation-dialog-buynow',
  templateUrl: './confirmation-dialog-buynow.component.html',
})
export class ConfirmationDialogBuynowComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;
  @Input() btnOkText: string;
  @Input() btnCancelText: string;
  @Input() otpBuyNowBool= false;
  otpBuyNow:any;

  constructor(private activeModal: NgbActiveModal,private ShareDataService: ShareDataService,
    private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();

  }
  otpFromUSer(e) {
    this.ShareDataService.changeToken(this.otpBuyNow);
  }

  public decline() {
    this.activeModal.close(false);
  }

  public accept() {
    this.activeModal.close(true);
    
  }


  public dismiss() {
    this.activeModal.dismiss();
  }

}
