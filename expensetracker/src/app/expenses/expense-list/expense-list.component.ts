import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExpensesService } from 'src/app/shared/expenses.service';
import { Expense } from 'src/app/modal/expense';
import { Subscription } from 'rxjs';
import { PageEvent, MatTableDataSource } from '@angular/material';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-expense-list',
  templateUrl: './expense-list.component.html',
  styleUrls: ['./expense-list.component.css']
})
export class ExpenseListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['Desc','amount', 'expdate','edit','delete'];
  expenses: Expense[] = [];
  private expsSub: Subscription;
  private authStatusSub: Subscription;
  totalExpenses = 0;
  expesnesPerPage = 5;
  currentPage=1;
  pageSizeOptions = [1, 3, 5, 8, 10];
  isLoading = false;
  userIsAuthenticated=false;
  userId:string;
  constructor(public expService: ExpensesService,private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.expService.getExpenses(this.expesnesPerPage,this.currentPage);
    this.userId=this.authService.getUserId();
    this.expsSub = this.expService.getExpenseUpdateListener()
      .subscribe((expensesData:{ expenses: Expense[], expenseCount: number }) => {
        this.isLoading = false;
        this.totalExpenses=expensesData.expenseCount;
        this.expenses = expensesData.expenses;
      });
      this.userIsAuthenticated=this.authService.getIsAuth();
      this.authStatusSub=this.authService.getAuthStatusListener()
      .subscribe(IsAuthenticated=>{
        this.userIsAuthenticated=IsAuthenticated;
        this.userId=this.authService.getUserId();
      });
  }


  ngOnDestroy() {
    this.expsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

  onDelete(row: any) {
    this.isLoading=true;
    this.expService.deleteExpense(row.id).subscribe(()=>{
      this.expService.getExpenses(this.expesnesPerPage,this.currentPage);
    },()=>{
      this.isLoading=false;
    });
  }
  onChangePage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage=pageData.pageIndex+1;
    this.expesnesPerPage=pageData.pageSize;
    this.expService.getExpenses(this.expesnesPerPage,this.currentPage);

  }

}
