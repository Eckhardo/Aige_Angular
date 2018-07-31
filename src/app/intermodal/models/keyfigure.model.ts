/**
 * Created by ekirschning on 27.02.2018.
 */
import {GeoScopeModel} from '../../model/geoscope.model';


export class KeyFigureModel {
  private _from: GeoScopeModel;
  private _via: GeoScopeModel;

  private _to: GeoScopeModel;

  private _imRouteKey: number;

  private _kfRateValueId: number;

  private _kfRateId: number;

  private _kfRelationId: number;

  private _transportMode: string;

  private _intermodalMode: string;

  private _isPreferred: boolean;

  private _equipmentSize: string;

  private _equipmentGroup: string;

  private _rate: number;

  private _currency: string; // nullable

  private _hsWeightClass: number;

  private _defaultEquipmentSize: string;

  private _startDate: Date;

  private _imTariffInfo: Array<number>;

  private _imScheduleInfo: Array<number>;


  constructor(from: GeoScopeModel, via: GeoScopeModel, to: GeoScopeModel, imRouteKey: number, transportMode: string, isPreferred: boolean, equipmentSize: string, equipmentGroup: string, rate: number, currency: string, hsWeightClass: number, startDate: Date, imTariffInfo: Array<number>, imScheduleInfo: Array<number>) {
    this._from = from;
    this._via = via;
    this._to = to;
    this._imRouteKey = imRouteKey;
    this._transportMode = transportMode;
    this._isPreferred = isPreferred;
    this._equipmentSize = equipmentSize;
    this._equipmentGroup = equipmentGroup;
    this._rate = rate;
    this._currency = currency;
    this._hsWeightClass = hsWeightClass;
    this._startDate = startDate;
    this._imTariffInfo = imTariffInfo;
    this._imScheduleInfo = imScheduleInfo;
  }

  get from(): GeoScopeModel {
    return this._from;
  }

  get via(): GeoScopeModel {
    return this._via;
  }

  get to(): GeoScopeModel {
    return this._to;
  }

  get imRouteKey(): number {
    return this._imRouteKey;
  }

  get kfRateValueId(): number {
    return this._kfRateValueId;
  }

  get kfRateId(): number {
    return this._kfRateId;
  }

  get kfRelationId(): number {
    return this._kfRelationId;
  }

  get transportMode(): string {
    return this._transportMode;
  }

  get intermodalMode(): string {
    return this._intermodalMode;
  }

  get isPreferred(): boolean {
    return this._isPreferred;
  }

  get equipmentSize(): string {
    return this._equipmentSize;
  }

  get equipmentGroup(): string {
    return this._equipmentGroup;
  }

  get rate(): number {
    return this._rate;
  }

  get currency(): string {
    return this._currency;
  }

  get hsWeightClass(): number {
    return this._hsWeightClass;
  }

  get defaultEquipmentSize(): string {
    return this._defaultEquipmentSize;
  }

  get startDate(): Date {
    return this._startDate;
  }

  get imTariffInfo(): Array<number> {
    return this._imTariffInfo;
  }

  get imScheduleInfo(): Array<number> {
    return this._imScheduleInfo;
  }
}
