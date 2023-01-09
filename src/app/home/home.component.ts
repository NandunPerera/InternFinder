import { Component, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { User } from '@app/_models';
import { AccountService } from '@app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
  user: User;
  imageURL: SafeUrl;
  image: any;

  constructor(
    private accountService: AccountService,
    private sanitizer: DomSanitizer
  ) {
    this.user = this.accountService.userValue;
    this.image = this.user[0].image;
    console.log('a', this.user);
    console.log('dadsadsadsadadsaxxxx', this.accountService.userValue);
  }

  ngOnInit() {
    this.user = this.accountService.userValue;
    this.image = this.user[0].image;
    console.log('sdssssa', this.user);
    console.log('sdssssa', this.user[0].firstName);
    console.log('sdssssa', this.image);

    const base64textString = btoa(this.image);

    let objectURL = 'data:image/jpeg;base64,' + base64textString;

    this.imageURL = this.sanitizer.bypassSecurityTrustUrl(objectURL);

    console.log('saasa', this.imageURL);
    // this.imageURL = this.sanitizer.bypassSecurityTrustUrl(
    //   URL.createObjectURL(this.image)
    // );
  }
}
