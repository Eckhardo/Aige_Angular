import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "../api.service";
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {GeoScopeType} from "../../enums/geoscope.type";
import {EnumService} from "../../services/enum.service";


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.css']
})
export class AddLocationComponent implements OnInit {
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

  constructor(private router: Router, private api: ApiService, private enumService: EnumService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.geoScopeTypeList = this.enumService.getEnumValues(GeoScopeType);
    console.log('Types ' + JSON.stringify(this.geoScopeTypeList));
    this.locationForm = this.formBuilder.group({
      id: [null,],
      countryCode: [null, Validators.required],
      locationCode: [null, Validators.required],
      geoScopeType: [null, Validators.required],
      name: [null, Validators.required],
      port: [null, Validators.required]
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.addLocation(this.locationForm.value)
      .subscribe((res: any) => {
        const id = res.id;
        this.isLoadingResults = false;
        this.router.navigate(['/location-details', id]);
      }, (err: any) => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }
}
