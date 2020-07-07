import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, JsonpInterceptor } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError,  BehaviorSubject } from 'rxjs';
import { User } from './user.model';

import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

export interface AuthResponseData{
    kind : string;
    idToken :string;
    email : string;
    refreshToken : string;
    expiresIn : string;
    localId : string;
    registered ?: boolean;
}

@Injectable({providedIn : 'root'})
export class AuthService{
    user = new BehaviorSubject<User>(null);
    tokenExpirationTimer : any;

    constructor(private http : HttpClient,private router : Router){}
    signUp(email : string , password : string){
       return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.FirebaseApiKey,{
            email : email,
            password : password,
            returnSecureToken : true
        }).pipe(catchError(this.handleError),tap(resData =>{
                this.AuthenticatedUser(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
        }));
    }

    login(email : string , password : string){
       return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.FirebaseApiKey,{
            email : email,
            password : password,
            returnSecureToken : true
        }
        ).pipe(catchError(this.handleError),tap(resData =>{
            this.AuthenticatedUser(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
         } ));
    }

    autoLogin(){
        const Userdata :{
            email : string;
            id : string;
            _token : string;
            _tokenExpirationDate : string;
        } = JSON.parse(localStorage.getItem('UserData'));
        if(!Userdata){
            return;
        }
        
     const loadedUser = new User(Userdata.email,Userdata.id,Userdata._token, new Date(Userdata._tokenExpirationDate));
        if(loadedUser.token){
            const expirationDuration = new Date(Userdata._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
            this.user.next(loadedUser);
        }
        

        
    }

    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('UserData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationTime : number){
        this.tokenExpirationTimer = setTimeout(() =>{
            this.logout();
        },expirationTime)
    }

    private AuthenticatedUser(email : string ,userId : string, token : string ,expiresIn : number){
        const expirationData = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email,userId,token,expirationData);
        this.autoLogout(expiresIn * 1000);
        this.user.next(user);
        localStorage.setItem('UserData' , JSON.stringify(user));
    }

    private handleError(errorResp : HttpErrorResponse){
        let errorMessage = "An Unknown error Occured";
        if(!errorResp.error || !errorResp.error.error){
            return throwError(errorMessage)
        }  
        switch(errorResp.error.error.message){
            case 'EMAIL_EXISTS' : errorMessage = "The email Already Exists";
            case 'EMAIL_NOT_FOUND' : errorMessage = "Email Not Found";
            case 'INVALID_PASSWORD': errorMessage = "Invalid Password";
        }  
        return throwError(errorMessage);
    }

}