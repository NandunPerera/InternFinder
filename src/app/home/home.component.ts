import { Component, OnChanges, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { User } from '@app/_models';
import { AccountService } from '@app/_services';

@Component({
  templateUrl: 'home.component.html',
  selector: 'app-home-view',

  styleUrls: ['home-view.component.less'],
})
export class HomeComponent implements OnInit {
  user: User;
  imageURLs: SafeUrl;
  image: Blob;

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
    let objectURL = URL.createObjectURL(this.image);
    this.imageURLs = this.sanitizer.bypassSecurityTrustUrl(objectURL);

    //     const byteNumbers = new Array(byteCharacters.length);
    // for (let i = 0; i < byteCharacters.length; i++) {
    //     byteNumbers[i] = byteCharacters.charCodeAt(i);
    // }
    //     let objectURL = 'data:image/jpeg;base64,' + base64textString;

    //     this.imageURLs = this.sanitizer.bypassSecurityTrustUrl(objectURL);

    console.log('saasa', this.imageURLs);
    // this.imageURL = this.sanitizer.bypassSecurityTrustUrl(
    //   URL.createObjectURL(this.image)
    // );
  }
}
