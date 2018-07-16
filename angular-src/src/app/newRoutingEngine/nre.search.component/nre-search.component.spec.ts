import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NewRoutingEngineComponent} from './nre-search.component';


describe('SearchRoutesComponent', () => {
  let component: NewRoutingEngineComponent;
  let fixture: ComponentFixture<NewRoutingEngineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewRoutingEngineComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRoutingEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
