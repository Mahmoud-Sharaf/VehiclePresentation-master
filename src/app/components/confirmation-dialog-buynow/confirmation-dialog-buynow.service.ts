import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogBuynowComponent } from './confirmation-dialog-buynow.component';

@Injectable()
export class ConfirmationDialogBuynowService {

  constructor(private modalService: NgbModal) { }

  public confirm(
    title: string,
    message: string,
    btnOkText: string = 'OK',
    dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmationDialogBuynowComponent, { size: dialogSize,keyboard:false, backdrop:"static"});
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.btnOkText = btnOkText;
    modalRef.componentInstance.otpBuyNowBool = false;

    return modalRef.result;
  }


  public confirmx(
    titlex: string,
    messagex: string,
    btnOkTextx: string = 'OK',
    dialogSizex: 'sm'|'lg' = 'sm'): Promise<boolean> {
    const modalRefx = this.modalService.open(ConfirmationDialogBuynowComponent, { size: dialogSizex,keyboard:false, backdrop:"static"});
    modalRefx.componentInstance.title = titlex;
    modalRefx.componentInstance.message = messagex;
    modalRefx.componentInstance.btnOkText = btnOkTextx;
    modalRefx.componentInstance.otpBuyNowBool = true;

    return modalRefx.result;
  }
}
