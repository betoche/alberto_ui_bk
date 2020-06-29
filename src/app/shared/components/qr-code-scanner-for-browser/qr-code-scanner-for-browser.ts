import { Component, Input, EventEmitter } from '@angular/core';
import jsQR from "jsqr";
import { TranslateService } from '@ngx-translate/core';
import { EventsService } from 'app/shared/services/events.service';

@Component({
  selector: 'qr-code-scanner-for-browser',
  templateUrl: 'qr-code-scanner-for-browser.html'
})
export class QrCodeScannerForBrowserComponent {

  public video:any;
  public canvasElement:any;
  public canvas:any;
  public loadingMessage:any;
  public errors: string = '';

  public isAvailableforScanningQrCode:boolean = true;

  constructor(
    private events: EventsService,
    private translateService: TranslateService) {
    this.events.listen('qr-code:open-camera').subscribe(() => {
      this.checkUserMedia();
    });

    this.events.listen('qr-code:close-camera').subscribe(() => {
      this.stopStreamingAndCloseCamera();
    });
  }

  private checkUserMedia() {
    // check user camera
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
    .then((stream) => {
      stream.getTracks()[0].stop();
      this.initCameraAndShowToUI();
    })
    .catch((err) => {// shows message errors
      this.errors = this.translateService.instant('QR_CODE_NO_MEDIA');
    });
  }

  private initCameraAndShowToUI(){
    this.video = document.createElement("video");
    this.canvasElement = document.getElementById("qr-code-canvas");

    if(!this.canvasElement) {
      this.canvasElement = document.createElement('canvas');
      this.canvasElement.setAttribute("id", "qr-code-canvas");
    }

    this.canvas = this.canvasElement.getContext("2d");
    this.loadingMessage = document.getElementById("qr-code-loading-message");

    // Use facingMode: environment to attemt to get the front camera on phones
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then( (stream) => {
      this.video.srcObject = stream;
      this.video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      this.video.play();

      requestAnimationFrame( () => {
        this.loadingMessage.innerText = "⌛ ...";
        this.loadingMessage.hidden = true;

        this.tick() }
      );
    });
  }

  private drawLine(begin, end, color) {
    if (this.canvas == null) {
      return false;
    }

    this.canvas.beginPath();
    this.canvas.moveTo(begin.x, begin.y);
    this.canvas.lineTo(end.x, end.y);
    this.canvas.lineWidth = 4;
    this.canvas.strokeStyle = color;
    this.canvas.stroke();
  }


  // get the image from video and draw to canvas element
  private tick() {
    if (this.video == null) {
      return false;
    }

    if (this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
      this.canvasElement.height = this.video.videoHeight;
      this.canvasElement.width = this.video.videoWidth;
      this.canvas.drawImage(this.video, 0, 0, this.canvasElement.width, this.canvasElement.height);

      this.scanQrCodeAndEmitEvent();
    }

    requestAnimationFrame( () => { this.tick() } );
  }


  private scanQrCodeAndEmitEvent(){
    if(this.isAvailableforScanningQrCode){
      this.isAvailableforScanningQrCode = false;

      var imageData = this.canvas.getImageData(0, 0, this.canvasElement.width, this.canvasElement.height);
      var code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });

      if (code) {
        // found QR code value, emit the event "found"
        this.events.publish('qrCode:value', code['data']);
        console.log(code)

        // draw the border for QR code in the video
        this.drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
        this.drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
        this.drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
        this.drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");
      }

      // scan QR code every 0.5 second
      setTimeout( () => {
        this.isAvailableforScanningQrCode = true;
      }, 1000);
    }else{
      return false;
    }
  }

  private stopStreamingAndCloseCamera() {
    // stop video streaming
    if(this.video != null) {
      this.video.pause();
      this.video.srcObject.getTracks()[0].stop();
      this.video.src = "";
    }

    // reset video element, canvas
    this.video = null;
    this.canvasElement = null;
    this.canvas = null;
    this.loadingMessage = "";

    let canvas = document.getElementsByTagName('canvas');
    this.removeCanvas(canvas);
  }

  private removeCanvas(canvas) {
    for (var i = 0; i < canvas.length; i++) {
      canvas[i].remove();
    }
  }

}
