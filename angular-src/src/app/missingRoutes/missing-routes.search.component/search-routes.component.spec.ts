import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {SearchRoutesComponent} from './search-routes.component';


describe('SearchRoutesComponent', () => {
  let component: SearchRoutesComponent;
  let fixture: ComponentFixture<SearchRoutesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchRoutesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchRoutesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
