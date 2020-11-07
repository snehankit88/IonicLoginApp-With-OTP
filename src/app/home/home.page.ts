import { Component, OnInit } from '@angular/core';
import {Router}from '@angular/router';
import{AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  {
  //export class HomePage  implements OnInit{

     recaptchaVerifier:firebase.auth.ApplicationVerifier;
      provider: firebase.auth.PhoneAuthProvider_Instance;

     window:Window;
    
 confirmationResult:firebase.auth.ConfirmationResult;
	otpSent=false;
  phonenumber;
  user={
    phoneNumber:''
  }
  
  constructor(public af: AngularFireAuth) { }

// ngOnInit() {

//   this.recaptchaVerifier=new firebase.auth.RecaptchaVerifier('recaptcha-container',{'size':'invisible'});

// }
ionViewDidLoad() {
  this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container',{'size':'invisible'});
}
sendOTP(phoneNumber: number){
  console.log(phoneNumber);
  //var pNumber=(<HTMLInputElement>document.getElementById("phoneNumber")).value;
  
   const phoneNumberString = "+" + phoneNumber;
  var  pNumber=phoneNumberString;
  console.log(pNumber);

    
 // var applicationVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container',{'size':'invisible'});
//var provider = new firebase.auth.PhoneAuthProvider();
this.provider.verifyPhoneNumber(pNumber, this.recaptchaVerifier)
    .then(function(verificationId) {
      var verificationCode = window.prompt('Please enter the verification ' +
          'code that was sent to your mobile device.');
      return firebase.auth.PhoneAuthProvider.credential(verificationId,
          verificationCode);
    })
    .then(function(phoneCredential) {
      return firebase.auth().signInWithCredential(phoneCredential);
    });

  // this.af.signInWithPhoneNumber(pNumber,this.recaptchaVerifier).then((result)=>{
  //   this.otpSent=true;
  //   this.phonenumber=pNumber;
  //   this.confirmationResult=result;
  //   console.log("sign in ");
  //   alert("OTP Sent");

  // }).catch(err =>{
  //   alert(err);
  // })
}

verifyOTP(){
  var otp= (<HTMLInputElement>document.getElementById("otp")).value;
  this.confirmationResult.confirm(otp).then(()=>{
    alert("OTP Verified");
  
  }).catch(err =>{
    alert(err);
  })
}

}
