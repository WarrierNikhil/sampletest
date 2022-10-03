import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Incomes } from 'src/app/modal/incomes';
import { IncomesService } from 'src/app/shared/incomes.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-income-create',
  templateUrl: './income-create.component.html',
  styleUrls: ['./income-create.component.css']
})
export class IncomeCreateComponent implements OnInit, OnDestroy {

  form: FormGroup;
  private mode = "create";
  isLoading = false;
  income: Incomes;
  maxDate=new Date();
  private AuthStatusSub: Subscription;
  private incomeId: string;
  constructor(public incomeServices:IncomesService,public route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.AuthStatusSub = this.authService.getAuthStatusListener().subscribe(authStatus => {
      this.isLoading = false;
    });
    this.form = new FormGroup({
      'title': new FormControl(null,
        {
          validators: [Validators.required, Validators.minLength(4)]
        }),
      'amount': new FormControl(null,
        {
          validators: [Validators.required, Validators.minLength(4)]
        }),
      'incomeDate': new FormControl(new Date(), { validators: [Validators.required] })
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('incomeId')) {
        this.mode = "edit";
        this.incomeId = paramMap.get('incomeId');
        this.isLoading = true;
        this.incomeServices.getIncome(this.incomeId).subscribe(incomeData => {
          this.isLoading = false;
          this.income = {
            id: incomeData._id,
            title: incomeData.title,
            amount: incomeData.amount,
            //imagePath: expenseData.imagePath,
            creator: incomeData.creator,
            incomeDate:incomeData.incomeDate
          }
          this.form.setValue({
            title: this.income.title,
            amount: this.income.amount,
            //image: this.expense.imagePath
            incomeDate:incomeData.incomeDate
          });
        });
      } else {
        this.mode = "create";
        this.incomeId = null;
      }
    });
  }

  onSaveIncome(){
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode == "create") {
      this.incomeServices.addIncome(
        this.form.value.title,
        this.form.value.amount,        
        this.form.value.incomeDate
      );
      this.isLoading = false;
    } else {
      this.incomeServices.updateIncomes(
        this.incomeId,
        this.form.value.title,
        this.form.value.amount,
        this.form.value.incomeDate,
      );

      this.isLoading = false;
    }
    this.form.reset();
  }
  ngOnDestroy() {

  }
}
