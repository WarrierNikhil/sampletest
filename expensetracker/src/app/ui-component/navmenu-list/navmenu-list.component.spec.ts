import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavmenuListComponent } from './navmenu-list.component';

describe('NavmenuListComponent', () => {
  let component: NavmenuListComponent;
  let fixture: ComponentFixture<NavmenuListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavmenuListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavmenuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
