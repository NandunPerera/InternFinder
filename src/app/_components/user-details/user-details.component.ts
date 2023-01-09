import { User } from '@app/_models';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.less'],
})
export class UserDetailsComponent implements OnInit {
  @Input() details: User;
  constructor() {}

  ngOnInit(): void {}
}
