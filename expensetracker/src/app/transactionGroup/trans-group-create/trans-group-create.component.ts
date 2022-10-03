import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TransgroupService } from 'src/app/shared/transgroup.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { TransactionGroups } from 'src/app/modal/transactionGroups';

@Component({
  selector: 'app-trans-group-create',
  templateUrl: './trans-group-create.component.html',
  styleUrls: ['./trans-group-create.component.css']
})
export class TransGroupCreateComponent implements OnInit {

  form: FormGroup;
  isLoading = false;
  private mode = "create";
  private transGroupId: string;
  transGroup: TransactionGroups;
  constructor(public transGrpService:TransgroupService,public route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'groupname': new FormControl(null,
        {
          validators: [Validators.required, Validators.minLength(4)]
        }),
        'status': new FormControl(this.getCheckboxValueAsString(false)),
    });
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if (paramMap.has('transGroupId')) {
        this.mode="edit"
        this.transGroupId = paramMap.get('transGroupId');
        this.isLoading = true;
        this.transGrpService.getTransGroup(this.transGroupId).subscribe(transGroupData=>{
          this.isLoading = false;
          this.transGroup = {
            id: transGroupData._id,
            groupName: transGroupData.groupName,
            //imagePath: expenseData.imagePath,
            status: transGroupData.status,
            creator:transGroupData.creator,
          }
          this.form.setValue({
            groupname: this.transGroup.groupName,
            status:this.getCheckboxValueAsString(this.transGroup.status)
          });
        });
      }else {
        this.mode = "create";
        this.transGroupId = null;
      }
    });
  }
  onSaveGroup(){
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode == "create") {

      //console.log(this.form.value.status)
      //const chkVla=this.getCheckboxValueAsBoolean(this.form.value.status)
      //console.log(this.getCheckboxValueAsBoolean(this.form.value.status))
      //console.log(chkVla)
      this.transGrpService.addTransGroup(this.form.value.groupname,this.form.value.status);
      this.isLoading = false;
    } else {
      this.transGrpService.updateTransGroup(this.transGroupId, this.form.value.groupname,this.getCheckboxValueAsBoolean(this.form.value.status));
      this.isLoading = false;
    }
      this.isLoading = false;
  }

  getCheckboxValueAsString(chkboxval:boolean){
    if(chkboxval){
      return "checked";
    }
    else{
      return "";
    }
  }
  getCheckboxValueAsBoolean(chkboxval:string){
    if(chkboxval=="checked"){
      return true;
    }
    else{
      return false;
    }
  }

}
