import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  isAuthenticated : boolean = false;
  private  userSub : Subscription;
  constructor(private ds : DataStorageService,private authService : AuthService,private router : Router) { }

  ngOnInit(): void {
    this.userSub=this.authService.user.subscribe(user =>{
      this.isAuthenticated = !user ? false : true;
    });
  }
  onSaveData(){
    this.ds.storeRecipies();
  }
  onFetchData(){
    this.ds.fetchData().subscribe();
  }
  onLogout(){
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
  
  ngOnDestroy(){
    this.userSub.unsubscribe();
  }

}
