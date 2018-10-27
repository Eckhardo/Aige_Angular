import {Component} from '@angular/core';
import {EquipmentGroup, EquipmentSize, GeoScopeType, IntermodalMode} from '../../enums/enum.index';
import {EnumService} from '../../services/enum.service';

import {AbstractControl, Validators} from '@angular/forms';

import {debounceTime, distinctUntilChanged, filter} from 'rxjs/operators';

import {GeoScopeService} from '../../services/geoscope.service';
import {GeoScopeModel} from '../../model/geoscope.model';
import {CountryModel} from '../../model/country.model';
import {IntermodalSearchService} from '../services/im.search.service';
import {KeyFigureModel} from '../models/keyfigure.model';
import {CountryService} from '../../services/country.service';
import {IntermodalSearchReactiveForm} from './search-intermodal.component.form';

@Component({
  selector: 'app-search-intermodal',
  templateUrl: './search-intermodal.component.html',
  styleUrls: ['./search-intermodal.component.css']
})
export class SearchIntermodalComponent {

  title = 'Search Key Figures';
  isCollapsed = true;
  button_name = 'Hide Form'
  showSpinner = false;
  isActive = false;
  equipmentSizes: Array<string>;
  equipmentTypes: Array<string>;
  transportModes: Array<string>;
  geoScopeTypes: Array<string>;
  formClass: IntermodalSearchReactiveForm;
  filteredInlandGeoScopes: GeoScopeModel[] = [];
  filteredPortGeoScopes: GeoScopeModel[] = [];
  filteredCountries: Array<CountryModel> = [];
  keyFigures: Array<any> = [];

  constructor(private enumService: EnumService, private countryService: CountryService,
              private masterDataService: GeoScopeService, private searchService: IntermodalSearchService) {

    this.equipmentSizes = this.enumService.getEnumValues(EquipmentSize);
    this.equipmentTypes = this.enumService.getEnumKeys(EquipmentGroup);
    this.geoScopeTypes = this.enumService.getEnumValues(GeoScopeType);
    this.transportModes = this.enumService.getEnumValues(IntermodalMode);
    this.formClass = new IntermodalSearchReactiveForm();
    // set default values in form
    this.patchDefaultValues();

    // event handler
    this.onInlandLocationChanges(this.formClass.inlandLocation);
    this.onCountryCodeChanges(this.formClass.countryCode);
    this.onPortLocationChanges(this.formClass.prefPort);
    this.onStartDateChanges(this.formClass.startDate);
    this.onInlandGeoScopeChanges(this.formClass.inlandGeoScopeType);
    this.onIncludeAllPreferredPorts(this.formClass.includeAllPreferredPorts);
  }

  get form() {
    return this.formClass.searchIntermodalForm;
  }


  isCountryDisplayed() {
    return this.formClass.inlandGeoScopeType.value === 'T' || this.formClass.inlandGeoScopeType.value === 'P';
  }

  eqSizeSelected() {
    return this.formClass.eqSize20.value === true || this.formClass.eqSize40.value === true;
  }

  allPortsSelected() {
    return this.formClass.includeAllPreferredPorts.value === true;

  }

  toggle() {
    this.isCollapsed = !this.isCollapsed;

    // CHANGE THE TEXT OF THE BUTTON.
    if (this.isCollapsed) {
      this.button_name = 'Hide Form';
    } else {
      this.button_name = 'Show Form';
    }
  }

  isInvalid() {
    return this.form.invalid;
  }


  filterKeyFigures() {
    this.searchService.getKeyFigures(this.form.value).subscribe(result => {
      if (result && result.length > 0) {
        this.keyFigures = result;
        this.toggle();
      }
    });
  }

  reset() {
    this.patchDefaultValues();
    this.setEndDate(this.formClass.startDate.value);
    this.filteredPortGeoScopes = [];
    this.filteredInlandGeoScopes = [];

  }

  /**
   *
   * @param {AbstractControl} control
   */
  private onInlandLocationChanges(control: AbstractControl) {
    console.log('onInlandLocationChanges:' + control.value);
    const locationObserver = {
      next: data => {
        const theLength: number = data.toString().trim().length;
        if (theLength === 0) {
          this.filteredInlandGeoScopes = [];
          this.filteredPortGeoScopes = [];
          this.formClass.inlandLocation.markAsPristine();
          return;
        }
        if (theLength <= this.determineMinInputLength()) {
          this.filteredInlandGeoScopes = [];
          this.filteredPortGeoScopes = [];
          return;
        }
        this.filterLocations(data, this.formClass.inlandGeoScopeType.value, this.formClass.countryCode.value);

      },
      error: err => console.error('Observer got an error: ' + err),
    };

    control.valueChanges
      .pipe(debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(locationObserver);
  }

  /**
   *
   * @param {string} location
   * @param {string} type
   * @param {string} country
   * @returns {any}
   */
  filterLocations(location: string, type: string, country: string): any {
    this.masterDataService.filterLocations(location, type, country).subscribe(
      result => {
        if (result.length === 1) {
          const singleRow: string = result[0].locationCode;
          this.formClass.inlandLocation.patchValue(singleRow.toUpperCase());
          this.filteredInlandGeoScopes = [];
          this.filteredPortGeoScopes = [];
          this.retrievePreferredPorts();
        } else if (result.length <= 1) {
          this.retrievePreferredPorts();
        } else {
          this.filteredInlandGeoScopes = result;
        }
        return result;
      });
  }

  /**
   *
   * @param {AbstractControl} control
   */

  private onCountryCodeChanges(control: AbstractControl) {
  this.logit('onCountryCodeChanges for value:' + control.value);
    control.valueChanges
      .pipe(debounceTime<string>(400), distinctUntilChanged(), filter(data => data.toString().length > 0))
      .subscribe(data => this.filterCountries(data));
  }

  /**
   * Search for Countries
   *
   * @param countryCode
   */
  filterCountries(countryCode) {
    const countryObserver = {
      next: result => {
        if (result.length === 1) {
          this.formClass.countryCode.patchValue(result[0].code);
          this.filteredCountries = [];
        } else {
           this.filteredCountries = result;
        }
      },
      error: err => console.error('Observer got an error: ' + err),
      complete: () => console.log('finished'),
    };

    this.countryService.filterCountries(countryCode).subscribe(countryObserver);
  }

  /**
   *
   * @param {AbstractControl} control
   */
  private onInlandGeoScopeChanges(control: AbstractControl) {
    const geoScopeObserver = {
      next: data => {
        if (data === 'T' || data === 'P') {
          this.formClass.countryCode.setValidators(
            [Validators.required]
          );
          this.formClass.countryCode.markAsTouched({onlySelf: true});
        } else {
          this.formClass.countryCode.patchValue('');
          this.formClass.countryCode.setValidators([]);
        }
        this.formClass.countryCode.updateValueAndValidity({onlySelf: true, emitEvent: true});
        this.formClass.inlandLocation.patchValue('');
      },
      error: err => console.error('Observer got an error: ' + err),
    };
    control.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe(geoScopeObserver);

  }

  /**
   *
   * @param {AbstractControl} control
   */
  private onPortLocationChanges(control: AbstractControl) {
    control.valueChanges
      .subscribe(data => {
        this.filteredPortGeoScopes = [];
        this.retrievePreferredPorts();
      });
  }

  /**
   *
   */
  private retrievePreferredPorts() {
    this.masterDataService.filterPorts(this.formClass.inlandLocation.value).subscribe(
      result => {
        console.log('result:' + JSON.stringify(result));
        if (result.length === 1) {
          const singleRow: string = result[0].locationCode;
          this.formClass.prefPort.patchValue(singleRow.toUpperCase());
          this.filteredPortGeoScopes = [];
        } else {
          this.filteredPortGeoScopes = result;
        }
      });
  }

  /**
   *
   * @param {AbstractControl} control
   */
  private onIncludeAllPreferredPorts(control: AbstractControl) {
    control.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe(data => {
        if (data) {
          this.retrievePreferredPorts();
        }
      });
  }

  private onStartDateChanges(control: AbstractControl | any) {
    control.valueChanges.pipe(distinctUntilChanged()).subscribe(data => {
      this.formClass.startDate.patchValue(new Date(data).toISOString());
      this.setEndDate(new Date(data));
    });
  }

  private setEndDate(date: Date) {
    const newDay: number = ( date.getDate() + 14);
    const newDate: Date = new Date();
    newDate.setDate(newDay);
    this.formClass.endDate.patchValue(newDate.toISOString());
  }

  private patchDefaultValues() {
    this.formClass.includeKeyFigure.patchValue(true);
    this.formClass.includeImTariff.patchValue(false);
    this.formClass.includeImSchdeule.patchValue(false);
    this.formClass.eqSize20.patchValue(true);
    this.formClass.eqSize40.patchValue(true);
    this.formClass.preOnCarriage.patchValue('true');
    this.formClass.eqType.patchValue('GENERAL');
    this.formClass.transportMode.patchValue('ALL');
    this.formClass.inlandLocation.patchValue('');
    this.formClass.prefPort.patchValue('');
    this.formClass.inlandGeoScopeType.patchValue('L');
    this.formClass.includeAllPreferredPorts.patchValue(true);
    this.formClass.startDate.patchValue(new Date().toISOString());
    this.setEndDate(new Date(this.formClass.startDate.value));

    this.formClass.includeKeyFigure.disable({onlySelf: true, emitEvent: false});
    this.formClass.weight20.patchValue('');
    this.formClass.weight40.patchValue('');
    this.formClass.weigthBasedOnly.patchValue(false);

  }

  private determineMinInputLength(): number {
    let length = 1;
    let type: string;
    type = this.enumService.getKeyByValue(GeoScopeType, this.formClass.inlandGeoScopeType.value);
    switch (type) {
      case 'LOCATION':
        length = 2;
        break;
      case 'CITY':
        length = 2;
        break;
      case 'FACILITY':
        length = 4;
        break;
      case 'POSTAL_CODE':
        length = 3;
        break;

      default:

    }
    return length;
  }

  private logit (logInfo:string){
    console.log(logInfo);
  }
}
