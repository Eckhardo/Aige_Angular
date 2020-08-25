/**
 * Created by ekirschning on 27.01.2018.
 */


export class GeoScopeModel {
  private _id?: string;
  private _countryCode: string;
  private _locationCode: string;
  private _geoScopeType: string;
  private _name: string;
  private _port: boolean;


  constructor(location_id: string, countryCode: string, locationCode: string, geoscopeType: string, name: string = '', port: boolean = false) {
    this._id = location_id;
    this._locationCode = locationCode;
    this._geoScopeType = geoscopeType;
    this._countryCode = countryCode;
    this._name = name;
    this._port = port;
  }


  get id(): string {
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

  get name(): string {
    return this._name;
  }

  get port(): boolean {
    return this._port;
  }

  set id(value: string) {
    this._id = value;
  }

}
