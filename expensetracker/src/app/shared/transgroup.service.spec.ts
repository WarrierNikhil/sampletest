import { TestBed } from '@angular/core/testing';

import { TransgroupService } from './transgroup.service';

describe('TransgroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransgroupService = TestBed.get(TransgroupService);
    expect(service).toBeTruthy();
  });
});
