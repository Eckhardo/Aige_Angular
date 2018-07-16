import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NewRoutingeEngineResultComponent} from './nre-result.component';

describe('MasterdataRoutesComponent', () => {
  let component: NewRoutingeEngineResultComponent;
  let fixture: ComponentFixture<NewRoutingeEngineResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewRoutingeEngineResultComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRoutingeEngineResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
