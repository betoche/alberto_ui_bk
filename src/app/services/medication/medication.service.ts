import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicationService {
  constructor(private http: HttpClient) {}

  public fetchList() {
    return this.http.get(environment.apiURL + '/pharmaceutical_companies/medications');
  }

  public fetch(id) {
    return this.http.get(environment.apiURL + '/pharmaceutical_companies/medications/' + id);
  }

  public update(id, params) {
    return this.http.put(environment.apiURL + '/pharmaceutical_companies/medications/' + id, {
      medication: params
    });
  }

  public create(params) {
    return this.http.post(environment.apiURL + '/pharmaceutical_companies/medications', {
      medication: params
    });
  }

  public delete(id) {
    return this.http.delete(environment.apiURL + '/pharmaceutical_companies/medications/' + id);
  }
}
