import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../api.service";
import {EnumService} from "../../services/enum.service";
import {GeoScopeType} from "../../enums/geoscope.type";

import {GeoScopeModel} from "../../model/geoscope.model";
import {ErrorStateMatcher} from "@angular/material/core";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-location',
  templateUrl: './edit-location.component.html',
  styleUrls: ['./edit-location.component.css']
})
export class EditLocationComponent implements OnInit {
  locationForm: FormGroup;
  id = '';
  countryCode = '';
  locationCode: '';
  geoScopeType: '';
  geoScopeTypeList: Array<string>;
  name = '';
  port = false;
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private enumService: EnumService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.getLocationById(this.route.snapshot.params.id);
    this.geoScopeTypeList = this.enumService.getEnumValues(GeoScopeType);
    console.log('Types ' + JSON.stringify(this.geoScopeTypeList));
    this.locationForm = this.formBuilder.group({
      id: [null],
      countryCode: [null, Validators.required],
      locationCode: [null, Validators.required],
      geoScopeType: [null, Validators.required],
      name: [null, Validators.required],
      port: [null, Validators.required]
    });
  }

  getLocationById(id: any) {
    this.api.getLocationById(id).subscribe((data: GeoScopeModel) => {
      this.id = data.id;
      this.locationForm.setValue({
        id: data.id,
        countryCode: data.countryCode,
        locationCode: data.locationCode,
        geoScopeType: data.geoScopeType,
        name: data.name,
        port: data.port
      });
    });
  }


  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updateLocation(this.id, this.locationForm.value)
      .subscribe((res: GeoScopeModel) => {
          const id = res.id;
          this.isLoadingResults = false;
          this.router.navigate(['/location-details', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }


  locationDetails() {
    this.router.navigate(['/location-details', this.id]);
  }
}
