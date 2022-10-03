import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { TransactionGroups } from '../modal/transactionGroups';

const BACKEND_URL = environment.apiUrl + "/transGroup";
@Injectable({
  providedIn: 'root'
})
export class TransgroupService {
  private transactionGroups: TransactionGroups[] = [];
  private transactionGroupsUpdated = new Subject<{ transGroups: TransactionGroups[], maxTransGroups: number }>();
  constructor(private http: HttpClient, private router: Router) { }

  addTransGroup(name: string,status:string) {
    const trasGroupData = new FormData();
    trasGroupData.append('groupName', name);
    trasGroupData.append('status',status);
    this.http.post<{ message: string, transGroup: any }>(BACKEND_URL, trasGroupData)
      .subscribe((respData) => {
        console.log(respData);
        this.router.navigate(["/transGroup/TransGroup-list"]);
      });
  }

  updateTransGroup(id: string, groupName: string, status: boolean) {
    let trasGroupData: TransactionGroups;
    trasGroupData = {
      id, groupName, status, creator:""
    }
    this.http.put(BACKEND_URL + "/" + id, trasGroupData)
      .subscribe(response => {
        this.router.navigate(["/transGroup/TransGroup-list"]);
      });

  }
  getTransGroups(transGroupPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${transGroupPerPage}&page=${currentPage}`;
    this.http.get<{ message: string, transGroups: any, maxTransGroups: number }>(BACKEND_URL + queryParams)
      .pipe(map((transGroupData) => {
        return {
          transGroups: transGroupData.transGroups.map(transGroup => {
            return {
              groupName: transGroup.groupName,
              id: transGroup._id,
              creator: transGroup.creator,
              status: transGroup.status
            }
          }), maxTransGroups: transGroupData.maxTransGroups
        }
      })).subscribe((transformedtransGroupData) => {
        this.transactionGroups = transformedtransGroupData.transGroups
        this.transactionGroupsUpdated.next({ transGroups: [...this.transactionGroups], maxTransGroups: transformedtransGroupData.maxTransGroups });
      });
  }
  getTransGroup(id: string) {
    return this.http.get<{
      _id: string, groupName: string,
      status: boolean,
      creator: string
    }>(BACKEND_URL + "/" + id)
    //{ ...this.expenses.find(p => p.id === id) };
  }
  getTransGroupUpdateListener() {
    return this.transactionGroupsUpdated.asObservable();
  }

  deleteTransGroup(transActionId: string) {
    return this.http.delete(BACKEND_URL + "/" + transActionId);
  }
}
