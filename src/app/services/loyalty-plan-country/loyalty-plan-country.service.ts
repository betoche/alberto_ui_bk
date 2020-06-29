import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoyaltyPlanCountryService {
  constructor(private http: HttpClient) {}

  public fetchList(planId) {
    return this.http.get(
      environment.apiURL + `/pharmaceutical_companies/loyalty_plans/${planId}/loyalty_plan_countries`, {}
    );
  }

  public fetch(planId, id) {
    return this.http.get(
      environment.apiURL + `/pharmaceutical_companies/loyalty_plans/${planId}/loyalty_plan_countries/${id}`, {}
    );
  }

  public update(planId, id, params) {
    return this.http.put(
      environment.apiURL + `/pharmaceutical_companies/loyalty_plans/${planId}/loyalty_plan_countries/` + id, {
        loyalty_plan_country: params
      }
    );
  }

  public create(planId, params) {
    return this.http.post(
      environment.apiURL + `/pharmaceutical_companies/loyalty_plans/${planId}/loyalty_plan_countries`, {
        loyalty_plan_country: params
      }
    );
  }

  public delete(planId, id) {
    return this.http.delete(
      environment.apiURL + `/pharmaceutical_companies/loyalty_plans/${planId}/loyalty_plan_countries/` + id
    );
  }
}
