import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from "../../../services/auth.service";

@Component({
  selector: 'app-completeprofile',
  templateUrl: './completeprofile.page.html',
  styleUrls: ['./completeprofile.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CompleteprofilePage implements OnInit {

  constructor(public router: Router, public authService: Auth) { }

  ngOnInit() {
  }

  goToProfile() {
    this.router.navigate(['/app/user/profile']);
  }

  async finishOnboarding(event) {
      event.stopPropagation();
      this.authService.openOnboarding({ modalPage: true });
  }
}
