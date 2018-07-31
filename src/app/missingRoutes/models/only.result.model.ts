/**
 * Created by ekirschning on 25.01.2018.
 */

export class ImResultModel {
  _id: number;
  from: string;
  to: string;
  totalCount: number;

  constructor(id: number, pol: string, pod: string, count: number) {
    this._id = id;
    this.from = pol;
    this.to = pod;
    this.totalCount = count;

  }
}
