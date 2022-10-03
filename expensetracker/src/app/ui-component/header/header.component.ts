import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../shared/auth.service';
import { environment } from 'src/environments/environment';
import { NavdrawerService } from 'src/app/shared/navdrawer.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  userIsAuthenticated = false;
  title= environment.title;
  private authListenerSubs: Subscription;
  constructor(private authService: AuthService,public navService: NavdrawerService) { }

  ngOnInit() {
    this.userIsAuthenticated=this.authService.getIsAuth();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
  onLogout() {
    this.authService.logout();
  }
}
