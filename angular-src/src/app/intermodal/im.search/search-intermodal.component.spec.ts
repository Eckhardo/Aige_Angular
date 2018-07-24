import {async, ComponentFixture, getTestBed, TestBed} from '@angular/core/testing';

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
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('SearchRoutesComponent', () => {
  let component: SearchIntermodalComponent;
  let fixture: ComponentFixture<SearchIntermodalComponent>;
  let injector;
  let service: IntermodalSearchService;
  let httpMock: HttpTestingController;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchIntermodalComponent],
      providers: [EnumService, GeoScopeService, IntermodalSearchService, HttpClient, HttpHandler],
      imports: [HttpClientTestingModule, RouterTestingModule, BrowserAnimationsModule, AppMaterialModule, FormsModule, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    injector = getTestBed();
    service = injector.get(IntermodalSearchService);
    httpMock = injector.get(HttpTestingController);

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('empty form is invalid', () => {
    expect(component.searchFormIntermodal.valid).toBeFalsy();
  });
  it('fill form till is valid', () => {
    console.log("Bin ich valide ?");

    const inland = component.searchFormIntermodal.controls['inlandLocation'];
    inland.patchValue('DEDUS');

    console.log(JSON.stringify(component.searchFormIntermodal.value));
    expect(component.searchFormIntermodal.valid).toBeTruthy();
    expect(component.isInvalid()).toBeFalsy();
  });


});
