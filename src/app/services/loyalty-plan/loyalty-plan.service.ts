import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoyaltyPlansService {
  constructor(private http: HttpClient) {}

  public fetch() {
    return this.http.get(environment.apiURL + `/pharmaceutical_companies/loyalty_plans`, {});
  }

  public update(params) {
    return this.http.put(environment.apiURL + '/pharmaceutical_companies/loyalty_plans', {
      loyalty_plan: params
    });
  }

  public create(params) {
    return this.http.post(environment.apiURL + '/pharmaceutical_companies/loyalty_plans', {
      loyalty_plan: params
    });
  }

  public delete() {
    return this.http.delete(environment.apiURL + '/pharmaceutical_companies/loyalty_plans');
  }
}
