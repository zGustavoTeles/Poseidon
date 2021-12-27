import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable()

export class LoginUtil {


  constructor(
    private ngFireAuth: AngularFireAuth
  ) { 
      

  }

  autenticando(){
    //   this.ngFireAuth.signInWithPhoneNumber()

  }

}
