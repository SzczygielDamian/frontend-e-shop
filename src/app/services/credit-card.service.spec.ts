import { TestBed } from '@angular/core/testing';

import { CredtiCardService } from './credit-card.service';

describe('CredtiCardService', () => {
  let service: CredtiCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CredtiCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
