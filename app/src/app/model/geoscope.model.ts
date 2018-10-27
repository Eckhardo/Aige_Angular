/**
 * Created by ekirschning on 27.01.2018.
 */


export class GeoScopeModel {
  private _id?: number;
  private _locationCode: string;
  private _geoScopeType: string;
  private _countryCode: string;

  constructor(location_id: number, locationCode: string, geoscopeType: string , countryCode: string) {
    this._locationCode = locationCode;
    this._geoScopeType =geoscopeType;
    this._countryCode =countryCode;
  }


  get locationCode(): string {
    return this._locationCode;
  }

  get id(): number {
    return this._id;
  }

  get geoScopeType(): string {
    return this._geoScopeType;
  }

  get countryCode(): string {
    return this._countryCode;
  }

}
