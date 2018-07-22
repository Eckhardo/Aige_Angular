import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchIntermodalComponent} from './search-intermodal.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {AppMaterialModule} from '../../app-material.module';
import {EnumService} from '../../services/enum.service';
import {GeoScopeService} from '../../services/geoscope.service';
import {IntermodalSearchService} from '../services/im.search.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('SearchRoutesComponent', () => {
  let component: SearchIntermodalComponent;
  let fixture: ComponentFixture<SearchIntermodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchIntermodalComponent],
      providers: [ EnumService, GeoScopeService, IntermodalSearchService,HttpClient,HttpHandler ],
      imports: [ RouterTestingModule,BrowserAnimationsModule, AppMaterialModule ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
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
