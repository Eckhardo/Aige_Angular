import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MissingRoutesResultComponent} from './masterdata-routes.component';

describe('MasterdataRoutesComponent', () => {
  let component: MissingRoutesResultComponent;
  let fixture: ComponentFixture<MissingRoutesResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MissingRoutesResultComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissingRoutesResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
