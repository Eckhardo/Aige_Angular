/**
 * Created by ekirschning on 27.01.2018.
 */


export class GeoScopeModel {
  private _id?: number;
  private _locationCode: string;
  private _geoScopeType: string;
  private _countryCode: string;

  get countryCode(): string {
    return this._countryCode;
  }

  constructor(location_id: number, locationCode: string) {
    this._locationCode = locationCode;
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
}
