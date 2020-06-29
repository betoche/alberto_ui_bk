import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParticipatingDrugstoresService {
  constructor(private http: HttpClient) {}

  public fetchList(planCountryId) {
    return this.http.get(
      environment.apiURL + this.urlPrefix(planCountryId), {}
    );
  }

  public update(planCountryId, id, params) {
    return this.http.put(
      environment.apiURL + `${this.urlPrefix(planCountryId)}/${id}`, {
        participating_drugstore: params
      }
    );
  }

  public createList(planCountryId, params) {
    return this.http.post(
      environment.apiURL + `${this.urlPrefix(planCountryId)}/create_list`, {
        participating_drugstores: params
      }
    );
  }

  private urlPrefix(planCountryId) {
    return `/pharmaceutical_companies/loyalty_plan_countries/${planCountryId}/participating_drugstores`
  }
}
