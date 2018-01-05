import { Component, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LoopCard } from './../../interfaces/loop-card.interface';

@Component({
  selector: 'ts-loop-card',
  templateUrl: './loop-card.component.html',
  styleUrls: ['./loop-card.component.css']
})
export class LoopCardComponent {

  @Input() loopCard: LoopCard;
  @Input() source: string;

  @Output() saveCard = new EventEmitter<LoopCard>();
  @Output() removeCard = new EventEmitter<void>();

  get realSrc(): string | SafeResourceUrl {
    return typeof this.loopCard.src === 'string' ? (this.loopCard.src ? this.source + this.loopCard.src : '') : this.loopCard.src;
  }

  constructor(private sanitizer: DomSanitizer) {
    this.source = '';
  }

  changeFile(files: File[]) {
    if (files && files.length > 0) {
      this.loopCard.active = false;
      this.loopCard.file = files[0];
      this.loopCard.src = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(this.loopCard.file));
    }
  }

  save() {
    this.saveCard.emit(this.loopCard);
  }

  remove() {
    this.removeCard.emit();
  }
}
