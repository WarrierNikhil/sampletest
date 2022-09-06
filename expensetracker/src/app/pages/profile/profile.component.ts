import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"]
})
export class ProfileComponent implements OnInit {
  isLoading = false;
  constructor() {}

  ngOnInit() {
    // this.form=new FormGroup({
    //   firstname: new FormControl(null,{validators:[Validators.required]}),
    //   lastname: new FormControl(null,{validators:[Validators.required]}),
    // });
  }
  onSaveProfile(loginForm: NgForm) {

  }
}
