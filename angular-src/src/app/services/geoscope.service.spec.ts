import {getTestBed, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {GeoScopeService} from './geoscope.service';
import {GeoScopeModel} from '../model/geoscope.model';
import {ConfigService} from './config.service';
import {EntityEnum} from '../enums/app-enum';

describe('GeoScopeService', () => {
  let injector;
  let service: GeoScopeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ConfigService, GeoScopeService]
    });

    injector = getTestBed();
    service = injector.get(GeoScopeService);
    httpMock = injector.get(HttpTestingController);
  });

  describe('#filterPorts', () => {
    it('should return an Observable<GeoScopeModel[]>', () => {
      const dummyGeoScopes: GeoScopeModel[] = [
        new GeoScopeModel(2, 'DEHAM'),
        new GeoScopeModel(1, 'BEANR')
      ];

      service.filterPorts('DEHAM').subscribe(geoScopes => {
        expect(geoScopes.length).toBe(2);
        expect(geoScopes).toEqual(dummyGeoScopes);
      });

      const req = httpMock.expectOne(`${service.serverApi}/${EntityEnum.PORTS}/filter/?location_code=DEHAM`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyGeoScopes);
    });
  });
  describe('#filterLocations', () => {
    it('should return an Observable<GeoScopeModel[]>', () => {
      const dummyGeoScopes: GeoScopeModel[] = [
        new GeoScopeModel(2, 'DEHAM'),
        new GeoScopeModel(1, 'BEANR')
      ];

      service.filterLocations('DEHAM','L', 'DE').subscribe(geoScopes => {
        expect(geoScopes.length).toBe(2);
        expect(geoScopes).toEqual(dummyGeoScopes);
      });

      const req = httpMock.expectOne(`${service.serverApi}/${EntityEnum.GEOSCOPE}/filter/?location_code=DEHAM&geo_scope_type=L&country_code=DE`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyGeoScopes);
    });

  });


});
