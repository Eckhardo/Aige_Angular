import {AfterViewInit, ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';

import {KeyFigureModel} from '../models/keyfigure.model';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';


@Component({
  selector: 'app-result-intermodal',
  templateUrl: './result-intermodal.component.html',
  styleUrls: ['./result-intermodal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultIntermodalComponent implements OnChanges, AfterViewInit {

  @Input()
  keyFigures: Array<KeyFigureModel> = [];

  displayedColumns = ['inland', 'via', 'port', 'transportmode', 'rate', 'eqsize', 'eqgroup', 'preferred'];
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
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(this.keyFigures);
  }
}
