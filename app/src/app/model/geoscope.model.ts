/**
 * Created by ekirschning on 27.01.2018.
 */


export class GeoScopeModel {
  private _id?: number;
  private _locationCode: string;
  private _geoScopeType: string;
  private _countryCode: string;


  constructor(location_id: number, locationCode: string, geoscopeType: string , countryCode: string) {
    this._id=location_id;
    this._locationCode = locationCode;
    this._geoScopeType =geoscopeType;
    this._countryCode =countryCode;
  }


  get id(): number {
    return this._id;
  }

  get locationCode(): string {
    return this._locationCode;
  }

  get geoScopeType(): string {
    return this._geoScopeType;
  }

  get countryCode(): string {
    return this._countryCode;
  }

  set id(value: number) {
    this._id = value;
  }

  set locationCode(value: string) {
    this._locationCode = value;
  }

  set geoScopeType(value: string) {
    this._geoScopeType = value;
  }

  set countryCode(value: string) {
    this._countryCode = value;
  }
}
