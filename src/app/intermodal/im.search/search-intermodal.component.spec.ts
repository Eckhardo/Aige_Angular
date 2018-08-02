import {async, ComponentFixture, ComponentFixtureAutoDetect, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {SearchIntermodalComponent} from './search-intermodal.component';
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';

import {AppMaterialModule} from '../../app-material.module';
import {EnumService} from '../../services/enum.service';
import {GeoScopeService} from '../../services/geoscope.service';
import {IntermodalSearchService} from '../services/im.search.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AbstractControl, ReactiveFormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';
import {CountryService} from '../../services/country.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {CountryModel} from '../../model/country.model';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SearchRoutesComponent', () => {
  let fixture: ComponentFixture<SearchIntermodalComponent>;
  let component: SearchIntermodalComponent;

  let titleDomElement: DebugElement;
  let titleHtmlElement: HTMLElement;
  let inland: AbstractControl;


  const countryStub: Array<CountryModel> = [new CountryModel(1, 'GERMANY', 'DE'), new CountryModel(2, 'FRANCE', 'FR')];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, BrowserAnimationsModule, AppMaterialModule, ReactiveFormsModule],
      declarations: [SearchIntermodalComponent],
      providers: [EnumService, CountryService, GeoScopeService, IntermodalSearchService,
        {provide: ComponentFixtureAutoDetect, useValue: true}],
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
    titleDomElement = fixture.debugElement.query(By.css('#im-search-form-title'));
    titleHtmlElement = titleDomElement.nativeElement;
    fillForm();
    inland = component.form.controls['inlandLocation'];
  });

  it('Component Should be Created', () => {
    expect(component).toBeTruthy();
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
    inland = component.form.controls['inlandLocation'];
    errors = inland.errors || {};
    expect(errors['required']).toBeTruthy();

    expect(component.form.valid).toBeFalsy();
  });

  it('Inland Location Is Set: Form Should be Valid', () => {


    inland.setValue('DEDUS');
    fixture.detectChanges();
    expect(component.form.valid).toBeTruthy();
    expect(component.isInvalid()).toBeFalsy();
  });
  const fillForm = function () {
    const includeImTariff = component.form.controls['includeImTariff'];
    includeImTariff.setValue(true);

    const geoScopeRadio = component.form.controls['inlandGeoScopeType'];
    geoScopeRadio.setValue('L')
    const preCarriageRadio = component.form.controls['preOnCarriage'];
    preCarriageRadio.setValue(false);
    const transportMode = component.form.controls['transportMode'];
    transportMode.setValue('TRUCK');
    const equipmentType = component.form.controls['equipmentType'];
    equipmentType.setValue('REEFER');
    const startDate = component.form.controls['startDate'];
    startDate.setValue('2018-07-23T09:33:01.145Z');
    const endDate = component.form.controls['startDate'];
    endDate.setValue('2018-08-06T09:33:01.146Z');
  };
});

describe('SearchRoutesComponent: Simulate autocomplete for Country', () => {
  let fixture: ComponentFixture<SearchIntermodalComponent>;
  let component: SearchIntermodalComponent;

  let countryService: CountryService;
  const countryServiceStub = {
    countryStub: [new CountryModel(1, 'GERMANY', 'DE'), new CountryModel(2, 'FRANCE', 'FR')],
    filterCountries: async function (countries: CountryModel[]) {
      component.filteredCountries = countries;
    }
  }
  const countryStub: Array<CountryModel> = [];
  countryStub.push(new CountryModel(1, 'GERMANY', 'DE'), new CountryModel(2, 'FRANCE', 'FR'));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, BrowserAnimationsModule, AppMaterialModule, ReactiveFormsModule],
      declarations: [SearchIntermodalComponent],
      providers: [EnumService, CountryService, GeoScopeService, IntermodalSearchService,
        {provide: ComponentFixtureAutoDetect, useValue: true}],
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
    countryService = fixture.debugElement.injector.get(CountryService);
  });
  it('Call CountryService#filterCountries with Jasmine Spy & fakeAsync', fakeAsync(() => {
    spyOn(countryService, 'filterCountries').and.returnValue(Observable.of(countryStub));

    expect(countryService).toBeTruthy();
    tick(1000);
    fixture.detectChanges();
    component.filterCountries('DE');
    expect(countryService.filterCountries).toHaveBeenCalled();
    expect(countryService.filterCountries).toHaveBeenCalledTimes(1);
    expect(countryService.filterCountries).toHaveBeenCalledWith('DE');
    expect(component.filteredCountries.length).toBe(2);
    expect(component.filteredCountries).toEqual(countryStub);
  }));

  it('Call CountryService#filterCountries with Jasmine Spy and async', async(() => {
    spyOn(countryService, 'filterCountries').and.returnValue(Observable.of(countryStub));

    component.filterCountries('DE');
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(countryService.filterCountries).toHaveBeenCalled();
      expect(countryService.filterCountries).toHaveBeenCalledTimes(1);
      expect(countryService.filterCountries).toHaveBeenCalledWith('DE');
      expect(component.filteredCountries.length).toBe(2);
      expect(component.filteredCountries).toEqual(countryStub);

    });
  }));
});
