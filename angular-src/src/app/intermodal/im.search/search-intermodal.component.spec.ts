import {async, ComponentFixture, ComponentFixtureAutoDetect, TestBed} from '@angular/core/testing';

import {SearchIntermodalComponent} from './search-intermodal.component';
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';

import {AppMaterialModule} from '../../app-material.module';
import {EnumService} from '../../services/enum.service';
import {GeoScopeService} from '../../services/geoscope.service';
import {IntermodalSearchService} from '../services/im.search.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AbstractControl, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {By} from '@angular/platform-browser';
import {CountryService} from '../../services/country.service';

describe('SearchRoutesComponent', () => {
  let component: SearchIntermodalComponent;
  let fixture: ComponentFixture<SearchIntermodalComponent>;
  let inland: AbstractControl;
  let titleDomElement: DebugElement;
  let titleHtmlElement: HTMLElement;
  let service;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchIntermodalComponent],
      providers: [EnumService, CountryService, GeoScopeService, IntermodalSearchService,

        {provide: ComponentFixtureAutoDetect, useValue: true}],
      imports: [HttpClientTestingModule, RouterTestingModule, BrowserAnimationsModule, AppMaterialModule, ReactiveFormsModule],
      // add NO_ERRORS_SCHEMA to ignore <app-result-intermodal> tag
      schemas: [NO_ERRORS_SCHEMA]

      // If you run tests in a non-CLI environment, compilationmight not have occured
    }).compileComponents();

  }));

  beforeEach(() => {
    // create component and test fixture
    // createComponent() does not bind data: use  fixture.detectChanges() to trigger this
    fixture = TestBed.createComponent(SearchIntermodalComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(GeoScopeService);
    titleDomElement = fixture.debugElement.query(By.css('#im-search-form-title'));
    titleHtmlElement = titleDomElement.nativeElement;


    const includeImTariff = component.searchFormIntermodal.controls['includeImTariff'];
    includeImTariff.setValue(true);

    const geoScopeRadio = component.searchFormIntermodal.controls['inlandGeoScopeType'];
    geoScopeRadio.setValue('L')
    const preCarriageRadio = component.searchFormIntermodal.controls['preOnCarriage'];
    preCarriageRadio.setValue(false);
    const transportMode = component.searchFormIntermodal.controls['transportMode'];
    transportMode.setValue('TRUCK');
    const equipmentType = component.searchFormIntermodal.controls['equipmentType'];
    equipmentType.setValue('REEFER');
    const startDate = component.searchFormIntermodal.controls['startDate'];
    startDate.setValue('2018-07-23T09:33:01.145Z');
    const endDate = component.searchFormIntermodal.controls['startDate'];
    endDate.setValue('2018-08-06T09:33:01.146Z');

    inland = component.searchFormIntermodal.controls['inlandLocation'];

  });

  it('Component Should be Created', () => {
    expect(component).toBeTruthy();
  });


  it('Service Should be Created', () => {
    expect(service).toBeTruthy();
  });
  it('should display original title', () => {
    // Hooray! No `fixture.detectChanges()` needed
    expect(titleHtmlElement.textContent).toContain(component.title);
  });

  it('should still see original title after comp.title change', () => {
    const oldTitle = component.title;
    component.title = 'Test Title';
    // Displayed title is old because Angular didn't hear the change :(
    expect(titleHtmlElement.textContent).toContain(oldTitle);
  });

  it('should display updated title after detectChanges', () => {
    component.title = 'Test Title';
    fixture.detectChanges(); // detect changes explicitly
    expect(titleHtmlElement.textContent).toContain(component.title);
  });

  it('DIV Element for Title should be established', () => {
    expect(titleDomElement).toBeTruthy();
    expect(titleHtmlElement).toBeTruthy();
    expect(titleHtmlElement.textContent).toContain('Search Key Figures');
  });

  it('Inland Location Is Missing: Form Should be Invalid', () => {

    let errors = {};
    inland = component.searchFormIntermodal.controls['inlandLocation'];
    errors = inland.errors || {};
    expect(errors['required']).toBeTruthy();

    expect(component.searchFormIntermodal.valid).toBeFalsy();
  });

  it('Inland Location Is Set: Form Should be Valid', () => {


    inland.setValue('DEDUS');
    fixture.detectChanges();
    expect(component.searchFormIntermodal.valid).toBeTruthy();
    expect(component.isInvalid()).toBeFalsy();
  });


});
