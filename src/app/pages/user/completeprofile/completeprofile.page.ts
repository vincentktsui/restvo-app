import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from "../../../services/auth.service";
import {UserData} from '../../../services/user.service';

@Component({
  selector: 'app-completeprofile',
  templateUrl: './completeprofile.page.html',
  styleUrls: ['./completeprofile.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CompleteprofilePage implements OnInit {

  constructor(public router: Router, public authService: Auth, public userData: UserData) { }

  ngOnInit() {
  }

  goToProfile() {
    this.router.navigate(['/app/user/profile']);
  }

  async finishOnboarding(event) {
      event.stopPropagation();
      this.authService.openOnboarding({ modalPage: true });
  }

  async pressImportContactList(event) {
      event.stopPropagation();
      const result: any = await this.userData.toggleImportContactList(true);
      if (result) {
          this.dismissImportContactList();
      }
  }
}
