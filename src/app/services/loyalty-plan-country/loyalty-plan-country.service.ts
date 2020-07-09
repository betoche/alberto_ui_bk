import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoyaltyPlanCountryService {
  constructor(private http: HttpClient) {}

  public fetchList() {
    return this.http.get(
      environment.apiURL + `/pharmaceutical_companies/loyalty_plan_countries`, {}
    );
  }

  public fetch(id) {
    return this.http.get(
      environment.apiURL + `/pharmaceutical_companies/loyalty_plan_countries/${id}`, {}
    );
  }

  public update(id, params) {
    return this.http.put(
      environment.apiURL + `/pharmaceutical_companies/loyalty_plan_countries/` + id, {
        loyalty_plan_country: params
      }
    );
  }

  public create(params) {
    return this.http.post(
      environment.apiURL + `/pharmaceutical_companies/loyalty_plan_countries`, {
        loyalty_plan_country: params
      }
    );
  }

  public delete(id) {
    return this.http.delete(
      environment.apiURL + `/pharmaceutical_companies/loyalty_plan_countries/` + id
    );
  }
}
