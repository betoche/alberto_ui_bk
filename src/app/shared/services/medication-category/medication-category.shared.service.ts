import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicationCategorySharedService {
  constructor(private http: HttpClient) {}

  public fetchList() {
    return this.http.get(environment.apiURL + '/medication_categories');
  }

  public fetch(id) {
    return this.http.get(environment.apiURL + '/medication_categories/' + id);
  }

}
