import {ImLocationModel} from './only.location.model';

export class RoutingsOnlySearchModel {
  constructor(public from: ImLocationModel[],
              public to: ImLocationModel[],
              public routingType: string,
              public selectedTs: string) {
  }


  filterPorts(ports: Array<ImLocationModel>, query: string): Array<ImLocationModel> {
    return ports.filter((port) => port.locationCode.toLowerCase().startsWith(query.toLowerCase()));
  }

  containsPort(ports: ImLocationModel[], query: ImLocationModel): boolean {
    const result = ports.filter(port =>
      port.locationCode.toLowerCase().includes(query.locationCode.toLowerCase()));
    return result.length > 0;
  }


  isValid() {
    return this.from.length > 0 && this.to.length > 0;
  }
}
