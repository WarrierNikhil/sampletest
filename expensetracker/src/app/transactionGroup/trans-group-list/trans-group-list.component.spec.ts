import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransGroupListComponent } from './trans-group-list.component';

describe('TransGroupListComponent', () => {
  let component: TransGroupListComponent;
  let fixture: ComponentFixture<TransGroupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransGroupListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
