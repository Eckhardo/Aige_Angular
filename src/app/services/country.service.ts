import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {EntityEnum} from '../enums/app-enum';
import {CountryModel} from '../model/country.model';

import {catchError, tap} from 'rxjs/operators';

@Injectable()
export class CountryService {
  countryCodes: Array<CountryModel> = [];

  readonly serverApi = 'http://localhost:8080/nre';
  private resource = '/';

  constructor(private http: HttpClient) {
  }

  public static getHeader(): HttpHeaders {
    return new HttpHeaders().set('Content-Type', 'application/json');
  }


  private getUrl(objectType: EntityEnum): string {
    return this.serverApi + this.resource + objectType + this.resource;
  }


  filterCountriesOLD(query: string): Observable<Array<CountryModel>> {
    const search_params: HttpParams = new HttpParams()
      .set('country_code', query.toUpperCase());
    const URI = `${this.getUrl(EntityEnum.COUNTRY)}filter/`;
    console.log('uri:' + URI);
    console.log('params:' + search_params);


    return this.http
      .get<Array<CountryModel>>(URI, {params: search_params}).map(data => {
        this.log('Data: ' + JSON.stringify(data));
        return data;
      })
      .catch(this._handleError);
  }

  filterCountries(query: string): Observable<Array<CountryModel>> {
    const search_params: HttpParams = new HttpParams().set('country_code', query.toUpperCase());
    const URI = this.getUrl(EntityEnum.COUNTRY) + 'filter/';
    let result: Observable<Array<CountryModel>>;
    result = this.http
      .get<Array<CountryModel>>(URI, {params: search_params})
      .catch(this._handleError);

    return result;
  }

  filterCountriesTest(query: string): Observable<Array<CountryModel>> {
    const search_params: HttpParams = new HttpParams().set('country_code', query.toUpperCase());
    const URI = this.getUrl(EntityEnum.COUNTRY) + 'filter/';
    let result: Observable<Array<CountryModel>>;
    result = this.http
      .get<Array<CountryModel>>(URI, {params: search_params})
      .catch(this._handleError);

    return result;
  }


  filterCountriesNEW(query: string): Observable<Array<CountryModel>> {
    const search_params: HttpParams = new HttpParams()
      .set('country_code', query.toUpperCase());
    const URI = ` ${this.getUrl(EntityEnum.COUNTRY)}filter/`;
    return this.http
      .get<Array<CountryModel>>(URI, {params: search_params}).pipe(
        tap(data => this.log('Data: ' + JSON.stringify(data))),
        catchError(this._handleError)
      );
  }


  private _handleError(error: HttpErrorResponse | any) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    const errorMsg = error.message || 'Error: Unable to complete request.';
    return Observable.throw(errorMsg);


  }

  private log(message: any) {
    console.log('CountryService: ' + message);
  }

  filterCountryCode(query: string) {
    if (this.countryCodes.length === 0) {
      this.countryCodes.push(new CountryModel(1, 'BE', ''));
      this.countryCodes.push(new CountryModel(1, 'DE', ''));
      this.countryCodes.push(new CountryModel(1, 'FR', ''));
      this.countryCodes.push(new CountryModel(1, 'NL', ''));
      this.countryCodes.push(new CountryModel(1, 'SE', ''));
      this.countryCodes.push(new CountryModel(1, 'NO', ''));
      return this.countryCodes.filter((countryCode) => countryCode.code.toLowerCase().startsWith(query.toLowerCase()));

    }
  }
}
