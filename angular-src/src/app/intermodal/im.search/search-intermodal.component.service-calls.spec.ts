import {async, ComponentFixture, ComponentFixtureAutoDetect, TestBed} from '@angular/core/testing';

import {SearchIntermodalComponent} from './search-intermodal.component';

import {AppMaterialModule} from '../../app-material.module';
import {EnumService} from '../../services/enum.service';
import {GeoScopeService} from '../../services/geoscope.service';
import {IntermodalSearchService} from '../services/im.search.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {CountryService} from '../../services/country.service';
import {CountryModel} from '../../model/country.model';
import {ResultIntermodalComponent} from '../im.result/result-intermodal.component';
import {HttpClientModule} from '@angular/common/http';

describe('Test for SearchRoutesComponent: Internal Service Calls', () => {
  let component: SearchIntermodalComponent;
  let fixture: ComponentFixture<SearchIntermodalComponent>;
  let spyOnFilterCountries: jasmine.Spy;
  let countryService: CountryService;

  let spyOnFilterLocations: jasmine.Spy;
  let geoScopeService: GeoScopeService;
  const countryStub: Array<CountryModel> = [];
  countryStub.push(new CountryModel(1, 'GERMANY', 'DE'));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchIntermodalComponent, ResultIntermodalComponent],
      providers: [EnumService, CountryService, GeoScopeService, IntermodalSearchService,
        {provide: ComponentFixtureAutoDetect, useValue: true}],
      imports: [HttpClientModule, RouterTestingModule, BrowserAnimationsModule, AppMaterialModule, ReactiveFormsModule],
      // add NO_ERRORS_SCHEMA to ignore <app-result-intermodal> tag
      schemas: []

      // If you run tests in a non-CLI environment, compilationmight not have occured
    }).compileComponents();

  }));

  beforeEach(() => {
    // create component and test fixture
    // createComponent() does not bind data: use  fixture.detectChanges() to trigger this
    fixture = TestBed.createComponent(SearchIntermodalComponent);
    // get test component from the fixture
    component = fixture.componentInstance;

    component.searchFormIntermodal.controls['includeImTariff'].setValue(true);
    component.searchFormIntermodal.controls['inlandGeoScopeType'].setValue('L');
    component.searchFormIntermodal.controls['preOnCarriage'].setValue(false);
    component.searchFormIntermodal.controls['transportMode'].setValue('TRUCK');
    component.searchFormIntermodal.controls['equipmentType'].setValue('REEFER');
    component.searchFormIntermodal.controls['startDate'].setValue('2018-07-23T09:33:01.145Z');
    component.searchFormIntermodal.controls['startDate'].setValue('2018-08-06T09:33:01.146Z');

    fixture.detectChanges();
    component.searchFormIntermodal.controls['inlandLocation'].setValue('DEDUS');
    expect(component.searchFormIntermodal.valid).toBeTruthy();
    expect(component.isInvalid()).toBeFalsy();

    // Create a jasmine spy to spy on the filterCountries method
    spyOnFilterCountries = spyOn(countryService, 'filterCountries').and.callFake((arg) => {
      return countryStub;
    });
    spyOnFilterLocations = spyOn(geoScopeService, 'filterLocations').and.callThrough();
  });


  beforeEach(() => {

  });

  it('Component Should be Created', () => {
    expect(component).toBeTruthy();
  });


  it('should submit the values', async () => {

    component.filterCountries('D');
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(spyOnFilterCountries().calls.any()).toBeTruthy();
    });

  });

});
