/**
 * Created by ekirschning on 10.04.2017.
 */

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {EntityEnum} from '../../enums/app-enum';
import {KeyFigureModel} from '../models/keyfigure.model';
import {Observable, of} from 'rxjs';
import {keyfigures} from '../../testdata/keyfigure';


@Injectable()
export class IntermodalSearchService {

  readonly serverApi = `http://${location.host}/nre`;
  private resource = '/';
  private objectType = EntityEnum.INTERMODAL_RESULT;

  constructor(private http: HttpClient) {
  }


  private static getHeader(): HttpHeaders {
    return new HttpHeaders().set('Content-Type', 'application/json');
  }


  private getUrl(): string {
    return this.serverApi + this.resource + this.objectType + this.resource;
  }

  getKeyFigures(imSearchModel: object): Observable<Array<KeyFigureModel>> {
    console.log('#filter key figures in service');
    const search_params: HttpParams = this.prepareSearchParams(imSearchModel);
    console.log('#search params' + JSON.stringify(search_params));

    const URI = this.getUrl() + 'filter/';
    return this.http.get<Array<KeyFigureModel>>(URI, {params: search_params});

  }
  getTestKeyFigures(imSearchModel: object): Observable<Array<any>> {

    return of(keyfigures);
  }

  private prepareSearchParams(imSearchModel: Object) {
    console.log('startDate...');
    console.log('#: ' + JSON.stringify(imSearchModel['startDate']));
    console.log('.....startDate');
    const search_params = new HttpParams()
      .set('isPreCarriage', imSearchModel['preOnCarriage'])
      .set('includeImTariff', imSearchModel['includeImTariff'])
      .set('includeImSchedule', imSearchModel['includeImSchedule'])
      .set('inlandLocation', imSearchModel['inlandLocation'])
      .set('inlandGeoScopeType', imSearchModel['inlandGeoScopeType'])
      .set('countryCode', imSearchModel['countryCode'])
      .set('portLocation', imSearchModel['prefPort'])
      .set('includeAllPrefPorts', imSearchModel['includeAllPreferredPorts'])
      .set('transportMode', imSearchModel['transportMode'])
      .set('equipmentType', imSearchModel['equipmentType'])
      .set('eq20', imSearchModel['eq20'])
      .set('eq40', imSearchModel['eq40'])
      .set('eqHC', imSearchModel['eqHC'])
      .set('weight20', imSearchModel['weight20'])
      .set('weight40', imSearchModel['weight40'])
      .set('weightBasedOnly', imSearchModel['weightBasedOnly'])
      .set('startDate', imSearchModel['startDate'].toString().substring(0, 10))
      .set('endDate', imSearchModel['endDate'].toString().substring(0, 10));
    return search_params;
  }


}
