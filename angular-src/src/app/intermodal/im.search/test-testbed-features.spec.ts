import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {SearchIntermodalComponent} from './search-intermodal.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';

import {AppMaterialModule} from '../../app-material.module';
import {EnumService} from '../../services/enum.service';
import {GeoScopeService} from '../../services/geoscope.service';
import {IntermodalSearchService} from '../services/im.search.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {CountryService} from '../../services/country.service';
import {Observable} from 'rxjs/Observable';
import {CountryModel} from '../../model/country.model';

describe('SearchRoutesComponent', () => {
  let component: SearchIntermodalComponent;
  let fixture: ComponentFixture<SearchIntermodalComponent>;
  let geoScopeService;
  const countryStub: Array<CountryModel> = [];
  countryStub.push(new CountryModel(1, 'GERMANY', 'DE'));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchIntermodalComponent],
      providers: [EnumService, CountryService, GeoScopeService, IntermodalSearchService],
      imports: [HttpClientTestingModule, BrowserAnimationsModule, AppMaterialModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

  }));

  beforeEach(() => {
    // create component and test fixture
    fixture = TestBed.createComponent(SearchIntermodalComponent);
    // get test component from the fixture
    component = fixture.componentInstance;
    geoScopeService = fixture.debugElement.injector.get(GeoScopeService);


  });

  it('Component Should be Created', () => {
    expect(component).toBeTruthy();
  });


  it('Service inject: fixture.debugElement.injector.get(GeoScopeService);', () => {
    expect(geoScopeService.sayHamburg('DEHAM')).toContain('Hamburg');
  });

  it('Service inject via inject()', inject([GeoScopeService], service => {
    expect(service.sayHamburg('DEHAM')).toContain('Hamburg');
  }));

  it('Service inject: via TestBed', () => {
    const service = TestBed.get(GeoScopeService);
    expect(service.sayHamburg('DEHAM')).toContain('Hamburg');
  });


  it('Should CountryService Return Observable', () => {
    const countryService = TestBed.get(CountryService);
    let result: Observable<Array<CountryModel>> = countryService.filterCountries('BR');
    expect(result).toBeTruthy();
  });

  it('Service inject via inject()', inject([CountryService], service => {


    service.filterCountries('D').subscribe(
      result => {
        if (result.length === 1) {
          const model: CountryModel = result[0];
          console.log('##:' + JSON.stringify(model));
          expect(model).toEqual(countryStub[0]);
        } else {
          expect(result).toEqual(countryStub);
        }
        expect(result).toBeTruthy();
      });

  }));
});
