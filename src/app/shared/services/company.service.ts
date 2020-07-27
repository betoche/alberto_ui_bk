import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(private http: HttpClient) {}

  public update(id, params) {
    return this.http.put(environment.apiURL + '/companies/' + id, params);
  }

}
