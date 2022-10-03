import { Component, OnInit, OnDestroy } from '@angular/core';
import { IncomesService } from 'src/app/shared/incomes.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Incomes } from 'src/app/modal/incomes';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-income-list',
  templateUrl: './income-list.component.html',
  styleUrls: ['./income-list.component.css']
})
export class IncomeListComponent implements OnInit,OnDestroy {

  constructor(public incomeService: IncomesService, private authService: AuthService) { }
  displayedColumns: string[] = ['Desc','amount', 'incomedate','edit','delete'];
  isLoading = false;
  totalIncomes = 0;
  incomesPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 3, 5, 8, 10];
  userIsAuthenticated=false;
  userId:string
  incomes: Incomes[] = [];
  private incomesSub: Subscription;
  private authStatusSub: Subscription;
  ngOnInit() {
    this.isLoading = true;
    this.incomeService.getIncomes(this.incomesPerPage, this.currentPage);
    this.userId=this.authService.getUserId();
    this.incomesSub = this.incomeService.getIncomeUpdateListener()
    .subscribe((incomeData:{ incomes: Incomes[], incomeCount: number }) => {
      this.isLoading = false;
      this.totalIncomes=incomeData.incomeCount;
      this.incomes = incomeData.incomes;
    });
    this.authStatusSub=this.authService.getAuthStatusListener()
    .subscribe(IsAuthenticated=>{
      this.userIsAuthenticated=IsAuthenticated;
      this.userId=this.authService.getUserId();
    });
  }

  onDelete(row:any){
    this.isLoading=true;
    this.incomeService.deleteIncome(row.id).subscribe(()=>{
      this.incomeService.getIncomes(this.incomesPerPage,this.currentPage);
    },()=>{
      this.isLoading=false;
    });
  }
  onChangePage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage=pageData.pageIndex+1;
    this.incomesPerPage=pageData.pageSize;
    this.incomeService.getIncomes(this.incomesPerPage,this.currentPage);

  }

  ngOnDestroy(){
    this.incomesSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
  

}
