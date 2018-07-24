import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SearchIntermodalComponent} from './search-intermodal.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';

import {AppMaterialModule} from '../../app-material.module';
import {EnumService} from '../../services/enum.service';
import {GeoScopeService} from '../../services/geoscope.service';
import {IntermodalSearchService} from '../services/im.search.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AbstractControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SearchRoutesComponent', () => {
  let component: SearchIntermodalComponent;
  let fixture: ComponentFixture<SearchIntermodalComponent>;
  let inland: AbstractControl;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchIntermodalComponent],
      providers: [EnumService, GeoScopeService, IntermodalSearchService, HttpClient, HttpHandler],
      imports: [HttpClientTestingModule, RouterTestingModule, BrowserAnimationsModule, AppMaterialModule, FormsModule, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

  }));

  beforeEach(() => {
    // create component and test fixture
    fixture = TestBed.createComponent(SearchIntermodalComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
    fixture.detectChanges();
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
