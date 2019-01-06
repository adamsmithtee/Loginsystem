import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

/*
  Generated class for the DatabaseServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseServiceProvider {
  private image: any;
  private storageRef: any;
  private parseUpload: any;

  constructor(public http: HttpClient) {
    console.log('Hello DatabaseServiceProvider Provider');
    this.image = 'pix ' + new Date().getTime() + ' .jpg';
    this.storageRef = firebase.storage().ref();
    this.parseUpload = this.storageRef.putString()
  }

  upLoadImage(imageString) : Promise<any>{
    return new Promise((resolve, reject)=>{
      this.storageRef('posters/' + this.image);
      this.parseUpload(imageString, 'data_url');

      this.parseUpload.on('state_changed', (snapshot)=>{
        // We could log the progress here IF necessary
            // console.log('snapshot progess ' + _snapshot)
      }, error=>{
        reject(error);
      }, (success)=>{
        resolve(this.parseUpload.snapshot)
      });
    });
  }
}
