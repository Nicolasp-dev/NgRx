import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Store } from "@ngrx/store";

import { Router } from "@angular/router";
import { noop } from "rxjs";
import { tap } from "rxjs/operators";
import { AppState } from "../../reducers";
import { AuthService } from "../auth.service";
import { AuthActions } from "../action-types";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.form = fb.group({
      email: ["test@angular-university.io", [Validators.required]],
      password: ["test", [Validators.required]],
    });
  }

  ngOnInit() {}

  login(): void {
    const val = this.form.value;
    this.auth
      .login(val.email, val.password)
      .pipe(
        tap((user) => {
          this.store.dispatch(AuthActions.login({ user }));

          this.router.navigateByUrl("/courses");
        })
      )
      .subscribe({ next: noop, error: () => alert("login failed") });
  }
}
