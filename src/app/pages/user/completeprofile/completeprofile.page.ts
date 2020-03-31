import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-completeprofile',
  templateUrl: './completeprofile.page.html',
  styleUrls: ['./completeprofile.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CompleteprofilePage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  goToProfile() {
    console.log("yeet");
    this.router.navigate(['/app/user/profile']);
  }
}
