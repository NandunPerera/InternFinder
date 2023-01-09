import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '@app/_services';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  file = '';
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', Validators.required],
      description: ['', Validators.required],
      technologies: ['', Validators.required],
      age: ['', Validators.required],
      field: ['', Validators.required],
      degree: ['', Validators.required],
    });
    this.form.addControl('image', new FormControl('', Validators.required));
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      console.log(this.form.value);
      console.log(this.form.controls);

      return;
    }

    this.loading = true;

    this.accountService
      .register(this.form.value)
      .pipe(first())
      .subscribe(
        (data) => {
          console.log('data');
          this.alertService.success('Registration successful', {
            keepAfterRouteChange: true,
          });

          this.router.navigate(['/']);
        },
        (error) => {
          this.alertService.error(error);

          this.loading = false;
        }
      );
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files;

      console.log(file);

      var blob = new Blob(file, { type: file[0].type });

      // Create Blog URL
      var url = window.URL.createObjectURL(blob);
      this.form.patchValue({
        image: url,
      });
    }
  }
}
