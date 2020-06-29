import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MedicationsIncludedByCountryService {
  constructor(private http: HttpClient) {}

  public fetchList(planCountryId) {
    return this.http.get(
      environment.apiURL + this.urlPrefix(planCountryId), {}
    );
  }

  public fetch(planCountryId, id) {
    return this.http.get(
      environment.apiURL + `${this.urlPrefix(planCountryId)}/${id}`, {}
    );
  }

  public update(planCountryId, id, params) {
    return this.http.put(
      environment.apiURL + `${this.urlPrefix(planCountryId)}/${id}`, {
        medications_included_by_country: params
      }
    );
  }

  public create(planCountryId, params) {
    return this.http.post(
      environment.apiURL + this.urlPrefix(planCountryId), {
        medications_included_by_country: params
      }
    );
  }

  public delete(planCountryId, id) {
    return this.http.delete(
      environment.apiURL + `${this.urlPrefix(planCountryId)}/${id}`
    );
  }

  private urlPrefix(planCountryId) {
    return `/pharmaceutical_companies/loyalty_plan_countries/${planCountryId}/medications_included_by_countries`
  }
}
