import { TestBed } from '@angular/core/testing';

import { NotFoundGuard } from './not-found.guard';

describe('NotFoundGuardService', () => {
  let service: NotFoundGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotFoundGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
