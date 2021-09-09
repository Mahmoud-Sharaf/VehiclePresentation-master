import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-add-ticket',
  templateUrl: './confirmation-add-ticket.component.html',
  styleUrls: ['./confirmation-add-ticket.component.css']
})
export class ConfirmationAddTicketComponent implements OnInit {

  
  @Input() title: string;
  @Input() message: string;

  constructor(private activeModal: NgbActiveModal,
    private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();

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
