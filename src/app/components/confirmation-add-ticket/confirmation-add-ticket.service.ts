import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationAddTicketComponent } from './confirmation-add-ticket.component';
@Injectable()
export class ConfirmationAddTicketComponentService {

  constructor(private modalService: NgbModal) { }

  public confirm(
    title: string,
    message: string,
    dialogSize: 'sm'|'lg' = 'sm'): Promise<boolean> {
    const modalRef = this.modalService.open(ConfirmationAddTicketComponent, { size: dialogSize,keyboard:false, backdrop:"static"});
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    modalRef.componentInstance.otpBuyNowBool = false;

    return modalRef.result;
  }
}
