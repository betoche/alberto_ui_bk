import { of, throwError } from 'rxjs';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ExportCSVService } from 'app/shared/services/export-csv/export-csv.service';
import { HttpClient } from '@angular/common/http';
import { AppLoaderService } from 'app/shared/services/app-loader/app-loader.service';
import { TestBedHelper } from 'spec/test-bed/test-bed-helper';
import { environment } from 'environments/environment';

describe('ExportCSVService', () => {
  let service: ExportCSVService;
  beforeEach(() => {
    TestBedHelper.configureTestingModule({}).compileComponents();
    service = new ExportCSVService(TestBed.get(HttpClient), TestBed.get(AppLoaderService));
  });

  describe('#export', () => {
    it('downloads a csv file', fakeAsync(() => {
      let http = TestBed.get(HttpClient);
      spyOn(http, 'post').and.returnValue(of('csv content'));
      service.export('users', { scope: 'sub_admin' });

      expect(http.post).toHaveBeenCalledWith(
        environment.apiURL + '/csv_exportings',
        { export_type: 'users', scope: 'sub_admin' }
      )
    }));
  });
});
