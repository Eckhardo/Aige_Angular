import {Injectable} from '@angular/core';
import {Observable, throwError,of} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {EntityEnum} from '../enums/app-enum';
import {CountryModel} from '../model/country.model';
import {catchError} from 'rxjs/operators';

@Injectable()
export class CountryService {
  countryCodes: Array<CountryModel> = [];

//  readonly serverApi = 'http://localhost:8086/nre';
  readonly serverApi = `http://${location.host}/nre`;
  private resource = '/';

  constructor(private http: HttpClient) {
  }

  public static getHeader(): HttpHeaders {
    return new HttpHeaders().set('Content-Type', 'application/json');
  }


  private getUrl(objectType: EntityEnum): string {
    return this.serverApi + this.resource + objectType + this.resource;
  }



  filterCountries(query: string): Observable<Array<CountryModel>> {
    console.error('service:filter countries:', query);
    const search_params: HttpParams = new HttpParams().set('country_code', query.toUpperCase());
    const URI = this.getUrl(EntityEnum.COUNTRY) + 'filter/';
    let result: Observable<Array<CountryModel>>;
    result = this.http
      .get<Array<CountryModel>>(URI, {params: search_params}).pipe(
      catchError(this._handleError));
    console.log('find Countries Result:');
    return result;
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
    return throwError(errorMsg);


  }

  private log(message: any) {
    console.log('CountryService: ' + message);
  }

  filterCountryCode(query: string):Observable<Array<CountryModel>> {
    this.log('filter country code:' + query);
   this.countryCodes= [];
      this.countryCodes.push(new CountryModel(1, 'DK', 'DK'));
      this.countryCodes.push(new CountryModel(1, 'DE', 'DE'));
      this.countryCodes.push(new CountryModel(1, 'FR', 'FR'));
      this.countryCodes.push(new CountryModel(1, 'NL', 'NL'));
      this.countryCodes.push(new CountryModel(1, 'SE', 'SE'));
      this.countryCodes.push(new CountryModel(1, 'NO', 'NO'));
     const result: CountryModel[] =this.countryCodes.filter((countryCode) => countryCode.code.toLowerCase().startsWith(query.toLowerCase()));
     return of(result);

  }
}
