import { TestBed } from '@angular/core/testing';

import { FireConectionService } from './fire-conection.service';

describe('FireConectionService', () => {
  let service: FireConectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireConectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
