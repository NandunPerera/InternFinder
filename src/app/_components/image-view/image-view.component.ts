import { first } from 'rxjs/operators';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { User } from '@app/_models';
import { AccountService } from '@app/_services';

@Component({
  selector: 'app-image-view',
  templateUrl: './image-view.component.html',
  styleUrls: ['./image-view.component.less'],
})
export class ImageViewComponent implements OnInit {
  @Input() details: User;

  image: Blob;
  thumbnail: any;
  imageURL: SafeUrl;
  constructor(
    private accountService: AccountService,
    private sanitizer: DomSanitizer
  ) {
    this.details = this.accountService.userValue;
    this.image = this.details.image;
    console.log('sdsa', this.details.firstName);
  }

  ngOnInit() {
    this.details = this.accountService.userValue;
    this.image = this.details.image;
    console.log('sdsa', this.details);
    this.imageURL = this.sanitizer.bypassSecurityTrustUrl(
      URL.createObjectURL(this.image)
    );
  }
}
