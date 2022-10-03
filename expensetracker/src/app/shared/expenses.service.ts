import { Injectable } from '@angular/core';
import { Expense } from '../modal/expense';
import { Subject } from 'rxjs';
import { environment } from "../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

const BACKEND_URL = environment.apiUrl + "/expenses";
@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  private expenses: Expense[] = [];
  private expensesUpdated = new Subject<{ expenses: Expense[], expenseCount: number }>();
  constructor(private http: HttpClient, private router: Router) { }

  getExpenses(expensesPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${expensesPerPage}&page=${currentPage}`;
    this.http.get<{ message: string, expenses: any, maxExpenses: number }>(BACKEND_URL + queryParams)
      .pipe(map((expData) => {
        return {
          expenses: expData.expenses.map(expense => {
            return {
              title: expense.title,
              amount: expense.amount,
              id: expense._id,
              imagePath: expense.imagePath,
              expDate: expense.expDate,
              creator:expense.creator
            }
          }), maxExpenses: expData.maxExpenses
        }
      }))
      .subscribe((transformedExpData) => {
        this.expenses = transformedExpData.expenses
        this.expensesUpdated.next({ expenses: [...this.expenses], expenseCount: transformedExpData.maxExpenses });
      });

  }
  getExpenseUpdateListener() {
    return this.expensesUpdated.asObservable();
  }
  getExpense(id: string) {
    return this.http.get<{ _id: string, title: string, amount: number, imagePath: string,creator:string,expDate:Date }>(BACKEND_URL + "/" + id)
    //{ ...this.expenses.find(p => p.id === id) };
  }
  addExpense(title: string, amount: number, image: File,expDate:Date) {
    const expenseData = new FormData();
    expenseData.append('title', title);
    expenseData.append('amount', amount.toString());
    expenseData.append('expDate', expDate.toJSON());
    //expenseData.append('image', image, title);
    this.http.post<{ message: string, expense: Expense }>(BACKEND_URL, expenseData)
      .subscribe((respData) => {
        this.router.navigate(["/expense/expense-list"]);
      });
  }
  deleteExpense(expenseId: string) {
    return this.http.delete(BACKEND_URL + "/" + expenseId);
  }

  updateExpense(id: string, title: string, amount: number, image: File | string, expDate:Date) {
    let expenseData: Expense | FormData;
    if (typeof (image) === "object") {
      expenseData = new FormData();
      expenseData.append("id", id);
      expenseData.append("title", title);
      expenseData.append("amount", amount.toString());
      expenseData.append('expDate', expDate.toJSON());
      //expenseData.append("image", image, title);
    } else {
      expenseData = { id: id,
         title: title, 
         amount: amount,
          //imagePath: image,
          expDate:expDate,
          creator:null };
    }

    this.http.put(BACKEND_URL + "/" + id, expenseData)
      .subscribe(response => {
        // const updatedExpenses = [...this.expenses];
        // const oldExpenseIndex = updatedExpenses.findIndex(p => p.id === id);
        // const expense: Expense = {
        //   id: id,
        //   title: title,
        //   amount: amount,
        //   imagePath: null,//response.imagePath
        // }
        // updatedExpenses[oldExpenseIndex] = expense;
        // this.expenses = updatedExpenses;
        // this.expensesUpdated.next([...this.expenses]);     
         this.router.navigate(["/expense-list"]);
      });

  }
}
