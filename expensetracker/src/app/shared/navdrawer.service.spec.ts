import { TestBed } from '@angular/core/testing';

import { NavdrawerService } from './navdrawer.service';

describe('NavdrawerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NavdrawerService = TestBed.get(NavdrawerService);
    expect(service).toBeTruthy();
  });
});
