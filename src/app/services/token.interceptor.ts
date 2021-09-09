import { Inject, Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, concat, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DOCUMENT } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  accessToken:any;
  constructor(
    private _router: Router ,
    private http: HttpClient,
    
    @Inject(DOCUMENT) private _document: Document) { }

    getAccessToken() {
    let UserId = localStorage.getItem("UserId"); 
    if(UserId ==null){
      UserId = "00000000-0000-0000-0000-000000000000";
    }
      this.http.post(environment.identity + "GetAccessToken", {
        UserId:UserId
      }).subscribe(
        (res: any) => {
          this.accessToken = res.Result.access_token; 
          localStorage.setItem("accessToken",this.accessToken);
          this._document.defaultView.location.reload();
 
        },
        err => {
          console.log("Error occured");
        })
    }; 
    
  // function which will be called for all http calls
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let getAccessTokenFomStrg = window.localStorage.getItem("accessToken");

    if ( getAccessTokenFomStrg) {
      // how to update the request Parameters      
      if (request.body) {
        if (request.body["get"] != undefined && request.body.get("Isfile") == "1") {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${getAccessTokenFomStrg}`,
            },
          })
          request.headers.append("Content-Type", "multipart/form-data");
          request.body.append("language", 'en');
        }
        else {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${getAccessTokenFomStrg}`,
            },
          });
        }
      }
      else {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${getAccessTokenFomStrg}`,
          },
        });
      }
    }
    else
    {    
      //added by hoda
      request = request.clone({
      });
    }
    return next
      .handle(request).
      pipe(
        tap((event: any) => {
          if (event.type != 0 && event.body != null && event.body.errorCode != null && event.body.errorCode != 1)
       
          
          console.log("this is response", event);
        },
          error => {
            
            if (error.status === 401) {
            //  this.authService.logout();
            this.getAccessToken();
            // this._router.navigate(['/']);
            //   localStorage.clear();
            //   localStorage.setItem('currentLanguage','Arabic');
            }
            else {
              throw error;
            }
            // logging the http response to browser's console in case of a failuer
            if (event instanceof HttpResponse) {
              console.log('api call error :', event);
            }
          }
        )
      );
  }


}
