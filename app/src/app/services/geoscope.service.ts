import {Observable, of, throwError as observableThrowError} from 'rxjs';
import {Injectable} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {EntityEnum} from '../enums/app-enum';
import {GeoScopeModel} from '../model/geoscope.model';

import {VesselSystemModel} from '../model/vesselsystem.model';
import {TradeModel} from '../model/trade.model';
import {ContractModel} from '../model/contract.model';

/**
 * Created by ekirschning on 28.03.2017.
 */

@Injectable()
export class GeoScopeService {
  locations: Array<GeoScopeModel> = [];
  prefPorts: Array<GeoScopeModel> = [];

  readonly serverApi = 'http://localhost:5000/nre';
  // readonly serverApi = `http://${location.host}/nre`;
  private slash = '/';

  constructor(private http: HttpClient) {
  }

  public static getHeader(): HttpHeaders {
    return new HttpHeaders().set('Content-Type', 'application/json');
  }

  private getUrl(objectType: EntityEnum): string {
    return this.serverApi + this.slash + objectType + this.slash;
  }


  filterVesselSystems(query: string): Observable<VesselSystemModel[]> {
    const search_params = new HttpParams().set('vs_code', query.toUpperCase());
    const URI = this.getUrl(EntityEnum.VESSEL_SYSTEMS) + 'filter/';
    return this.http
      .get<Array<VesselSystemModel>>(URI, {params: search_params}).pipe(
        catchError(this._handleError));
  }


  filterLocations(query: string, geoScopeType: string, countryCode: string): Observable<Array<GeoScopeModel>> {
    const search_params: HttpParams = this.prepareGeoScopeSearchParams(query, geoScopeType, countryCode);
    const URI = this.getUrl(EntityEnum.GEOSCOPE) + 'filter/';
    console.log('uri:' + URI);
    console.log('params:' + search_params);
    return this.http
      .get<Array<GeoScopeModel>>(URI, {params: search_params}).pipe(
        catchError(this._handleError));
  }


  filterPreferredPorts(query: string, geoScopeType: string, countryCode: string): Observable<Array<GeoScopeModel>> {
    const search_params: HttpParams = this.prepareGeoScopeSearchParams(query, geoScopeType, countryCode);
    const URI = this.getUrl(EntityEnum.GEOSCOPE) + 'preferredPort/';
    console.log('uri:' + URI);
    console.log('params:' + search_params);
    return this.http
      .get<Array<GeoScopeModel>>(URI, {params: search_params})
      .pipe(
        catchError(this._handleError));
  }

  filterPorts(query: string): Observable<Array<GeoScopeModel>> {
    const search_params = new HttpParams().set('location_code', query.toUpperCase());
    const URI = this.getUrl(EntityEnum.GEOSCOPE) + 'ports/';
    console.log('uri:' + URI);
    console.log('params:' + search_params);
    return this.http
      .get<Array<GeoScopeModel>>(URI, {params: search_params})
      .pipe(
        catchError(this._handleError));
  }

  prepareGeoScopeSearchParams(query: string, geoScopeType: string, countryCode: string) {
    const search_params = new HttpParams()
      .set('location_code', query.toUpperCase())
      .set('geo_scope_type', geoScopeType.toUpperCase())
      .set('country_code', countryCode);
    return search_params;
  }


  filterContracts(query: string): Observable<Array<ContractModel>> {
    const search_params: HttpParams = new HttpParams()
      .set('contract_no', query.toUpperCase());
    const URI = this.getUrl(EntityEnum.CONTRACT) + 'filter/';

    return this.http
      .get<Array<ContractModel>>(URI, {params: search_params})
      .pipe(
        catchError(this._handleError));
  }

  filterContractGroups(query: string): Observable<Array<ContractModel>> {
    const search_params: HttpParams = new HttpParams()
      .set('contract_no', query.toUpperCase());
    const URI = this.getUrl(EntityEnum.CONTRACT_GROUP) + 'filter/';

    return this.http
      .get<Array<ContractModel>>(URI, {params: search_params})
      .pipe(
        catchError(this._handleError));
  }


  filterTrades(query: string): Observable<Array<TradeModel>> {
    const search_params: HttpParams = new HttpParams()
      .set('trade_code', query.toUpperCase());
    const URI = this.getUrl(EntityEnum.TRADE) + 'filter/';

    return this.http
      .get<Array<TradeModel>>(URI, {params: search_params})
      .pipe(
        catchError(this._handleError));
  }

  private _handleError(err: HttpErrorResponse | any) {
    console.log('_handleError:' + err);
    const errorMsg = err.message || 'Error: Unable to complete request.';
    return observableThrowError(errorMsg);
  }

  // dummy methods

  findLocationsMock(): Observable<Array<GeoScopeModel>> {
    return of(this.buildLocations());
  }

  private buildLocations(geoScope?: GeoScopeModel) {
    let geoScopes: Array<GeoScopeModel> = [];
    geoScopes.push(new GeoScopeModel('1', 'DE', 'DEHAM', 'L'));
    geoScopes.push(new GeoScopeModel('2', 'DE', 'DEBRV', 'L'));
    geoScopes.push(new GeoScopeModel('3', 'NL', 'NLRTM', 'L'));
    geoScopes.push(new GeoScopeModel('4', 'BE', 'BEANR', 'L'));

    geoScopes.push(new GeoScopeModel('5', 'DE', 'DUSSELDORF', 'T'));
    geoScopes.push(new GeoScopeModel('6', 'DE', 'DUSHEIM', 'T'));
    geoScopes.push(new GeoScopeModel('7', 'DE', 'DUSENHAUSEN', 'T'));
    geoScopes.push(new GeoScopeModel('8', 'DE', 'DEDUS', 'L'));
    geoScopes.push(new GeoScopeModel('9', 'DE', 'DEDUI', 'L'));
    if (geoScope != undefined) {
      geoScopes.push(geoScope);
    }
    return geoScopes;
  }

  saveLocationMock(geoScope: GeoScopeModel) {

    console.log('saveLocationMock:' + JSON.stringify(geoScope));
    this.buildLocations(geoScope);


  }

  filterPortLocations(query: string): Observable<Array<GeoScopeModel>> {
    console.log('service: filter port GEOSCOPE_TEST_DATA:' + query);
    this.prefPorts = [];
    this.prefPorts.push(new GeoScopeModel('1', 'DE', 'DEHAM', 'L'));
    this.prefPorts.push(new GeoScopeModel('2', 'DE', 'DEBRV', 'L'));
    this.prefPorts.push(new GeoScopeModel('3', 'NL', 'NLRTM', 'L'));
    this.prefPorts.push(new GeoScopeModel('4', 'BE', 'BEANR', 'L'));

    return of(this.prefPorts);
  }

  filterPodLocations(query: string): Observable<Array<GeoScopeModel>> {
    console.log('service: filter port GEOSCOPE_TEST_DATA:' + query);
    this.prefPorts = [];
    this.prefPorts.push(new GeoScopeModel('1', '', 'BRSSZ', ''));
    this.prefPorts.push(new GeoScopeModel('2', '', 'BRMAO', ''));
    this.prefPorts.push(new GeoScopeModel('3', '', 'BRSUA', ''));
    this.prefPorts.push(new GeoScopeModel('4', '', 'BRITA', ''));
    return of(this.prefPorts);
  }


  filterVS(query: string): Observable<VesselSystemModel[]> {
    const vs: Array<VesselSystemModel> = [];
    return of(vs);
  }

}
