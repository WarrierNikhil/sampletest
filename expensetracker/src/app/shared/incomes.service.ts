import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Incomes } from '../modal/incomes';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

const BACKEND_URL = environment.apiUrl + "/incomes";
@Injectable({
  providedIn: 'root'
})
export class IncomesService {
  private incomes: Incomes[] = [];
  private incomesUpdated = new Subject<{ incomes: Incomes[], incomeCount: number }>();
  constructor(private http: HttpClient, private router: Router) { }

  addIncome(title: string, amount: number, incomeDate: Date) {
    const incomeData = new FormData();
    incomeData.append('title', title);
    incomeData.append('amount', amount.toString());
    incomeData.append('incomeDate', incomeDate.toJSON());
    this.http.post<{ message: string, incomes: Incomes }>(BACKEND_URL, incomeData)
      .subscribe((respData) => {
        this.router.navigate(["/income/Income-list"]);
      });
  }

  getIncomes(incomesPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${incomesPerPage}&page=${currentPage}`;
    this.http.get<{ message: string, incomes: any, maxIncomes: number }>(BACKEND_URL + queryParams)
      .pipe(map((incomeData) => {
        return {
          incomes: incomeData.incomes.map(income => {
            return {
              title: income.title,
              amount: income.amount,
              id: income._id,
              incomeDate: income.incomeDate,
              creator: income.creator
            }
          }), maxIncomes: incomeData.maxIncomes
        }
      })).subscribe((transformedIncomeData) => {
        this.incomes = transformedIncomeData.incomes
        this.incomesUpdated.next({ incomes: [...this.incomes], incomeCount: transformedIncomeData.maxIncomes });
      });
  }
  getIncomeUpdateListener() {
    return this.incomesUpdated.asObservable();
  }
  deleteIncome(incomeId: string) {
    return this.http.delete(BACKEND_URL + "/" + incomeId);
  }


  updateIncomes(id: string, title: string, amount: number, incomeDate: Date) {
    let incomeData: Incomes;

    incomeData = {
      id: id,
      title: title,
      amount: amount,
      incomeDate: incomeDate,
      creator: null
    };

    this.http.put(BACKEND_URL + "/" + id, incomeData)
      .subscribe(response => {
        this.router.navigate(["/income/Income-list"]);
      });

  }
  getIncome(id: string) {
    return this.http.get<{ _id: string, title: string, amount: number,creator:string,incomeDate:Date }>(BACKEND_URL + "/" + id)
    //{ ...this.expenses.find(p => p.id === id) };
  }
}

