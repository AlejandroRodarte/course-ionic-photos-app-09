import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Avatar } from '../../../interfaces/avatar';

@Component({
  selector: 'app-avatar-selector',
  templateUrl: './avatar-selector.component.html',
  styleUrls: ['./avatar-selector.component.scss'],
})
export class AvatarSelectorComponent implements OnInit {

  @Input()
  public selectedAvatar = 'av-1.png';

  public avatars: Avatar[] = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    }
  ];

  public avatarSlideOpts = {
    noSwiping: false,
    slidesPerView: 3.5
  };

  @Output()
  public avatarSelected = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
    const avatar = this.avatars.find((currentAvatar: Avatar) => currentAvatar.img === this.selectedAvatar);
    this.onSelectAvatar(avatar);
  }

  onSelectAvatar(avatar: Avatar): void {

    this.avatars.find((currentAvatar: Avatar) => currentAvatar.seleccionado).seleccionado = false;
    avatar.seleccionado = true;

    this.avatarSelected.emit(avatar.img);

  }

}
