import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { SideNavItem } from 'src/app/modal/sidenav-item.model';
import { NavdrawerService } from 'src/app/shared/navdrawer.service';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MainMenu } from 'src/app/modal/menu.model';

@Component({
  selector: 'app-navmenu-list',
  templateUrl: './navmenu-list.component.html',
  styleUrls: ['./navmenu-list.component.css'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({transform: 'rotate(0deg)'})),
      state('expanded', style({transform: 'rotate(180deg)'})),
      transition('expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      ),
    ])
  ]
})
export class NavmenuListComponent implements OnInit {
  expanded: boolean;
  @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
  @Input() item: MainMenu;
  @Input() depth: number;
  constructor(public navService: NavdrawerService,
    public router: Router) { }

  ngOnInit() {
    this.navService.currentUrl.subscribe((url: string) => {
      console.log(this.item)
      if (this.item.path && url) {
        this.expanded = url.indexOf(`/${this.item.path}`) === 0;
        this.ariaExpanded = this.expanded;
      }
    });
  }

  onItemSelected(item: MainMenu) {
    if (!item.children || !item.children.length) {
      this.router.navigate([item.path]);
    }
    if (item.children && item.children) {
      this.expanded = !this.expanded;
    }
  }

}
