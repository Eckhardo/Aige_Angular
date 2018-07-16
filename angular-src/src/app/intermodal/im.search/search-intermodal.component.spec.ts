import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchIntermodalComponent} from './search-intermodal.component';

describe('SearchRoutesComponent', () => {
  let component: SearchIntermodalComponent;
  let fixture: ComponentFixture<SearchIntermodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchIntermodalComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchIntermodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
