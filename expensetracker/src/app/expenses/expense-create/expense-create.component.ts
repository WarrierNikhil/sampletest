import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Expense } from 'src/app/modal/expense';
import { ExpensesService } from 'src/app/shared/expenses.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mimeType } from 'src/app/validators/mime-type.validator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/auth.service';


@Component({
  selector: 'app-expense-create',
  templateUrl: './expense-create.component.html',
  styleUrls: ['./expense-create.component.css']
})
export class ExpenseCreateComponent implements OnInit, OnDestroy {
  private mode = "create";
  isLoading = false;
  private expenseId: string;
  expense: Expense;
  form: FormGroup;
  maxDate=new Date();
  imagePreview: string | ArrayBuffer = "assets/default.png";
  private AuthStatusSub: Subscription;


  constructor(public expService: ExpensesService, public route: ActivatedRoute, private authService: AuthService) { }

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
      'expDate': new FormControl(new Date(), { validators: [Validators.required] })
    });
    //'image': new FormControl(this.imagePreview , { validators: [Validators.required], asyncValidators: [mimeType] })
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('expenseId')) {
        this.mode = "edit";
        this.expenseId = paramMap.get('expenseId');
        this.isLoading = true;
        this.expService.getExpense(this.expenseId).subscribe(expenseData => {
          this.isLoading = false;
          this.expense = {
            id: expenseData._id,
            title: expenseData.title,
            amount: expenseData.amount,
            //imagePath: expenseData.imagePath,
            creator: expenseData.creator,
            expDate:expenseData.expDate
          }
          this.form.setValue({
            title: this.expense.title,
            amount: this.expense.amount,
            //image: this.expense.imagePath
            expDate:expenseData.expDate
          });
        });
      } else {
        this.mode = "create";
        this.expenseId = null;
      }
    });
  }
  onSaveExpense() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode == "create") {
      this.expService.addExpense(
        this.form.value.title,
        this.form.value.amount,        
        this.form.value.image,
        this.form.value.expDate,
      );
      this.isLoading = false;
    } else {
      this.expService.updateExpense(
        this.expenseId,
        this.form.value.title,
        this.form.value.amount,
        this.form.value.image,this.form.value.expDate,
      );

      this.isLoading = false;
    }
    this.form.reset();
  }

  onImagePick(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
  ngOnDestroy() {
    this.AuthStatusSub.unsubscribe();
  }
}
