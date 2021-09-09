import { TestBed } from '@angular/core/testing';

import { ConfirmationDialogBuynowService } from './confirmation-dialog-buynow.service';

describe('ConfirmationDialogBuynowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfirmationDialogBuynowService = TestBed.get(ConfirmationDialogBuynowService);
    expect(service).toBeTruthy();
  });
});
