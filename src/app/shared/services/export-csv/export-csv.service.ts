import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';

@Injectable({
  providedIn: 'root'
})
export class ExportCSVService {

  constructor(
    private http: HttpClient,
    private loader: AppLoaderService,
  ) { }

  public export(type, options = {}){
    this.loader.open();
    let request_params = Object.assign( { export_type: type }, options );

    this.http.post(
      environment.apiURL + '/csv_exportings', request_params
    ).subscribe( response => {
      this.loader.close();
      if(response['content']){
        this.downloadFileFromString(type, response['content']);
      }
    }, error => {
      this.loader.close();
    });
  }

  public downloadFileFromString(filename, content){
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename + '.csv');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

}
