export class CountryModel {
  private _id?: number;
  private _name: string;
  private _code: string;


  constructor(id: number, name: string, code: string) {
    this._id = id;
    this._name = name;
    this._code = code;
  }


  get id(): number {
    return this._id;
  }


  get name(): string {
    return this._name;
  }

  get code(): string {
    return this._code;
  }

}
