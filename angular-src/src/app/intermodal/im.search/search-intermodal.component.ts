import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {EquipmentGroup, EquipmentSize, GeoScopeType, IntermodalMode} from '../../enums/enum.index';
import {EnumService} from '../../services/enum.service';

import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import {GeoScopeService} from '../../services/geoscope.service';
import {GeoScopeModel} from '../../model/geoscope.model';
import {CountryModel} from '../../model/country.model';
import {IntermodalSearchService} from '../services/im.search.service';
import {KeyFigureModel} from '../models/keyfigure.model';


@Component({
  selector: 'app-search-intermodal',
  templateUrl: './search-intermodal.component.html',
  styleUrls: ['./search-intermodal.component.css']
})
export class SearchIntermodalComponent implements OnInit, OnChanges {

  title = 'Search Key Figures';
  isCollapsed = true;
  button_name = 'Hide Form'
  showSpinner = false;
  isActive = false;
  equipmentSizes: Array<string>;
  equipmentTypes: Array<string>;
  transportModes: Array<string>;
  geoScopeTypes: Array<string>;

  searchFormIntermodal: FormGroup;
  filteredInlandGeoScopes: GeoScopeModel[] = [];
  filteredPortGeoScopes: GeoScopeModel[] = [];
  filteredCountries: Array<CountryModel> = [];
  keyFigures: Array<KeyFigureModel> = [];
  totalPages:number = 0;
  totalElements:number = 0;

  constructor( private enumService: EnumService,
              private masterDataService: GeoScopeService, private searchService: IntermodalSearchService) {
    console.log('constuctor');

    this.equipmentSizes = this.enumService.getEnumValues(EquipmentSize);
    this.equipmentTypes = this.enumService.getEnumKeys(EquipmentGroup);
    this.geoScopeTypes = this.enumService.getEnumValues(GeoScopeType);
    this.transportModes = this.enumService.getEnumValues(IntermodalMode);

    this.searchFormIntermodal = new FormGroup({
      includeKeyFigure: new FormControl(),
      includeImTariff: new FormControl(),
      includeImSchedule: new FormControl(),
      preOnCarriage: new FormControl('true', Validators.required),
      inlandLocation: new FormControl('', Validators.required),
      inlandGeoScopeType: new FormControl(),
      countryCode: new FormControl(''),
      transportMode: new FormControl('', Validators.required),
      prefPort: new FormControl(''),
      includeAllPreferredPorts: new FormControl(true),
      equipmentType: new FormControl('', Validators.required),
      startDate: new FormControl(new Date().toISOString(), Validators.required),
      endDate: new FormControl(new Date().toISOString()),
      eq20: new FormControl(true),
      eq40: new FormControl(true),
      eqHC: new FormControl(true),
      weight20: new FormControl(),
      weight40: new FormControl(),
      weightBasedOnly: new FormControl()

    });

    // set default values in form
    this.patchDefaultValues();
    this.setEndDate(new Date(this.startDate.value));

    // event handler
    this.onInlandLocationChanges(this.inlandLocation);
    this.onCountryCodeChanges(this.countryCode);
    this.onPortLocationChanges(this.prefPort);
    this.onStartDateChanges(this.startDate);
    this.onInlandGeoScopeChanges(this.inlandGeoScopeType);
    this.onIncludeAllPreferredPorts(this.includeAllPreferredPorts);
  }

  get form() {
    return this.searchFormIntermodal;
  }

  get includeKeyFigure() {
    return this.form.get('includeKeyFigure');
  }

  get includeImTariff() {
    return this.form.get('includeImTariff');
  }


  get includeImSchdeule() {
    return this.form.get('includeImSchedule');
  }

  get preOnCarriage() {
    return this.form.get('preOnCarriage');
  }


  get inlandLocation() {
    return this.form.get('inlandLocation');
  }

  get countryCode() {
    return this.form.get('countryCode');
  }

  get prefPort() {
    return this.form.get('prefPort');
  }

  get inlandGeoScopeType() {
    return this.form.get('inlandGeoScopeType');
  }

  get includeAllPreferredPorts() {
    return this.form.get('includeAllPreferredPorts');
  }

  get eqType() {
    return this.form.get('equipmentType');
  }


  get transportMode() {
    return this.form.get('transportMode');
  }


  get startDate() {
    return this.form.get('startDate');
  }

  get endDate() {
    return this.form.get('endDate');
  }

  get eqSize20() {
    return this.form.get('eq20');
  }

  get eqSize40() {
    return this.form.get('eq40');
  }

  get weight20() {
    return this.form.get('weight20');

  }

  get weight40() {
    return this.form.get('weight40');

  }

  get weigthBasedOnly() {
    return this.form.get('weightBasedOnly');

  }

  isCountryDisplayed() {
    return this.inlandGeoScopeType.value === 'T' || this.inlandGeoScopeType.value === 'P';
  }

  eqSizeSelected() {
    return this.eqSize20.value === true || this.eqSize40.value === true;
  }

  allPortsSelected() {
    return this.includeAllPreferredPorts.value === true;

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
    console.log('filter key figures');
    this.showSpinner = false;
    this.searchService.getKeyFigures(this.form.value).subscribe(result => {
      console.log('key figures: ' + JSON.stringify(result));
      if (result && result.length > 0) {
        this.keyFigures = result;
        this.toggle();
      }
    },
(error) => {
  console.log(error.error.message);

});


    setTimeout(() => {
      this.showSpinner = false;
    }, 1000);
  }

  reset() {
    //   this.searchFormIntermodal.reset();
    this.patchDefaultValues();
    this.setEndDate(this.startDate.value);
    this.filteredPortGeoScopes = [];
    this.filteredInlandGeoScopes = [];

  }


  private onInlandLocationChanges(control: AbstractControl) {
    control.valueChanges
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(data => {
        const theLength: number = data.toString().trim().length;
        if (theLength === 0) {
          this.filteredInlandGeoScopes = [];
          this.filteredPortGeoScopes = [];

          this.inlandLocation.markAsPristine();
          return;
        }
        if (theLength <= this.determineMinInputLength()) {
          this.filteredInlandGeoScopes = [];
          this.filteredPortGeoScopes = [];
          return;
        }

        this.masterDataService.filterLocations(data, this.inlandGeoScopeType.value, this.countryCode.value).subscribe(
          result => {

            console.log('result:' + JSON.stringify(result));
            if (result.length === 1) {
              const singleRow: string = result[0].locationCode;
              this.inlandLocation.patchValue(singleRow.toUpperCase());
              this.filteredInlandGeoScopes = [];
              this.filteredPortGeoScopes = [];
              console.log('single:' + JSON.stringify(this.inlandLocation.value));
              this.retrievePreferredPorts();
            } else if (result.length <= 1) {
              this.retrievePreferredPorts();
            } else {
              this.filteredInlandGeoScopes = result;

            }
          });

      });

  }

  private onCountryCodeChanges(control: AbstractControl) {
    control.valueChanges
      .debounceTime(400)
      .distinctUntilChanged()
      .subscribe(data => {
        if (data.toString().trim().length === 0) {
          this.filteredCountries = [];
          this.countryCode.markAsPristine();
          return;
        }
        this.masterDataService.filterCountries(data).subscribe(
          result => {
            console.log('result:' + JSON.stringify(result));
            if (result.length === 1) {
              const singleRow: string = result[0].code;
              this.countryCode.patchValue(singleRow.toUpperCase());
              this.filteredCountries = [];
            } else {
              this.filteredCountries = result;
            }
          });
      });

  }

  private onInlandGeoScopeChanges(control: AbstractControl) {

    control.valueChanges
      .distinctUntilChanged()
      .subscribe(data => {
        if (data === 'T' || data === 'P') {
          this.countryCode.setValidators(
            [Validators.required]
          );
          this.countryCode.markAsTouched({onlySelf: true});
        } else {
          this.countryCode.patchValue('');
          this.countryCode.setValidators([]);
        }
        this.countryCode.updateValueAndValidity({onlySelf: true, emitEvent: true});
        this.inlandLocation.patchValue('');
      });

  }

  private onPortLocationChanges(control: AbstractControl) {
    control.valueChanges
      .subscribe(data => {
        this.filteredPortGeoScopes = [];
        this.retrievePreferredPorts();
      });
  }


  private retrievePreferredPorts() {
    this.masterDataService.filterPreferredPorts(this.inlandLocation.value, this.inlandGeoScopeType.value, this.countryCode.value).subscribe(
      result => {
        console.log('result:' + JSON.stringify(result));
        if (result.length === 1) {
          const singleRow: string = result[0].locationCode;
          this.prefPort.patchValue(singleRow.toUpperCase());
          this.filteredPortGeoScopes = [];
        } else {
          this.filteredPortGeoScopes = result;
        }
      });
  }

  private onIncludeAllPreferredPorts(control: AbstractControl) {
    control.valueChanges
      .distinctUntilChanged()
      .subscribe(data => {

        if (data) {
          console.log('include all');
          this.retrievePreferredPorts();

        } else {
          console.log('include selected');
        }

      });

  }

  private onStartDateChanges(control: AbstractControl | any) {
    control.valueChanges.distinctUntilChanged().subscribe(data => {
      this.startDate.patchValue(new Date(data).toISOString());
      this.setEndDate(new Date(data));
    });
  }

  private setEndDate(date: Date) {
    const newDay: number = ( date.getDate() + 14);
    const newDate: Date = new Date();
    newDate.setDate(newDay);

    this.endDate.patchValue(newDate.toISOString());
  }

  private patchDefaultValues() {
    this.includeKeyFigure.patchValue(true);
    this.includeImTariff.patchValue(false);
    this.includeImSchdeule.patchValue(false);
    this.eqSize20.patchValue(true);
    this.eqSize40.patchValue(true);
    this.preOnCarriage.patchValue('true');
    this.eqType.patchValue('GENERAL');
    this.transportMode.patchValue('ALL');
    this.inlandLocation.patchValue('');
    this.prefPort.patchValue('');
    this.inlandGeoScopeType.patchValue('L');
    this.includeAllPreferredPorts.patchValue(true);
    this.startDate.patchValue(new Date().toISOString());
    this.includeKeyFigure.disable({onlySelf: true, emitEvent: false});
    this.weight20.patchValue('');
    this.weight40.patchValue('');
    this.weigthBasedOnly.patchValue(false);

  }

  private determineMinInputLength(): number {
    let length = 1;
    let type: string;
    type = this.enumService.getKeyByValue(GeoScopeType, this.inlandGeoScopeType.value);
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


  ngOnInit() {
    console.log('init');

  }


  ngOnChanges(changes: SimpleChanges): void {
    console.log('on changes' + JSON.stringify(changes));
  }


}
