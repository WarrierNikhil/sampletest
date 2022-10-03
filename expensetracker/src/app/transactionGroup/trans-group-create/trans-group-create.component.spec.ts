import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransGroupCreateComponent } from './trans-group-create.component';

describe('TransGroupCreateComponent', () => {
  let component: TransGroupCreateComponent;
  let fixture: ComponentFixture<TransGroupCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransGroupCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransGroupCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
