import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventsService {
  private subjects: any = [];

  public publish(key: string, data: any) {
    this.subjectByKey(key).next(data);
  }

  public listen(key: string): Observable<any> {
    return this.subjectByKey(key).asObservable();
  }

  private subjectByKey(key){
    if( !this.subjects[key] ){
      this.subjects[key] = new Subject<any>();
    }

    return this.subjects[key];
  }
}
