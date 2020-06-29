import { Component, OnInit, Input } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'environments/environment';
import { UserSession } from 'app/shared/services/user-session';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {
  @Input('name') name: string;
  @Input('placeholder') placeholder: string;
  @Input('inputId') inputId: string;
  @Input('acceptType') acceptType: string;
  @Input('control') control;
  @Input('hint') hint: string;
  @Input('fileName') fileName: string;
  @Input('validateDimensions100X100Enabled') validateDimensions100X100Enabled: boolean=false;
  @Input('validateDimensions200X200Enabled') validateDimensions200X200Enabled: boolean=false;

  public errorMessage: string;

  public uploader: FileUploader = new FileUploader({
    headers: [
      {
        name: 'AppRole',
        value: environment.appRole
      }
    ],
    authToken: `Token ${UserSession.getToken()}`,
    url: environment.apiURL + '/upload_files'
  });

  constructor() {
  }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      this.uploader.setOptions({
        additionalParameter: {
          validate_dimensions_100x100_enabled: this.validateDimensions100X100Enabled,
          validate_dimensions_200x200_enabled: this.validateDimensions200X200Enabled
        }
      })
      file.withCredentials = false;
      this.uploader.uploadAll();
    };

    this.uploader.onCompleteItem = (item: any, response: any, _status: any, _headers: any) => {
      response = JSON.parse(response);

      if (response.id) {
        this.fileName = response.file_name;
        this.control.setValue(response.url);
        this.errorMessage = null
      } else {
        this.errorMessage = response.errors
      }
    };
  }
}
