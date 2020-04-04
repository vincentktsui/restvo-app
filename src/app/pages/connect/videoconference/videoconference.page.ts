<<<<<<< HEAD
import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Resource} from '../../../services/resource.service';
import {get} from "scriptjs";
import {Location} from "@angular/common";
=======
import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Resource} from '../../../services/resource.service';
import {get} from "scriptjs";
>>>>>>> move video conferencing to a dedicated page on desktop
import {ActivatedRoute, Router} from "@angular/router";
import {MenuController, Platform} from "@ionic/angular";
import {UserData} from "../../../services/user.service";
import {Chat} from "../../../services/chat.service";
import {Auth} from "../../../services/auth.service";
<<<<<<< HEAD
import {Plugins} from "@capacitor/core";
const { Jitsi } = Plugins;
=======
>>>>>>> move video conferencing to a dedicated page on desktop

declare var JitsiMeetExternalAPI: any;

@Component({
  selector: 'app-videoconference',
  templateUrl: './videoconference.page.html',
  styleUrls: ['./videoconference.page.scss'],
  encapsulation: ViewEncapsulation.None
})
<<<<<<< HEAD
export class VideoconferencePage implements OnInit, OnDestroy {
=======
export class VideoconferencePage implements OnInit {
>>>>>>> move video conferencing to a dedicated page on desktop
  @ViewChild('videoConference', {static: false}) videoConference: any;

  videoChatRoomId: any;
  videoChatRoomSubject = ' ';
  channelLastN = '6'; // only the last 6 active dominate speakers' stream will be sent
  startWithAudioMuted = false;
  startWithVideoMuted = false;

<<<<<<< HEAD
  subscriptions: any = {};

=======
>>>>>>> move video conferencing to a dedicated page on desktop
  jitsi: any = {};
  videoEnded = false;

  constructor(
      public platform: Platform,
<<<<<<< HEAD
      public location: Location,
=======
>>>>>>> move video conferencing to a dedicated page on desktop
      private router: Router,
      private menuCtrl: MenuController,
      private route: ActivatedRoute,
      private resourceService: Resource,
      private authService: Auth,
      private userData: UserData,
      private chatService: Chat
  ) { }

  async ngOnInit() {
    this.authService.cachedRouteParams = this.route.snapshot.params;
    this.videoChatRoomId = this.route.snapshot.paramMap.get('id');
    this.videoChatRoomSubject = this.route.snapshot.paramMap.get('videoChatRoomSubject') || this.videoChatRoomSubject;
    this.channelLastN = this.route.snapshot.paramMap.get('channelLastN') || this.channelLastN;
    this.startWithAudioMuted = this.route.snapshot.paramMap.get('startWithAudioMuted') === 'true';
    this.startWithVideoMuted = this.route.snapshot.paramMap.get('startWithVideoMuted') === 'true';
<<<<<<< HEAD
<<<<<<< HEAD
    this.subscriptions['userLoaded'] = this.userData.refreshUserStatus$.subscribe(this.userLoadedHander);
  }

  ionViewWillEnter() { // for unauthenticated user joining after the re-routing by Angular router
    if (!this.router.url.includes('app/video') && !this.platform.is('cordova') && !this.userData.videoChatRoomId && this.userData.readyToControlVideoChat) {
=======
    if (this.videoChatRoomId && !this.platform.is('mobile')) { // only if chat room ID is valid and if platform is desktop
>>>>>>> move video conferencing to a dedicated page on desktop
=======
    if (this.videoChatRoomId && !this.platform.is('mobileweb')) { // only if chat room ID is valid and if platform is desktop
>>>>>>> move video conferencing to a dedicated page on desktop
      this.initializeVideoConference();
    }
  }

<<<<<<< HEAD
  userLoadedHander = () => { // for authenticated user joining when the observable is first subscribed to
    if (this.userData.user && this.authService.token && !this.platform.is('cordova') && !this.userData.videoChatRoomId && this.userData.readyToControlVideoChat) {
      this.initializeVideoConference();
    }
  };

  async initializeVideoConference() {
    this.userData.readyToControlVideoChat = false;
    setTimeout(() => {
      this.userData.readyToControlVideoChat = true;
    }, this.platform.is('cordova') ? 2000 : 10000); // default video chat load timeout = 2 sec for mobile plugin, 10s for desktop. it needs shorter load time because TODO: onJitsiUnloaded is not working on mobile plugin so needs to manually readyToControlVideoChat to true after 2 sec
    const videoEndpoint: any = await this.resourceService.assignVideoEndpoint(this.videoChatRoomId);
    if (this.platform.is('cordova')) { // native device, open jitsi capacitor plugin
      await Jitsi.joinConference({
        roomName: this.videoChatRoomId,
        url: videoEndpoint.ssl + videoEndpoint.url,
        channelLastN: this.channelLastN,
        startWithAudioMuted: this.startWithAudioMuted,
        startWithVideoMuted: this.startWithVideoMuted
      });
      window.addEventListener('onConferenceJoined', this.onJitsiLoaded);
      window.addEventListener('onConferenceLeft', this.onJitsiUnloaded);
    } else if (!this.platform.is('mobileweb')) { // desktop app
      get('https://meet.jit.si/external_api.js', () => {
        const domain = videoEndpoint.url;
        const options = {
          roomName: this.videoChatRoomId,
          width: '100%',
          height: '100%',
          parentNode: document.querySelector('#videoConference'),
          configOverwrite: {
            channelLastN: parseInt(this.channelLastN || '-1', 10),
            startWithAudioMuted: this.startWithAudioMuted,
            startWithVideoMuted: this.startWithVideoMuted,
            externalConnectUrl: 'https://app.restvo.com/video/' + this.videoChatRoomId
          },
          interfaceConfigOverwrite: {
            APP_NAME: 'Restvo Video',
            NATIVE_APP_NAME: 'Restvo',
            SHOW_JITSI_WATERMARK: false,
            SHOW_BRAND_WATERMARK: true,
            BRAND_WATERMARK_LINK: 'https://wee.nyc3.cdn.digitaloceanspaces.com/app/icon_email.png',
            DEFAULT_REMOTE_DISPLAY_NAME: 'Restvo friend',
            ENABLE_FEEDBACK_ANIMATION: false,
            TOOLBAR_BUTTONS: [
              'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
              'fodeviceselection', 'hangup', 'profile', 'info', 'recording',
              'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
              'videoquality', 'filmstrip', 'invite', 'stats', 'shortcuts',
              'tileview'
            ],
            MOBILE_APP_PROMO: false
          },
          onload: this.onJitsiLoaded()
        };
        this.jitsi = new JitsiMeetExternalAPI(domain, options);
      });
    }
=======
  async initializeVideoConference() {
    const videoEndpoint: any = await this.resourceService.assignVideoEndpoint(this.videoChatRoomId);
    get('https://meet.jit.si/external_api.js', () => {
      const domain = videoEndpoint.url;
      const options = {
        roomName: this.videoChatRoomId,
        width: '100%',
        height: '100%',
        parentNode: document.querySelector('#videoConference'),
        configOverwrite: {
          channelLastN: parseInt(this.channelLastN || '-1', 10),
          startWithAudioMuted: this.startWithAudioMuted,
          startWithVideoMuted: this.startWithVideoMuted,
          externalConnectUrl: 'https://app.restvo.com/video/' + this.videoChatRoomId
        },
        interfaceConfigOverwrite: {
          APP_NAME: 'Restvo Video',
          NATIVE_APP_NAME: 'Restvo',
          SHOW_JITSI_WATERMARK: false,
          SHOW_BRAND_WATERMARK: true,
          BRAND_WATERMARK_LINK: 'https://wee.nyc3.cdn.digitaloceanspaces.com/app/icon_email.png',
          DEFAULT_REMOTE_DISPLAY_NAME: 'Restvo friend',
          ENABLE_FEEDBACK_ANIMATION: false,
          TOOLBAR_BUTTONS: [
            'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
            'fodeviceselection', 'hangup', 'profile', 'info', 'recording',
            'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
            'videoquality', 'filmstrip', 'invite', 'stats', 'shortcuts',
            'tileview'
          ],
          MOBILE_APP_PROMO: false
        },
        onload: this.onJitsiLoaded()
      };
      this.jitsi = new JitsiMeetExternalAPI(domain, options);
    });
>>>>>>> move video conferencing to a dedicated page on desktop
  }

  onJitsiLoaded = async () => {
    console.log('loaded Jitsi');
<<<<<<< HEAD
    this.userData.readyToControlVideoChat = true;
    this.userData.videoChatRoomId = this.videoChatRoomId;
=======
>>>>>>> move video conferencing to a dedicated page on desktop
    if (!this.platform.is('cordova')) {
      setTimeout(async () => {
        if (this.userData && this.userData.user) {
          this.jitsi.executeCommand('displayName', this.userData.user.first_name + ' ' + this.userData.user.last_name);
        }
        if (this.userData && this.userData.user && this.userData.user.avatar) {
          this.jitsi.executeCommand('avatarUrl', this.userData.user.avatar);
        }
        this.jitsi.executeCommand('subject', (this.videoChatRoomSubject || ' '));
        this.jitsi.on('readyToClose', this.onJitsiUnloaded);
      }, 1000);
<<<<<<< HEAD
      if (this.authService.token && await this.userData.checkRestExpired()) { this.chatService.socket.emit('online status', this.videoChatRoomId, this.userData.user._id, { action: 'ping', state: 'online', origin: this.chatService.socket.id, videoChatRoomId: this.videoChatRoomId }); }
=======
      setTimeout(async () => {
        if (this.userData && this.userData.user && await this.userData.checkRestExpired()) { this.chatService.socket.emit('online status', this.videoChatRoomId, this.userData.user._id, { action: 'ping', state: 'online', origin: this.chatService.socket.id, videoChatRoomId: this.videoChatRoomId }); }
      }, 8000);
>>>>>>> move video conferencing to a dedicated page on desktop
    }
  }

  onJitsiUnloaded = async () => {
    console.log('unloading Jitsi');
<<<<<<< HEAD
    this.userData.readyToControlVideoChat = true;
    if (this.authService.token && await this.userData.checkRestExpired()) {
      this.chatService.socket.emit('online status', this.videoChatRoomId, this.userData.user._id, { action: 'ping', state: 'leave video chat', origin: this.chatService.socket.id, videoChatRoomId: this.videoChatRoomId });
    }
    this.userData.videoChatRoomId = '';
    if (this.platform.is('cordova')) {
      window.removeEventListener('onConferenceJoined', this.onJitsiLoaded);
      window.removeEventListener('onConferenceLeft', this.onJitsiUnloaded);
    } else {
=======
    //this.readyToControlVideoChat = true;
    if (this.userData.user && await this.userData.checkRestExpired()) {
      this.chatService.socket.emit('online status', this.videoChatRoomId, this.userData.user._id, { action: 'ping', state: 'leave video chat', origin: this.chatService.socket.id, videoChatRoomId: this.videoChatRoomId });
    }
    if (!this.platform.is('cordova')) {
>>>>>>> move video conferencing to a dedicated page on desktop
      await this.jitsi.dispose();
      // @ts-ignore
      $(`#videoConference`).empty();
      this.videoEnded = true;
    }
  };

  reload() {
<<<<<<< HEAD
    if (this.platform.is('cordova') && !this.userData.videoChatRoomId && this.userData.readyToControlVideoChat) {
      this.initializeVideoConference();
    } else {
      window.location.reload();
    }
=======
    window.location.reload();
>>>>>>> move video conferencing to a dedicated page on desktop
  }

  async goToHome() {
    await this.menuCtrl.enable(this.userData.user);
<<<<<<< HEAD
    this.router.navigateByUrl('/activity/5d5785b462489003817fee18');
  }

  ngOnDestroy(): void {
    this.subscriptions['userLoaded'].unsubscribe(this.userLoadedHander);
=======
    this.router.navigateByUrl('/');
>>>>>>> move video conferencing to a dedicated page on desktop
  }
}
