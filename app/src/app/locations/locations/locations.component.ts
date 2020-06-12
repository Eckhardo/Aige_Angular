import {Component, OnInit} from '@angular/core';
import {ApiService} from "../api.service";
import {GeoScopeModel} from "../../model/geoscope.model";

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'country', 'code', 'type', 'name', 'port'];
  data: GeoScopeModel[] = [];
  isLoadingResults = true;
  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getLocations()
      .subscribe((res: any) => {
        this.data = res;
        console.log('Locations Backend: ' + JSON.stringify(res));
        console.log('Locations: ' + JSON.stringify(this.data));
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

}
