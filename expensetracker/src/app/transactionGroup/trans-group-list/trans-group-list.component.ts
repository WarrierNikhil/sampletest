import { Component, OnInit, OnDestroy } from '@angular/core';
import { TransgroupService } from 'src/app/shared/transgroup.service';
import { TransactionGroups } from 'src/app/modal/transactionGroups';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-trans-group-list',
  templateUrl: './trans-group-list.component.html',
  styleUrls: ['./trans-group-list.component.css']
})
export class TransGroupListComponent implements OnInit,OnDestroy {

  constructor(public transGrpService:TransgroupService,private authService: AuthService) { }
  displayedColumns: string[] = ['groupName','edit','delete'];
  isLoading=false;
  totalTransGroups = 0;
  transGroupsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 3, 5, 8, 10];
  userIsAuthenticated=false;
  userId:string
  transactionGroups: TransactionGroups[] = [];
  private transactionGroupsSub: Subscription;
  private authStatusSub: Subscription;

  ngOnInit() {
    this.isLoading = true;
    this.transGrpService.getTransGroups(this.transGroupsPerPage, this.currentPage);
    this.userId=this.authService.getUserId();
    this.transactionGroupsSub=this.transGrpService.getTransGroupUpdateListener().subscribe((transGroupData:{ transGroups: TransactionGroups[], maxTransGroups: number }) => {
      this.isLoading = false;
      this.totalTransGroups=transGroupData.maxTransGroups;
      this.transactionGroups = transGroupData.transGroups;
    });

    this.authStatusSub=this.authService.getAuthStatusListener()
    .subscribe(IsAuthenticated=>{
      this.userIsAuthenticated=IsAuthenticated;
      this.userId=this.authService.getUserId();
    });

  }
  ngOnDestroy(){
    this.transactionGroupsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

  onDelete(row:any){
    this.isLoading=true;
    this.transGrpService.deleteTransGroup(row.id).subscribe(()=>{
      this.transGrpService.getTransGroups(this.transGroupsPerPage,this.currentPage);
    },()=>{
      this.isLoading=false;
    });
  }
}
