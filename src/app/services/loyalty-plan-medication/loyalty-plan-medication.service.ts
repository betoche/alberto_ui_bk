import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoyaltyPlanMedicationService {
  constructor(private http: HttpClient) {}

  public fetchList(planId) {
    return this.http.get(
      environment.apiURL + `/pharmaceutical_companies/loyalty_plans/${planId}/loyalty_plan_medications`, {}
    );
  }

  public fetch(planId, id) {
    return this.http.get(
      environment.apiURL + `/pharmaceutical_companies/loyalty_plans/${planId}/loyalty_plan_medications/${id}`, {}
    );
  }

  public update(planId, id, params) {
    return this.http.put(
      environment.apiURL + `/pharmaceutical_companies/loyalty_plans/${planId}/loyalty_plan_medications/` + id, {
        loyalty_plan_medication: params
      }
    );
  }

  public create(planId, params) {
    return this.http.post(
      environment.apiURL + `/pharmaceutical_companies/loyalty_plans/${planId}/loyalty_plan_medications`, {
        loyalty_plan_medication: params
      }
    );
  }

  public delete(planId, id) {
    return this.http.delete(
      environment.apiURL + `/pharmaceutical_companies/loyalty_plans/${planId}/loyalty_plan_medications/` + id
    );
  }
}
