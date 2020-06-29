import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoyaltyPlansService {
  constructor(private http: HttpClient) {}

  public fetchList() {
    return this.http.get(environment.apiURL + '/pharmaceutical_companies/loyalty_plans', {});
  }

  public fetch(id) {
    return this.http.get(environment.apiURL + `/pharmaceutical_companies/loyalty_plans/${id}`, {});
  }

  public update(id, params) {
    return this.http.put(environment.apiURL + '/pharmaceutical_companies/loyalty_plans/' + id, {
      loyalty_plan: params
    });
  }

  public create(params) {
    return this.http.post(environment.apiURL + '/pharmaceutical_companies/loyalty_plans', {
      loyalty_plan: params
    });
  }

  public delete(id) {
    return this.http.delete(environment.apiURL + '/pharmaceutical_companies/loyalty_plans/' + id);
  }
}
