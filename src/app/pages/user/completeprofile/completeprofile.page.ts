import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from "../../../services/auth.service";
import { UserData } from '../../../services/user.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-completeprofile',
  templateUrl: './completeprofile.page.html',
  styleUrls: ['./completeprofile.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CompleteprofilePage implements OnInit {

  constructor(public router: Router, public authService: Auth, public userData: UserData, private storage: Storage) { }

  ngOnInit() {
  }

  goToProfile() {
    this.router.navigate(['/app/user/profile']);
  }

  async finishOnboarding(event) {
      event.stopPropagation();
      this.authService.openOnboarding({ modalPage: true });
  }

  async dismissImportContactList() {
      this.userData.delayImportContactListReminder = 100;
      await this.storage.set('delayImportContactListReminder', 100);
  }

  async pressImportContactList(event) {
      event.stopPropagation();
      const result: any = await this.userData.toggleImportContactList(true);
      if (result) {
          this.dismissImportContactList();
      }
  }
}
