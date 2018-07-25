import {getTestBed, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {GeoScopeService} from './geoscope.service';
import {GeoScopeModel} from '../model/geoscope.model';
import {EntityEnum} from '../enums/app-enum';
import {CountryModel} from '../model/country.model';

describe('GeoScopeService', () => {
  let injector;
  let service: GeoScopeService;
  let httpMock: HttpTestingController;
  const expectedGeoScopes: GeoScopeModel[] = [
    new GeoScopeModel(2, 'DEHAM'),
    new GeoScopeModel(1, 'BEANR')
  ];
  const expectedCountries: Array<CountryModel> = [];
  expectedCountries.push(new CountryModel(1, 'GERMANY', 'DE'));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GeoScopeService]
    });

    injector = getTestBed();
    service = injector.get(GeoScopeService);
    httpMock = injector.get(HttpTestingController);
  });

  describe('#filterPorts', () => {
    it('should return an Observable<GeoScopeModel[]>', () => {


      service.filterPorts('DEHAM').subscribe(geoScopes => {
        expect(geoScopes.length).toBe(2);
        expect(geoScopes).toEqual(expectedGeoScopes);
      });

      const req = httpMock.expectOne(`${service.serverApi}/${EntityEnum.PORTS}/filter/?location_code=DEHAM`);
      expect(req.request.method).toBe('GET');
      req.flush(expectedGeoScopes);
    });
  });
  describe('#filterLocations', () => {
    it('should return an Observable<GeoScopeModel[]>', () => {


      service.filterLocations('DEHAM','L', 'DE').subscribe(geoScopes => {
        expect(geoScopes.length).toBe(2);
        expect(geoScopes).toEqual(expectedGeoScopes);
      });

      const req = httpMock.expectOne(`${service.serverApi}/${EntityEnum.GEOSCOPE}/filter/?location_code=DEHAM&geo_scope_type=L&country_code=DE`);
      expect(req.request.method).toBe('GET');
      req.flush(expectedGeoScopes);
    });

  });

  describe('#filterCountries', () => {
    it('should return an Observable<Countryl[]>', () => {


      service.filterCountries('DE').subscribe(geoScopes => {
        expect(geoScopes.length).toBe(1);
        expect(geoScopes).toEqual(expectedCountries);
      });

      const req = httpMock.expectOne(`${service.serverApi}/${EntityEnum.COUNTRY}/filter/?country_code=DE`);
      expect(req.request.method).toBe('GET');
      req.flush(expectedCountries);
    });

  });

});
