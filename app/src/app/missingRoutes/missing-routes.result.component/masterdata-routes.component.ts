import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';

import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {MissingRoutingModel} from '../models/missing-routing.model';


@Component({
  selector: 'app-result-routes',
  templateUrl: './masterdata-routes.component.html',
  styleUrls: ['./masterdata-routes.component.css']
})
export class MissingRoutesResultComponent implements OnInit, AfterViewInit, OnChanges {

  @Input()
  routings: Array<MissingRoutingModel> = [];

  displayedColumns = ['trade', 'pol', 'pod', 'ts1', 'ts2', 'ts3', 'contractno', 'productno', 'partnercode', 'reasoncode'];
  dataSource: any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  /**
   * Set the sort after the view init since this component will
   * be able to query its view for the initialized sort.
   */
  ngAfterViewInit() {
    console.log('after view init');
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    console.log('init');

  }


  ngOnChanges(changes: SimpleChanges): void {
    console.log('on changes' + JSON.stringify(changes));
    this.dataSource = new MatTableDataSource(this.routings);
  }

}
