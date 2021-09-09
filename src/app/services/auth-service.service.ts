import { forwardRef,Injectable } from '@angular/core';

@Injectable()
export class AuthServiceService {
  public isAuthenticated(): boolean {
   let myStorage = window.localStorage;
   const testMyValToAuth = myStorage.getItem("authenticatedUSer");
   if(testMyValToAuth){
     return true
   }
   return false;
  }
}
