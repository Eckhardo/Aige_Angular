import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {GeoScopeModel} from "../model/geoscope.model";
import {catchError, tap} from "rxjs/operators";
import {EntityEnum} from "../enums/app-enum";


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

const httpOptionsResponse = {
  headers: new HttpHeaders({'Content-Type': 'application/json'}),
  observe: 'response' as 'header'
};

let main_headers = {}
const apiUrl = 'http://localhost:5000/nre';
const  slash = '/';
const object_type=EntityEnum.GEOSCOPE;
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }



  private getUrl(): string {
    return  `${apiUrl}${slash}${object_type}${slash}`;
  }


  getLocations(): Observable<GeoScopeModel[]> {
    return this.http.get<GeoScopeModel[]>(this.getUrl())
      .pipe(
        tap(locations => console.log('fetched GeoScopeModel')),
        catchError(this.handleError('getGeoScopeModel', []))
      );
  }

  getLocationById(id: string): Observable<GeoScopeModel> {
    const url = `${this.getUrl()}/${id}`;
    return this.http.get<GeoScopeModel>(url).pipe(
      tap(_ => console.log(`fetched GeoScopeModel id=${id}`)),
      catchError(this.handleError<GeoScopeModel>(`getGeoScopeModelById id=${id}`))
    );
  }
  addLocation(GeoScopeModel: GeoScopeModel): Observable<GeoScopeModel> {
    return this.http.post<GeoScopeModel>(this.getUrl(), GeoScopeModel, httpOptions).pipe(
      tap((c: GeoScopeModel) => console.log(`added GeoScopeModel w/ id=${c.id}`)),
      catchError(this.handleError<GeoScopeModel>('addGeoScopeModel'))
    );
  }


  updateLocation(id: string, GeoScopeModel: GeoScopeModel): Observable<any> {
    const url = `${this.getUrl()}/${id}`;
    return this.http.put(url, GeoScopeModel, httpOptions).pipe(
      tap(_ => console.log(`updated GeoScopeModel id=${id}`)),
      catchError(this.handleError<any>('updateLocation'))
    );
  }

  deleteLocation(id: string): Observable<GeoScopeModel> {
    const url = `${this.getUrl()}/${id}`;
    return this.http.delete<GeoScopeModel>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted GeoScopeModel id=${id}`)),
      catchError(this.handleError<GeoScopeModel>('deleteLocation'))
    );
  }
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
