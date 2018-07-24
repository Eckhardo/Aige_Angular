import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {SearchIntermodalComponent} from './search-intermodal.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';

import {AppMaterialModule} from '../../app-material.module';
import {EnumService} from '../../services/enum.service';
import {GeoScopeService} from '../../services/geoscope.service';
import {IntermodalSearchService} from '../services/im.search.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CountryService} from '../../services/country.service';

describe('SearchRoutesComponent', () => {
  let component: SearchIntermodalComponent;
  let fixture: ComponentFixture<SearchIntermodalComponent>;
  let service;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchIntermodalComponent],
      providers: [EnumService, CountryService, GeoScopeService, IntermodalSearchService, HttpClient, HttpHandler],
      imports: [HttpClientTestingModule, RouterTestingModule, BrowserAnimationsModule, AppMaterialModule, FormsModule, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

  }));

  beforeEach(() => {
    // create component and test fixture
    fixture = TestBed.createComponent(SearchIntermodalComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(GeoScopeService);


  });

  it('Component Should be Created', () => {
    expect(component).toBeTruthy();
  });


  it('Service inject: fixture.debugElement.injector.get(GeoScopeService);', () => {
    expect(service.sayHamburg('DEHAM')).toContain('Hamburg');
  });

  it('Service inject via inject()', inject([GeoScopeService], geoScopeService => {
    expect(geoScopeService.sayHamburg('DEHAM')).toContain('Hamburg');
  }));

  it('Service inject: via TestBed', () => {
    const geoScopeService = TestBed.get(GeoScopeService);
    expect(geoScopeService.sayHamburg('DEHAM')).toContain('Hamburg');
  });
});
