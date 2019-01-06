import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as firebase from 'firebase';


/*
  Generated class for the ImageServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImageServiceProvider {

  public cameraImage: any;
  public image: any;
  public pixRef: any

  public fireAuth:any;
  public userProfile:any;
  public userId:any;

  constructor(public http: HttpClient, private CAMERA : Camera) {
    console.log('Hello ImageServiceProvider Provider');

    this.fireAuth = firebase.auth();
    this.userProfile = firebase.database().ref('users');
    this.userId = firebase.auth().currentUser.uid;

    //this create a new nma efor the inmage saving in folder called profile_pictures
    this.image = 'pix-' + new Date().getTime() + '.jpg',
    this.pixRef = firebase.storage().ref('profile_pictures/' + this.image)
  }

  selectImage(sourceType) {
        let cameraOptions : CameraOptions = {
            sourceType         : sourceType,
            destinationType    : this.CAMERA.DestinationType.DATA_URL,
            allowEdit          : true,
            quality            : 100,
            targetWidth        : 320,
            targetHeight       : 240,
            encodingType       : this.CAMERA.EncodingType.JPEG,
            correctOrientation : true
        };
      /*  var profilepix:any = null;
        return this.userProfile.child(this.userId)
        .putString(profilepix, 'base64', { contentType: 'image/jpg' })    
.then((savedPicture) => {
          this.userProfile.child(this.userId).update({  
           profilepicture: savedPicture.downloadURL});
  }); */


       return this.CAMERA.getPicture(cameraOptions)
       /*.then(profilePix=>{
        this.userProfile.child(this.userId)
        // send the pix to firebase storage
        const selfRef =  this.pixRef;
        selfRef.putString(profilePix, 'base64', {contentType: 'image/jpg'}).then(savedPix=>{
          this.pixRef.set(savedPix.downloadURL); 
        }, error=>{
          console.log(error)
        })
      }, error=>{
      
        // Log an error to the console if something goes wrong.
      console.log("ERROR -> " + JSON.stringify(error));
      });*/
       
     
     
      // .then((data) =>{
        //    this.cameraImage 	= "data:image/jpeg;base64," + data;
        //    resolve(this.cameraImage);
        // }, error=>{
        //    // Log an error to the console if something goes wrong.
        //   console.log("ERROR -> " + JSON.stringify(error));
        // });


    //  });
  }


}
