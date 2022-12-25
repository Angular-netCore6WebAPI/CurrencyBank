import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/classes/user';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  user = new User();

  constructor(private shared: SharedService, private router: Router) {}

  ngOnInit(): void {
    this.user = this.shared.get();
  }

  goNav(route: string) {
    this.router.navigate([route]);
  }
}
